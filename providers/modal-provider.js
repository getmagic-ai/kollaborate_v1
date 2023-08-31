"use client";
import { useEffect, useState } from "react";
import { DiscordConnectModal } from "@/components/modals/discord-connect-modal";
import { useDiscordConnectModal } from "@/hooks/useDiscordConnectModal";
import { BrandDetailsModal } from "@/components/modals/brand-details-modal";
import useSetBrandStore from "@/hooks/useSetBrand";

export const ModalProvider = ({ isDiscordConnected }) => {
  const [isMounted, setIsMounted] = useState(false);
  const { isOpen, onClose, onOpen } = useDiscordConnectModal();
  const {
    isOpen: brandModalIsOpen,
    onClose: brandModalOnClose,
    onOpen: brandModalOnOpen,
  } = useSetBrandStore();

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
      <BrandDetailsModal
        isOpen={brandModalIsOpen}
        onClose={brandModalOnClose}
        onOpen={brandModalOnOpen}
      />
    </>
  );
};
