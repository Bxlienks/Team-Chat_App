"use client";

import { useEffect, useState } from "react";

import { CreateChannelModal } from "@/components/modals/create-channel-modal";
import { CreateRoomModal } from "@/components/modals/create-room-modal";
import { DeleteChannelModal } from "@/components/modals/delete-channel-modal";
import { DeleteMessageModal } from "@/components/modals/delete-message-modal";
import { DeleteRoomModal } from "@/components/modals/delete-room-modal";
import { EditChannelModal } from "@/components/modals/edit-channel-modal";
import { EditRoomModal } from "@/components/modals/edit-room-modal";
import { InviteModal } from "@/components/modals/invite-modal";
import { LeaveRoomModal } from "@/components/modals/leave-room-modal";
import { MembersModal } from "@/components/modals/members-modal";
import { MessageFileModal } from "@/components/modals/message-file-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CreateRoomModal />
      <InviteModal />
      <EditRoomModal />
      <MembersModal />
      <CreateChannelModal />
      <LeaveRoomModal />
      <DeleteRoomModal />
      <DeleteChannelModal />
      <EditChannelModal />
      <MessageFileModal />
      <DeleteMessageModal />
    </>
  );
};
