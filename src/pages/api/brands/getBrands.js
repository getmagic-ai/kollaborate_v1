import client from "../../../../prisma/client";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const data = await client.brand.findMany({
        include: {
          hearts: true,
        },
      });
      return res.status(200).json(data);
    } catch (err) {
      res.status(403).json({ err: "Error fetching brands" });
    }
  }
}
