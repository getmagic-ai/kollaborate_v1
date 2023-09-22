import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  console.log(req);
  try {
    // Process a GET request
    const brand = await prismadb.nc_1o1g___brand_master_dev.findMany({
      include: {
        saved: true,
      },
    });

    return NextResponse.json(brand);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
