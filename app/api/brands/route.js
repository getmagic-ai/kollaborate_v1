import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    // Process a GET request
    const brands = await prismadb.nc_1o1g___brand_master_dev.findMany({
      include: {
        saved: true,
      },
      take: 4,
    });
    return NextResponse.json(brands);
  } catch (error) {
    console.log(error);
    // res.status(500).send({ error: "Request method not allowed" });
  }
}

export async function POST(req) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const body = await req.json();
    const { brandId } = body;

    const saved = await prismadb.saved.findFirst({
      where: {
        brandId: brandId,
        userId: userId,
      },
    });

    if (!saved) {
      const result = await prismadb.saved.create({
        data: {
          brandId,
          userId,
        },
      });
      return NextResponse.json(result);
    } else {
      const result = await prismadb.saved.delete({
        where: {
          id: saved.id,
        },
      });
      return NextResponse.json(result);
    }
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
