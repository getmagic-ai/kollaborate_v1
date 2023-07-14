import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    // Process a GET request
    const brands = await prismadb.brand.findMany();
    return NextResponse.json(brands);
  } catch (error) {
    res.status(500).send({ error: "Request method not allowed" });
  }
}
