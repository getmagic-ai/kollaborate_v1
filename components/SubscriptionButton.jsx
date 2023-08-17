"use client";
import axios from "axios";
import { useState } from "react";
import { Zap } from "lucide-react";
import { toast } from "react-hot-toast";

import { Button } from "@/components/ui/button";

export const SubscriptionButton = ({
  isPro = false,
  className,
  free = false,
}) => {
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    try {
      setLoading(true);

      const response = await axios.get("/api/stripe");

      window.location.href = response.data.url;
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant={isPro ? "outline" : "premium"}
      disabled={loading || free}
      onClick={onClick}
      className={className}
    >
      {free
        ? "Currently on free plan"
        : isPro
        ? "Manage Subscription"
        : "Upgrade"}
    </Button>
  );
};
