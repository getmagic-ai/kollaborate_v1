import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  // export async function GET(req: Request, res: Response) {
  const { id } = await req.json();

  try {
    // Process a GET request
    const brand = await prismadb.company_master.findMany({
      where: {
        id: parseInt(id),
      },
    });

    return NextResponse.json(brand);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
