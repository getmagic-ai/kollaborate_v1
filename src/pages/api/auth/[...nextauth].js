import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord";
import client from "../../../../prisma/client";
import Stripe from "stripe";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaAdapter } from "@auth/prisma-adapter";

const adapter = PrismaAdapter(client);
export const authOptions = {
  // Configure one or more authentication providers
  adapter: adapter,
  secret: process.env.AUTH_SECRET,
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      profile(profile) {
        return profile;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      profile(profile) {
        return profile;
      },
    }),
  ],
  // pages: {
  //   signIn: "/auth/signin",
  // },
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id;
      const dbUser = await client.user.findFirst({
        where: {
          id: user.id,
        },
      });
      session.user.isActive = dbUser.isActive;
      return session;
    },
  },
  events: {
    createUser: async ({ user }) => {
      // Create stripe API client using the secret key env variable
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: "2020-08-27",
      });
      // @PrathmeshSadake looks like currently we are creating a Stripe user ID for every new user siging up. That is OK since we want them to be on free tier
      //but we need think of a different architecture where we only create a Stripe user ID when they sign up for a paid plan.
      // Create a stripe customer for the user with their email address
      await stripe.customers
        .create({
          email: user.email,
          name: user.name,
        })
        .then(async (customer) => {
          // Use the Prisma Client to update the user in the database with their new Stripe customer ID
          return client.user.update({
            where: { id: user.id },
            data: {
              stripeCustomerId: customer.id,
            },
          });
        });
    },
  },
};

export default NextAuth(authOptions);
