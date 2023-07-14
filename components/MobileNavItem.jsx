"use client";
import Link from "next/link";
import { Popover } from "@headlessui/react";

export default function MobileNavItem({ href, children }) {
  return (
    <li>
      <Popover.Button
        as={Link}
        href={href}
        className='block py-2 font-light text-sm'
      >
        {children}
      </Popover.Button>
    </li>
  );
}
