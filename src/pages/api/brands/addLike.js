import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import client from "../../../../prisma/client";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ message: "Please signin to create a post." });
  }
  //Get User
  const prismaUser = await client.user.findUnique({
    where: { email: session.user.email },
  });
  //check to see if post was liked by user
  const heart = await client.heart.findFirst({
    where: {
      brandId: req.body.brandId,
      userId: prismaUser.id,
    },
  });

  if (req.method === "POST") {
    //Add Like
    try {
      if (!heart) {
        const result = await client.heart.create({
          data: {
            brandId: req.body.brandId,
            userId: prismaUser.id,
            userEmail: prismaUser.email,
          },
        });
        res.status(201).json({ ...result, user: prismaUser });
      } else {
        const result = await client.heart.delete({
          where: {
            id: heart.id,
          },
        });
        res.status(200).json({ ...result, user: prismaUser });
      }
    } catch (err) {
      res.status(403).json({ err: "Error has occured while making a post" });
    }
  }
}
