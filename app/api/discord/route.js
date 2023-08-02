// https://discord.com/api/v10/guilds/${serverId}/members/${userId}
// Server Id: 1110016080216326165
// Channel Id: 1110263893869207632

import { currentUser } from "@clerk/nextjs";
import axios from "axios";
import { NextResponse } from "next/server";

const serverId = "1110016080216326165";
const channelId = "1110263893869207632";

export async function GET() {
  try {
    // Process a GET request
    const user = await currentUser();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (
      user?.externalAccounts.filter((acc) => acc.provider === "discord")
        .length === 0
    ) {
      throw new Error(`Discord Acccount not Connected`, { status: 403 });
    }

    const userId = user?.externalAccounts.filter(
      (acc) => acc.provider === "discord"
    )[0].id;

    console.log(userId);

    const response = await axios.get(
      `https://discord.com/api/v10/guilds/${serverId}/members/${userId}`
    );

    return new NextResponse(response);
  } catch (error) {
    return new NextResponse(error, { status: 500 });
  }
}
