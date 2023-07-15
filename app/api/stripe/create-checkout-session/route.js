import Stripe from "stripe";
import { auth } from "@clerk/nextjs";
import { findOrCreateCustomerId } from "@/lib/findOrCreateStripeCustomerId";
import { NextResponse } from "next/server";

export async function POST(res) {
  const { userId: clerkUserId } = auth();
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2020-08-27",
  });

  let customerId = await findOrCreateCustomerId(clerkUserId);

  console.log(customerId);

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "subscription",
    /* This is where the magic happens - this line will automatically link this Checkout page to the existing customer we created when the user signed-up, so that when the webhook is called our database can automatically be updated correctly.*/
    customer: customerId,
    line_items: [
      {
        //@PrathmeshSadake can we add this variable to the .env file and treat it as a secret, and make it configurable?
        price: "price_1N3KkSSI8yYgzwHV4eZtFpmh", // THE PRICE ID YOU CREATED EARLIER,
        quantity: 1,
      },
    ],
    // {CHECKOUT_SESSION_ID} is a string literal which the Stripe SDK will replace; do not manually change it or replace it with a variable!
    success_url: `${NEXT_PUBLIC_APP_URL}/?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${NEXT_PUBLIC_APP_URL}/?cancelledPayment=true`,
    subscription_data: {
      metadata: {
        // This isn't 100% required, but it helps to have so that we can manually check in Stripe for whether a customer has an active subscription later, or if our webhook integration breaks.
        payingUserId: clerkUserId,
      },
    },
  });

  if (!checkoutSession.url) {
    return NextResponse.json({
      cpde: "stripe-error",
      error: "Could not create checkout session",
    });
  }

  // Return the newly-created checkoutSession URL and let the frontend render it
  return NextResponse.json({ redirectUrl: checkoutSession.url });
}
