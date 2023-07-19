import React, { useEffect, useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { EnvelopeOpenIcon } from "@heroicons/react/24/outline";
import { useSignIn, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export const DiscordConnectModal = ({ isOpen, onClose, onOpen }) => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title="You haven't connected your Discord account yet"
      description='Connect your account to get access to latest features'
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className='flex flex-col space-y-2 text-white'>
        <ul className='list-inside list-decimal'>
          <li>In Accounts Tab {">"} Connected Accounts</li>
          <li>Click On "{"+ connect account"}"</li>
          <li>Then connect your Discord Account.</li>
        </ul>
        <div className='pt-2 space-x-4 items-center justify-center w-full'>
          <Button
            onClick={() => {
              onClose();
              router.push("/profile");
            }}
            className='bg-[#7289da]'
          >
            <EnvelopeOpenIcon className='mr-2 h-4 w-4' /> Connect Discord
            Account
          </Button>
        </div>
      </div>
    </Modal>
  );
};
