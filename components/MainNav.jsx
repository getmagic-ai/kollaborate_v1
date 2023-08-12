"use client";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import DesktopNavigation from "./DesktopNavigation";
import MobileNavigation from "./MobileNavigation";

function MainNav({ className, isPro = false, ...props }) {
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
      href: isPro ? `/settings` : `/pro-version`,
      label: isPro ? "Settings" : "Pro",
      active: isPro ? pathname === `/settings` : pathname === `/pro-version`,
    },
    {
      href: `/invite-a-friend`,
      label: "Invite a friend",
      active: pathname === `/invite-a-friend`,
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
