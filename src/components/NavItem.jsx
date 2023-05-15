import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";

export default function NavItem({ href, children }) {
  let isActive = useRouter().pathname === href;
  return (
    <li>
      <Link
        href={href}
        className={clsx(
          "relative block px-3 py-2 transition",
          isActive
            ? "text-indigo-500 dark:text-indigo-400"
            : "hover:text-indigo-500 dark:hover:text-indigo-400"
        )}
      >
        {children}
        {isActive && (
          <span className='absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-indigo-500/0 via-indigo-500/40 to-indigo-500/0 dark:from-indigo-400/0 dark:via-indigo-400/40 dark:to-indigo-400/0' />
        )}
      </Link>
    </li>
  );
}
