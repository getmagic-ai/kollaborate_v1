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
  const saved = await client.saved.findFirst({
    where: {
      brandId: req.body.brandId,
      userId: prismaUser.id,
    },
  });

  if (req.method === "POST") {
    //Add Like
    try {
      if (!saved) {
        const result = await client.saved.create({
          data: {
            brandId: req.body.brandId,
            userId: prismaUser.id,
            userEmail: prismaUser.email,
          },
        });
        res.status(201).json({ ...result, user: prismaUser });
      } else {
        const result = await client.saved.delete({
          where: {
            id: saved.id,
          },
        });
        res.status(200).json({ ...result, user: prismaUser });
      }
    } catch (err) {
      res.status(403).json({ err: "Error has occured while making a post" });
    }
  }
}
