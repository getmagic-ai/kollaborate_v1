import prismadb from "@/lib/prismadb";
import { auth, currentUser } from "@clerk/nextjs";
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
  const { bookmarkId } = await req.json();

  const user = await currentUser();
  if (!user) return;

  try {
    const userOperations = await prismadb.user_operations.findUnique({
      where: { user_id: user?.id },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" });
    }

    const isBookmarked = userOperations?.bookmarks.includes(bookmarkId);

    if (isBookmarked) {
      // Remove the bookmark
      await prismadb.user_operations.update({
        where: { user_id: user?.id },
        data: {
          bookmarks: { set: [bookmarkId] },
        },
      });
      return NextResponse.json({ message: "Bookmark removed successfully" });
    } else {
      // Add the bookmark
      await prismadb.user_operations.update({
        where: { user_id: user?.id },
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
    const user = await currentUser();
    if (!user) return;

    const userOperations: any = await prismadb.user_operations.findUnique({
      where: { user_id: user.id },
    });

    // Prepare the response data
    const bookmarksWithCompanyDetails =
      userOperations?.bookmarks.map((bookmarkId: any) => {
        const companyDetails = userOperations.company_master.find(
          (company: any) => company.id === bookmarkId
        );
        return companyDetails;
      }) || [];

    return NextResponse.json({ data: bookmarksWithCompanyDetails });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Something went wrong" });
  }
}
