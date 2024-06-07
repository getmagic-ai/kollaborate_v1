import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const page = url.searchParams.get("page") || 1;
  // console.log(page);
  try {
    // Process a GET request
    const brands = await prismadb.company_master.findMany({
     
      take: 10,
      skip: page === 1 ? 0 : (+page - 1) * 10,
    });
   
    return NextResponse.json(brands);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const { userId, brandId } = body;
  if (userId) {
    try {
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
            id: `${userId}-${brandId}`,
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
  } else {
    try {
      const { userId } = auth();
      if (!userId) return new NextResponse("Unauthorized", { status: 401 });

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
            id: `${userId}-${brandId}`,
          },
        });
        return NextResponse.json(result);
      } else {
        const result = await prismadb.saved.delete({
          where: {
            id: saved.id,
          },
        });
        console.log(result);
        return NextResponse.json(result);
      }
    } catch (error) {
      console.log(error);
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  }
}
