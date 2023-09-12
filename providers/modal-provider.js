"use client";
import { useEffect, useState } from "react";
import { DiscordConnectModal } from "@/components/modals/discord-connect-modal";
import { useDiscordConnectModal } from "@/hooks/useDiscordConnectModal";

export const ModalProvider = ({ isDiscordConnected }) => {
  const [isMounted, setIsMounted] = useState(false);
  const { isOpen, onClose, onOpen } = useDiscordConnectModal();

  useEffect(() => {
    setIsMounted(true);
    if (isDiscordConnected?.length === 0) {
      onOpen();
    }
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <DiscordConnectModal isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
    </>
  );
};
