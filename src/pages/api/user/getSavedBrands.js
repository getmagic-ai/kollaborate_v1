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
      saved: true,
    },
  });

  const brandIds = [];
  prismaUser.saved.forEach((element) => {
    brandIds.push(element.brandId);
  });
  const savedBrands = await client.nc_1o1g___brand_master_dev.findMany({
    where: {
      id: { in: brandIds },
    },
    include: {
      saved_leads: true,
    },
  });

  if (req.method === "GET") {
    try {
      return res.status(200).json({
        data: savedBrands,
      });
    } catch (err) {
      res.status(403).json({ err: "Error" });
    }
  }
}
