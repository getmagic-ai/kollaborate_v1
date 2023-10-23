import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(req) {
  const url = new URL(req.url);
  const searchQuery = url.searchParams.get("query") || "";
  const decodedQuery = decodeURIComponent(searchQuery);
  console.log(decodedQuery);
  try {
    // Process a GET request
    const brands = await prismadb.nc_1o1g___brand_master_dev.findMany({
      where: {
        name: {
          contains: decodedQuery, // Use 'contains' instead of 'search'
        },
      },
      orderBy: {
        name: "asc", // Sort the results by name in ascending order
      },
      include: {
        saved: true,
      },
    });
    return NextResponse.json(brands);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
