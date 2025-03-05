'use client';
import { useState } from 'react';
import { Squash as Hamburger } from 'hamburger-react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import Link from 'next/link';
import { NavigationProps } from './header';
import { usePathname } from 'next/navigation';
import DarkMode from '@/components/ui/dark-mode/dark-mode';
import HireMe from './hire-me';

const Burger = ({ navigations }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Sheet onOpenChange={setIsOpen} open={isOpen}>
      <SheetTrigger asChild>
        <div className="block md:hidden">
          <Hamburger color="#00ff88" toggled={isOpen} toggle={setIsOpen} />
        </div>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetClose
          onClick={() => setIsOpen(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none"
        >
          <Hamburger color="#00ff88" toggled={isOpen} toggle={setIsOpen} size={20}/>
        </SheetClose>

        <SheetHeader>
          <SheetTitle>Mobile Menu</SheetTitle>
          <SheetDescription>
            Use the menu below to navigate the site.
          </SheetDescription>
        </SheetHeader>
        <nav className="mt-10">
          <ul className="flex flex-col gap-6">
            {navigations.map((nav) => {
              const path = new URL(nav.url).pathname;
              const isActive = pathname === path;

              return (
                <li key={nav.name}>
                  <Link
                    href={path}
                    onClick={() => setIsOpen(false)}
                    className={`relative font-body font-medium text-white text-2xl transition-colors duration-300 capitalize 
                hover:text-primaryGreen ${isActive ? 'text-[#00ff88]' : ''}`}
                  >
                    {nav.name}
                    {isActive && (
                      <span className="absolute left-0 bottom-[-5px] w-full h-[3px] rounded-sm bg-primaryGreen"></span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <SheetFooter className="flex-col gap-4 mt-auto">
          <div className="flex justify-center items-center">
            <DarkMode />
          </div>
          <div className="flex justify-center items-center">
            <HireMe />
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default Burger;
