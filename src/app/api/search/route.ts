import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const searchQuery = url.searchParams.get("query") || "";
  const decodedQuery = decodeURIComponent(searchQuery);

  try {
    // Process a GET request
    const { data } = await axios.get(
      // `http://api.kollaborate.co/open-search?message=${decodedQuery}&page=1`
      process.env.NEXT_PUBLIC_SEARCH_API_URL + `?message=${decodedQuery}&page=1`
    );
    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
