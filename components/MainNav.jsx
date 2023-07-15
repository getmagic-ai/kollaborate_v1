"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import DesktopNavigation from "./DesktopNavigation";
import MobileNavigation from "./MobileNavigation";

function MainNav({ className, ...props }) {
  const pathname = usePathname();
  const routes = [
    {
      href: `/`,
      label: "Brands",
      active: pathname === `/`,
    },
    {
      href: `/bookmarks`,
      label: "Bookmarks",
      active: pathname === `/bookmarks`,
    },
    {
      href: `/blogs`,
      label: "Blogs",
      active: pathname === `/blogs`,
    },
    {
      href: `/pro-version`,
      label: "Pro",
      active: pathname === `/pro-version`,
    },
  ];
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      <DesktopNavigation
        routes={routes}
        classNames='pointer-events-auto hidden md:block'
      />
      <MobileNavigation className='pointer-events-auto md:hidden' />
    </nav>
  );
}
export default MainNav;
