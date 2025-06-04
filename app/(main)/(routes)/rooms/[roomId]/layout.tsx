import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";
import { RoomSidebar } from "@/components/room/room-sidebar";

const roomIdLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { roomId: string };
}) => {
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
  });

  if (!room) {
    return redirect("/");
  }

  return (
    <div className=" h-full">
      <div className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
        <RoomSidebar roomId={params.roomId} />
      </div>
      <main className="h-full md:pl-60">{children}</main>
    </div>
  );
};

export default roomIdLayout;
