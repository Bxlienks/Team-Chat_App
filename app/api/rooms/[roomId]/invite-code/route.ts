import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { roomId: string } }
) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.roomId) {
      return new NextResponse("Room ID Missing", { status: 400 });
    }

    const room = await db.room.update({
      where: {
        id: params.roomId,
        profileId: profile.id,
      },
      data: {
        inviteCode: uuidv4(),
      },
    });

    return NextResponse.json(room);
  } catch (error) {
    console.log("[ROOM_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
