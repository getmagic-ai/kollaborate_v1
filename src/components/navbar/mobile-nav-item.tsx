"use client";
import Link from "next/link";
import { Popover } from "@headlessui/react";

interface MobileNavItemProps {
  href: string;
  children: React.ReactNode;
}

const MobileNavItem: React.FC<MobileNavItemProps> = ({ href, children }) => {
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
};

export default MobileNavItem;
