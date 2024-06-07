import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

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

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { userId, bookmarkId } = req.body;

  try {
    const user = await prismadb.user_operations.findUnique({
      where: { user_id: userId },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
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
      res.status(200).json({ message: "Bookmark removed successfully" });
    } else {
      // Add the bookmark
      await prismadb.user_operations.update({
        where: { user_id: userId },
        data: { bookmarks: { push: bookmarkId } },
      });
      res.status(200).json({ message: "Bookmark added successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}
