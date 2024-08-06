import prismadb from "@/lib/prismadb";
import { currentUser } from "@clerk/nextjs/server";

import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { brandId } = await req.json();

    const user = await currentUser();
    if (!user) return NextResponse.json({ message: "User not found" });

    const userOperations = await prismadb.user_operations.findUnique({
      where: { user_id: user?.id },
    });

    if (!userOperations) {
      await prismadb.user_operations.create({
        data: {
          user_id: user?.id,
          bookmarks: { set: [brandId] },
        },
      });

      return NextResponse.json({ message: "Bookmark added successfully" });
    }

    const isBookmarked = userOperations?.bookmarks.includes(brandId);

    if (isBookmarked) {
      // Remove the bookmark
      await prismadb.user_operations.update({
        where: { user_id: user?.id },
        data: {
          bookmarks: {
            set: userOperations?.bookmarks.filter((id) => id !== brandId),
          },
        },
      });
      console.log("Bookmark removed successfully");
      return NextResponse.json({ message: "Bookmark removed successfully" });
    } else {
      // Add the bookmark
      await prismadb.user_operations.update({
        where: { user_id: user?.id },
        data: {
          bookmarks: {
            push: brandId,
          },
        },
      });
      console.log("Bookmark added successfully");
      return NextResponse.json({ message: "Bookmark added successfully" });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Something went wrong" });
  }
}

export async function GET() {
  try {
    const user = await currentUser();
    if (!user) return;

    const userOperations: any = await prismadb.user_operations.findUnique({
      where: { user_id: user.id },
    });

    console.log(userOperations);

    // Prepare the response data
    const bookmarks =
      (await prismadb.company_master.findMany({
        where: {
          id: { in: userOperations?.bookmarks || [] },
        },
      })) || [];

    return NextResponse.json(bookmarks);
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
