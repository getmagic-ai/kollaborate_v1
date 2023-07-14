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

export async function POST(req) {
  try {
    const body = await req.json();
    const { userId, brandId } = body;
    console.log(userId, brandId);
    const bookmark = await prismadb.saved.create({
      data: {
        brandId,
        userId,
      },
    });
    console.log(bookmark);
    return NextResponse.json(bookmark);
  } catch (error) {
    console.log(error);
  }
}
