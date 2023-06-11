import client from "../../../../prisma/client";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const data = await client.nc_1o1g___brand_master_dev.findMany({
        take: 4,
      });
      return res.status(200).json(data);
    } catch (err) {
      res.status(403).json({ err: "Error fetching brands" });
    }
  }
}
