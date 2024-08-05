"use client";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

import { dark } from "@clerk/themes";
import { MoveRight, Search } from "lucide-react";
import Link from "next/link";
import MainNav from "./main-nav";
import { useEffect, useState } from "react";

const Navbar = () => {
  const isPro = false;
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  return (
    <div className=''>
      <div className='flex space-x-4 h-16 items-center px-4'>
        <Link href='/' className='font-semibold text-xl text-white'>
          kollaborate
        </Link>
        <div className='flex flex-1 justify-end'>
          <MainNav isPro={isPro} />
        </div>
        <Link
          href='/search'
          className='rounded-full p-1.5 text-sm font-medium shadow-lg shadow-zinc-800/5 ring-1 backdrop-blur bg-zinc-800/90 text-zinc-200 ring-white/10'
        >
          <Search className='w-5 h-5' />
        </Link>
        <div className='ml-auto flex items-center space-x-4'>
          <SignedIn>
            {/* Mount the UserButton component */}
            <UserButton
              userProfileMode='navigation'
              userProfileUrl={
                typeof window !== "undefined"
                  ? `${window.location.origin}/profile`
                  : "/profile"
              }
              appearance={{
                baseTheme: dark,
                elements: {
                  scrollBox: {
                    width: "1px",
                  },
                  pageScrollBox: {
                    width: 0,
                  },
                },
              }}
              afterSignOutUrl='/'
            />
          </SignedIn>
          <SignedOut>
            {/* Signed out users get sign in button */}
            <SignInButton mode='modal'>
              <button className='group flex items-center rounded-full bg-gray-700 px-4 py-2 text-sm font-medium shadow-lg shadow-zinc-800/5 ring-1 backdrop-blur bg-zinc-800/90 text-zinc-200 ring-white/10 hover:ring-white/20'>
                {/* <span className='hidden md:flex'>Sign In</span> */}
                <MoveRight className='h-4 w-4 stroke-zinc-200 group-hover:stroke-zinc-400' />
              </button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
