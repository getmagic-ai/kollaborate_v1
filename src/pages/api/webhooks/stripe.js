import { buffer } from "micro";
import Stripe from "stripe";
import client from "../../../../prisma/client";

const endpointSecret =
  "whsec_c30e699e0198a38a73fc0d0ae23a1aaeac9b507d19f762d3789ddb4df8b85ef5"; // YOUR ENDPOINT SECRET copied from the Stripe CLI start-up earlier, should look like 'whsec_xyz123...'

export const config = {
  api: {
    bodyParser: false, // don't parse body of incoming requests because we need it raw to verify signature
  },
};
export default async (req, res) => {
  try {
    const requestBuffer = await buffer(req);
    const sig = req.headers["stripe-signature"];
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2020-08-27",
    });

    let event;

    try {
      // Use the Stripe SDK and request info to verify this Webhook request actually came from Stripe
      event = stripe.webhooks.constructEvent(
        requestBuffer.toString(), // Stringify the request for the Stripe library
        sig,
        endpointSecret
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return res.status(400).send(`Webhook signature verification failed.`);
    }

    // Handle the event
    switch (event.type) {
      // Handle successful subscription creation
      case "customer.subscription.created": {
        const subscription = event.data.object;
        console.log("subscription customer", subscription.customer);
        const subscriptionUser = await client.user.findFirst({
          where: {
            stripeCustomerId: subscription.customer,
          },
        });
        // console.log(subscriptionUser);
        const stripeUser = await client.user.update({
          // Find the customer in our database with the Stripe customer ID linked to this purchase
          where: {
            id: subscriptionUser.id,
          },
          // Update that customer so their status is now active
          data: {
            isActive: true,
          },
        });
        console.log(stripeUser);
        break;
      }
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    res.status(200).json({ received: true });
  } catch (err) {
    // Return a 500 error
    console.log(err);
    res.status(500).end();
  }
};
