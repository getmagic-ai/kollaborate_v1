"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export function MainNav({ className, ...props }) {
  const pathname = usePathname();
  const params = useParams();
  const routes = [
    {
      href: `/brands`,
      label: "Brands",
      active: pathname === `/brands`,
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
  ];
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors text-gray-200 hover:text-gray-500",
            route.active ? "text-white" : "text-gray-300"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
}
