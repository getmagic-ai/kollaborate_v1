"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { useDiscordConnectModal } from "@/hooks/useDiscordConnectModal";
import toast from "react-hot-toast";
import { Button } from "./ui/button";
import axios from "axios";

const JoinChannelButton = ({ className }) => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const { onOpen } = useDiscordConnectModal();

  const onClick = async () => {
    try {
      setLoading(true);
      if (
        user?.externalAccounts.filter((acc) => acc.provider === "discord")
          .length === 0
      ) {
        onOpen();
      }
      const { data } = await axios.get("/api/discord");
      console.log(data);
    } catch (error) {
      if (error?.response?.status === 403) {
        onOpen();
      } else {
        toast.error("Something went wrong.");
      }
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
