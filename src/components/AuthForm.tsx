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
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;

      try {
        if (isLoginForm) {
          const { errorMessage, noteId } = await loginUserAction(email, password);
          if (errorMessage) throw new Error(errorMessage);
          
          // Force a router refresh to update auth state
          router.refresh();
          
          // Redirect to the latest note or home
          if (noteId) {
            router.push(`/?noteId=${noteId}`);
          } else {
            router.push('/');
          }
          
          toast.success("Login successful!");
        } else {
          const { errorMessage } = await signUpUserAction(email, password);
          if (errorMessage) throw new Error(errorMessage);
          
          // Force a router refresh to update auth state
          router.refresh();
          router.push('/');
          
          toast.success("Sign up successful!");
        }
      } catch (error: unknown) {
        const errMsg = error instanceof Error ? error.message : "An error occurred. Please try again.";
        toast.error(errMsg);
        console.error("AuthForm error:", error);
      }      
    });
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
        <Button className="w-full" disabled={isPending}>
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
