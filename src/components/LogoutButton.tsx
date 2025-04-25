"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { useRouter } from "next/navigation";

function LogoutButton() {
  const [loading, setLoading] = useState(false);
  const { toast } = Toaster();
  const router = useRouter();

  const handleLogout = async () => {
    setLoading(true);
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate a delay

      const errorMessage = null;

      if (!errorMessage) {
        toast({
          title: "Logout",
          message: "You have been logged out successfully.",
          variant: "success",
        });
        router.push("/");
      } else {
        toast({
          title: "Logout",
          message: errorMessage,
          variant: "error",
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button
      className="w-24"
      variant="outline"
      onClick={handleLogout}
      disabled={loading}
    >
      {loading ? <Loader2 className="animate-spin" /> : "Logout"}
    </Button>
  );
}

export default LogoutButton;
