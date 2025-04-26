"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { logoutUserAction } from "@/action/users";

function LogoutButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setLoading(true);
    try {
      const { errorMessage } = await logoutUserAction();

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
