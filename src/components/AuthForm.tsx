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
import { loginUserAction, signUpUserAction } from "@/action/users";

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

  const handleSubmit = (formData: FormData) => {
    // const email = formData.get("email") as string;
    // const password = formData.get("password") as string;

    startTransition(async () => {
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;

      let errorMessage = null;
      let title = "";
      let description = "";

      if (isLoginForm) {
        errorMessage = (await loginUserAction(email, password)).errorMessage;

        title = "Login failed";
        description = "Please check your credentials and try again.";
      } else {
        errorMessage = (await signUpUserAction(email, password)).errorMessage;

        title = "Sign up";
        description = "Check your email for verification.";
      }

      if (errorMessage) {
        toast.error(title, {
          description: errorMessage,
          duration: 5000,
        });
      } else {
        toast.success(title, {
          description: description,
          duration: 5000,
        });
        router.replace("/");
      }
    });

    }

    // try {
    //   const res = await fetch(`/api/auth/${type}`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ email, password }),
    //   });

    //   if (!res.ok) {
    //     throw new Error("Failed to authenticate");
    //   }

    //   toast.success("Success", {
    //     description: "Authentication successful!",
    //   });

    //   router.push("/dashboard");
    // } catch (error) {
    //   console.error(error);
    //   toast.error("Authentication failed", {
    //     description: "Please check your credentials and try again.",
    //   });
    // }
  };

  return (
    <form action={handleSubmit}>
      <CardContent className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            placeholder="Enter your email"
            type="email"
            required
            disabled={isPending}
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            placeholder="Enter your password"
            type="password"
            required
            disabled={isPending}
          />
        </div>
      </CardContent>
      <CardFooter className="mt-4 flex flex-col gap-6">
        <Button className="w-full">
          {isPending ? (
            <Loader2 className="animate-spin" />
          ) : isLoginForm ? (
            "Login"
          ) : (
            "Sign Up"
          )}
        </Button>
        <p className="text-xs">
          {isLoginForm
            ? "Don't have an account yet?"
            : "Already have an account?"}{" "}
          <Link
            href={isLoginForm ? "/sign-up" : "/login"}
            className={`text-blue-500 underline ${isPending ? "pointer-events-none opacity-50" : ""}`}
          >
            {isLoginForm ? "Sign Up" : "Login"}
          </Link>
        </p>
      </CardFooter>
    </form>
  );
}

export default AuthForm;
