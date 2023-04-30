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
    include: {
      hearts: true,
    },
  });

  const brandIds = [];
  prismaUser.hearts.forEach((element) => {
    brandIds.push(element.brandId);
  });
  const likedBrands = await client.brand.findMany({
    where: {
      id: { in: brandIds },
    },
    include: {
      hearts: true,
    },
  });

  if (req.method === "GET") {
    try {
      return res.status(200).json({
        data: likedBrands,
      });
    } catch (err) {
      res.status(403).json({ err: "Error" });
    }
  }
}
