"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface DesktopNavigationProps {
  routes: {
    href: string;
    label: string;
    active: boolean;
  }[];
  classNames: string;
}
const DesktopNavigation: React.FC<DesktopNavigationProps> = ({
  routes,
  classNames,
}) => {
  return (
    <nav className={classNames}>
      <ul className='flex space-x-4 lg:space-x-8 rounded-full px-6 py-1.5 text-sm font-medium shadow-lg shadow-zinc-800/5 ring-1 backdrop-blur bg-zinc-800/90 text-zinc-200 ring-white/10'>
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "relative text-sm font-normal transition-colors text-gray-400 hover:text-gray-500",
              route.active ? "text-white" : "text-gray-400"
            )}
          >
            {route.label}
            {route.active && (
              <span className='absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-indigo-100/10 via-indigo-400/40 to-indigo-400/10' />
            )}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default DesktopNavigation;
