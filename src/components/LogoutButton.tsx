"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function LogoutButton() {
  const [loading, setLoading] = useState(false);
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
        toast.success("Logout", {
          description: "Logout successful!", // Menambahkan deskripsi
          classNames: {
            toast: "custom-toast-class", // Class untuk toast
            title: "custom-title-class", // Class untuk judul
            description: "custom-description-class", // Class untuk deskripsi
          },
          duration: 5000, // Durasi toast dalam milidetik
        });
        router.push("/");
      } else {
        toast.error("Logout failed", {
          description: errorMessage, // Menambahkan deskripsi
          classNames: {
            toast: "custom-toast-class", // Class untuk toast
            title: "custom-title-class", // Class untuk judul
            description: "custom-description-class", // Class untuk deskripsi
          },
          duration: 5000, // Durasi toast dalam milidetik
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
