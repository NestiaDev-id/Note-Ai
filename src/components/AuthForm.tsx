"use client";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { toast } from "sonner";
import { CardContent, CardFooter } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

type AuthFormProps = {
  type: "login" | "register";
};

function AuthForm({ type }: AuthFormProps) {
  const isLoginForm = type === "login";

  const router = useRouter();

  //   const handleSubmit = async (e: React.FormEvent) => {
  //     e.preventDefault();
  //     try {
  //       const res = await fetch(`/api/auth/${type}`, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         // body: JSON.stringify(data), // tambahkan data jika perlu
  //       });

  //       if (!res.ok) {
  //         throw new Error("Failed to authenticate");
  //       }

  //       toast.success("Success", {
  //         description: "Authentication successful!",
  //         duration: 5000,
  //       });
  //       router.push("/dashboard"); // atau halaman yang sesuai
  //     } catch (error) {
  //       console.error(error);
  //       toast.error("Authentication failed", {
  //         description: "Please try again.",
  //         duration: 5000,
  //       });
  //   };

  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const res = await fetch(`/api/auth/${type}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error("Failed to authenticate");
      }

      toast.success("Success", {
        description: "Authentication successful!",
      });

      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Authentication failed", {
        description: "Please check your credentials and try again.",
      });
    }
  };

  return (
    <form action={handleSubmit} className="mx-auto mt-10 max-w-sm">
      <CardContent className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label />
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            required
            disabled={isPending}
            className="w-full"
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label />
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            required
            disabled={isPending}
            className="w-full"
          />
        </div>
      </CardContent>
      <CardFooter className="mt-4 flex flex-col gap-6">
        <Button className="w-full" type="submit" disabled={isPending}>
          {isPending ? (
            <Loader2 className="animate-spin" />
          ) : isLoginForm ? (
            "Login"
          ) : (
            "Register"
          )}
        </Button>
        <p className="text-xs">
          {isLoginForm
            ? "Don't have an account? Register"
            : "Already have an account? Login"}
          <Link
            href={isLoginForm ? "/sign-up" : "/login"}
            className={`text-blue-500 hover:underline ${isPending ? "pointer-events-none opacity-50" : ""}`}
          >
            {isLoginForm ? "Register" : "Login"}
          </Link>
        </p>
      </CardFooter>
    </form>
  );
}

export default AuthForm;
