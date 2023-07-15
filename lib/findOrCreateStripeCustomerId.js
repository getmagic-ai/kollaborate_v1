import { clerkClient } from "@clerk/nextjs/server";
import Stripe from "stripe";

export const findOrCreateCustomerId = async (clerkUserId) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2020-08-27",
  });

  let user = await clerkClient.users.getUser(clerkUserId);

  if (user.publicMetadata.stripeCustomerId) {
    return user.publicMetadata.stripeCustomerId;
  }

  const customer = await stripe.customers.create(
    {
      name: user.firstName + " " + user.lastName,
      email: user.emailAddresses.find(
        (x) => x.id === user.primaryEmailAddressId
      ).emailAddress,
      metadata: {
        clerkUserId: user.id,
      },
    },
    {
      idempotencyKey: user.id,
    }
  );

  user = await clerkClient.users.updateUser(user.id, {
    publicMetadata: {
      stripeCustomerId: customer.id,
    },
  });
  return user.publicMetadata.stripeCustomerId;
};
