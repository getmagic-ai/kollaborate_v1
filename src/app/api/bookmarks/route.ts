import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: Request, res: Response) {
  try {
    // Process a GET request
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const savedBrands = await prismadb.saved.findMany({
      where: {
        userId,
      },
    });
    const brandIds = savedBrands.map((bookmark: any) => bookmark.brandId);
    const bookmarkedBrands = await prismadb.nc_1o1g___brand_master_dev.findMany(
      {
        where: {
          id: { in: brandIds },
        },
        include: {
          saved: true,
        },
      }
    );
    return NextResponse.json(bookmarkedBrands);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Request method not allowed" });
  }
}
