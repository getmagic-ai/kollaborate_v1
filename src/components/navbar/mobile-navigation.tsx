"use client";
import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/outline";
import MobileNavItem from "./mobile-nav-item";

const MobileNavigation = (props: any) => {
  return (
    <Popover {...props}>
      <Popover.Button className='group flex items-center rounded-full bg-gray-700 px-4 py-1.5 text-sm font-medium shadow-lg shadow-zinc-800/5 ring-1 backdrop-blur bg-zinc-800/90 text-zinc-200 ring-white/10 hover:ring-white/20'>
        Menu
        <ChevronDownIcon className='ml-3 h-auto w-2 stroke-zinc-500 group-hover:stroke-zinc-400' />
      </Popover.Button>
      <Transition.Root>
        <Transition.Child
          as={Fragment}
          enter='duration-150 ease-out'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='duration-150 ease-in'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <Popover.Overlay className='fixed inset-0 z-50 backdrop-blur-sm bg-black/80' />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter='duration-150 ease-out'
          enterFrom='opacity-0 scale-95'
          enterTo='opacity-100 scale-100'
          leave='duration-150 ease-in'
          leaveFrom='opacity-100 scale-100'
          leaveTo='opacity-0 scale-95'
        >
          <Popover.Panel
            focus
            className='fixed inset-x-4 top-8 z-50 origin-top rounded-xl p-4 ring-1 ring-zinc-900/5 bg-zinc-900 ring-zinc-800'
          >
            <div className='flex flex-row-reverse items-center justify-between'>
              <Popover.Button aria-label='Close menu' className='-m-1 p-1'>
                <XMarkIcon className='h-6 w-6  text-zinc-400' />
              </Popover.Button>
              <h2 className='text-sm font-medium text-zinc-400'>Navigation</h2>
            </div>
            <nav className='mt-6'>
              <ul className='-my-2 divide-y divide-zinc-100 text-base divide-zinc-100/5 text-zinc-300'>
                <MobileNavItem href='/'>Brands</MobileNavItem>
                <MobileNavItem href='/bookmarks'>Bookmarks</MobileNavItem>
                <MobileNavItem href='/blogs'>Latest from us</MobileNavItem>
              </ul>
            </nav>
          </Popover.Panel>
        </Transition.Child>
      </Transition.Root>
    </Popover>
  );
};

export default MobileNavigation;
