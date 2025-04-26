import React from "react";
import Image from "next/image";
import Link from "next/link";
import { shadow } from "@/styles/utils";
import { Button } from "./ui/button";
import { DarkModeToggle } from "./DarkModeToggle";
import LogoutButton from "./LogoutButton";
import { getUser } from "@/auth/server";

async function Header() {
  const user = await getUser();

  return (
    <header
      className="bg-popover relative flex h-24 w-full items-center justify-between px-3 sm:px-8"
      style={{
        boxShadow: shadow,
      }}
    >
      {/* <SidebarTrigger className="absolute top-1 left-1" /> */}

      <Link className="flex items-end gap-2" href="/">
        <Image
          src="/globe.svg"
          height={60}
          width={60}
          alt="logo"
          className="rounded-full"
          priority
        />

        <h1 className="flex flex-col pb-1 text-2xl leading-6 font-semibold">
          Note <span>Ai</span>
        </h1>
      </Link>

      <div className="flex gap-4">
        {user ? (
          <LogoutButton />
        ) : (
          <>
            <Button asChild>
              <Link href="/sign-up" className="hidden sm:block">
                Sign Up
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/login">Login</Link>
            </Button>
          </>
        )}
        <DarkModeToggle />
      </div>
    </header>
  );
}

export default Header;
