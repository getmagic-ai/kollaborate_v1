import { getServerSession } from "next-auth";
import Stripe from "stripe";
import { authOptions } from "../auth/[...nextauth]";
import client from "../../../../prisma/client";

export default async (req, res) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2020-08-27",
  });

  // This object will contain the user's data if the user is signed in
  const session = await getServerSession(req, res, authOptions);

  // Error handling
  if (!session?.user) {
    return res.status(401).json({
      error: {
        code: "no-access",
        message: "You are not signed in.",
      },
    });
  }


  const dbUser = await client.user.findFirst({
    where: {
      id: session.user.id,
    },
  });
  console.log(dbUser.stripeCustomerId);

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "subscription",
    /* This is where the magic happens - this line will automatically link this Checkout page to the existing customer we created when the user signed-up, so that when the webhook is called our database can automatically be updated correctly.*/
    customer: dbUser.stripeCustomerId,
    line_items: [
      {
        //@PrathmeshSadake can we add this variable to the .env file and treat it as a secret, and make it configurable?
        price: "price_0M9vRDgJmzQDibAWB0hul1jP", // THE PRICE ID YOU CREATED EARLIER,
        quantity: 1,
      },
    ],
    // {CHECKOUT_SESSION_ID} is a string literal which the Stripe SDK will replace; do not manually change it or replace it with a variable!
    success_url: `http://localhost:3000/?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: "http://localhost:3000/?cancelledPayment=true",
    subscription_data: {
      metadata: {
        // This isn't 100% required, but it helps to have so that we can manually check in Stripe for whether a customer has an active subscription later, or if our webhook integration breaks.
        payingUserId: session.user.id,
      },
    },
  });

  if (!checkoutSession.url) {
    return res.status(500).json({
      cpde: "stripe-error",
      error: "Could not create checkout session",
    });
  }

  // Return the newly-created checkoutSession URL and let the frontend render it
  return res.status(200).json({ redirectUrl: checkoutSession.url });
};
