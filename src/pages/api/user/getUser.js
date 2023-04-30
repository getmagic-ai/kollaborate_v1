import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import client from "../../../../prisma/client";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ message: "Please signin" });
  }
  if (req.method === "GET") {
    try {
      const user = await client.user.findUnique({
        where: { email: session.user.email },
      });
      // console.log(user);
      return res.status(200).json(user);
    } catch (err) {
      res.status(403).json({ err: "Error" });
    }
  }
}
