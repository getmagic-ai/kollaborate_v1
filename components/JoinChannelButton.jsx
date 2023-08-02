"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { useDiscordConnectModal } from "@/hooks/useDiscordConnectModal";
import toast from "react-hot-toast";
import { Button } from "./ui/button";

const JoinChannelButton = ({ className }) => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const { onOpen } = useDiscordConnectModal();

  const onClick = () => {
    try {
      setLoading(true);
      console.log(
        user?.externalAccounts.filter((acc) => acc.provider === "discord")
          .length
      );
      if (
        user?.externalAccounts.filter((acc) => acc.provider === "discord")
          .length === 0
      ) {
        onOpen();
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Button
        onClick={onClick}
        disabled={loading}
        className={cn(className)}
        variant={"outline"}
      >
        Join Discord Channel
      </Button>
    </>
  );
};

export default JoinChannelButton;
