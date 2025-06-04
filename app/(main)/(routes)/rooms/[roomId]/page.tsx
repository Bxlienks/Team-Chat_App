import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

interface roomIdPageProps {
  params: {
    roomId: string;
  };
}

const roomIdPage = async ({ params }: roomIdPageProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return auth().redirectToSignIn();
  }

  const room = await db.room.findUnique({
    where: {
      id: params.roomId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
    include: {
      channels: {
        where: {
          name: "general",
        },
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });

  const initialChannel = room?.channels[0];

  if (initialChannel?.name !== "general") {
    return null;
  }

  return redirect(`/rooms/${params.roomId}/channels/${initialChannel?.id}`);
};

export default roomIdPage;
