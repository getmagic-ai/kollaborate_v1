import React, { useEffect, useState } from "react";
import { Modal } from "@/components/ui/modal";

export const ProChannelModal = ({ isOpen, onClose, onOpen }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title='You’ve been successfully added to the Pro channel'
      description='Please wait for an hour before trying to access it'
      isOpen={isOpen}
      onClose={onClose}
    ></Modal>
  );
};
