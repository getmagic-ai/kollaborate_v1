"use client";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";

interface SubscriptionButtonProps {
  isPro?: boolean;
  className?: string;
}

const SubscriptionButton: React.FC<SubscriptionButtonProps> = ({
  isPro = false,
  className,
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
      variant={isPro ? "outline" : "secondary"}
      disabled={loading}
      onClick={onClick}
      className={className}
    >
      {isPro ? "Manage Subscription" : "Upgrade"}
    </Button>
  );
};

export default SubscriptionButton;
