import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse, NextRequest } from "next/server";

export const dynamic = "force-dynamic";

// export async function GET(req: Request, res: Response) {
//   const url = new URL(req.url);
//   const userId = url.searchParams.get("userId");
//   console.log(userId);
// if (userId) {
//   try {
//     const savedBrands = await prismadb.saved.findMany({
//       where: {
//         userId,
//       },
//     });
//     console.log(savedBrands);
//     const brandIds = savedBrands.map((bookmark: any) => bookmark.brandId);
//     const bookmarkedBrands =
//       await prismadb.nc_1o1g___brand_master_dev.findMany({
//         where: {
//           id: { in: brandIds },
//         },
//         include: {
//           Saved: true,
//         },
//       });
//     return NextResponse.json(bookmarkedBrands);
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json({ error: "Request method not allowed" });
//   }
// }
// try {
//   // Process a GET request
//   const { userId } = auth();
//   if (!userId) return new NextResponse("Unauthorized", { status: 401 });

//   const savedBrands = await prismadb.saved.findMany({
//     where: {
//       userId,
//     },
//   });
//   const brandIds = savedBrands.map((bookmark: any) => bookmark.brandId);
//   const bookmarkedBrands = await prismadb.nc_1o1g___brand_master_dev.findMany(
//     {
//       where: {
//         id: { in: brandIds },
//       },
//       include: {
//         Saved: true,
//       },
//     }
//   );
//   return NextResponse.json(bookmarkedBrands);
// } catch (error) {
//   console.log(error);
//   return NextResponse.json({ error: "Request method not allowed" });
// }

export async function POST(req: NextRequest, res: NextResponse) {
  const { userId, bookmarkId } = await req.json();

  try {
    const user = await prismadb.user_operations.findUnique({
      where: { user_id: userId },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" });
    }

    const isBookmarked = user.bookmarks.includes(bookmarkId);

    if (isBookmarked) {
      // Remove the bookmark
      await prismadb.user_operations.update({
        where: { user_id: userId },
        data: {
          bookmarks: { set: [bookmarkId] },
        },
      });
      return NextResponse.json({ message: "Bookmark removed successfully" });
    } else {
      // Add the bookmark
      await prismadb.user_operations.update({
        where: { user_id: userId },
        data: { bookmarks: { push: bookmarkId } },
      });
      return NextResponse.json({ message: "Bookmark added successfully" });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Something went wrong" });
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const user = await prismadb.user_operations.findMany({
      where: { user_id: auth().userId! },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" });
    }

    return NextResponse.json({ message: "Bookmark added successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Something went wrong" });
  }
}
