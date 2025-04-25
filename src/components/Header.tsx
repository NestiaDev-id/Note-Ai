import React from "react";
import Image from "next/image";
import Link from "next/link";
import { shadow } from "@/styles/utils";
import { Button } from "./ui/button";
import { DarkModeToggle } from "./DarkModeToggle";

function Header() {
  const user = null;
  return (
    <div
      className="justify-beetween bg-popover relative flex h-24 w-full items-center px-3 sm:px-8"
      style={{ boxShadow: shadow }}
    >
      <Link href="/">
        <Image
          src="/logo.png"
          alt="logo"
          width={60}
          height={60}
          className="rounded-full"
        />
        <h1 className="flex flex-col pb-1 text-2xl leading-6 font-semibold">
          Note <span>Ai</span>{" "}
        </h1>
      </Link>
      <div className="flex gap-4">
        {user ? (
          "Logout"
        ) : (
          <>
            <Button asChild>
              <Link href="/sign-up" className="hidden sm:block">
                Sign Up
              </Link>
            </Button>
            <Button asChild variant={"outline"}>
              <Link href="/login">Login</Link>
            </Button>
          </>
        )}
        <DarkModeToggle />
      </div>
    </div>
  );
}

export default Header;
