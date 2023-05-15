import { useSession } from "next-auth/react";
import NavItem from "./NavItem";

export default function DesktopNavigation(props) {
  const { data: session, status } = useSession();

  return (
    <nav {...props}>
      <ul className='flex rounded-full bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10'>
        <NavItem href='/'>Home</NavItem>
        <NavItem href='/brands'>Brands</NavItem>
        {session?.user && <NavItem href='/saved-brands'>My Bookmarks</NavItem>}
        <NavItem href='/blogs'>Latest from Us</NavItem>
        {session?.user && (
          <NavItem href='/pro-version'>Upgrade to Pro / Premium</NavItem>
        )}
      </ul>
    </nav>
  );
}
