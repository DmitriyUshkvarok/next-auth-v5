'use client';
import { useEffect, useState } from 'react';
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
// import DarkMode from '@/components/ui/dark-mode/dark-mode';
import HireMe from './hire-me';
import { useTheme } from 'next-themes';

const Burger = ({ navigations }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { theme } = useTheme();
  const [strokeColor, setStrokeColor] = useState('hsl(35, 90%, 55%)');

  useEffect(() => {
    if (theme === 'dark') {
      setStrokeColor('hsl(150, 100%, 40%)');
    } else {
      setStrokeColor('hsl(35, 90%, 55%)');
    }
  }, [theme]);

  return (
    <Sheet onOpenChange={setIsOpen} open={isOpen}>
      <SheetTrigger asChild>
        <div className="block md:hidden">
          <Hamburger color={strokeColor} toggled={isOpen} toggle={setIsOpen} />
        </div>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetClose
          onClick={() => setIsOpen(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none"
        >
          <Hamburger
            color={strokeColor}
            toggled={isOpen}
            toggle={setIsOpen}
            size={20}
          />
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
                    className={`relative font-body font-medium text-2xl transition-colors duration-300 capitalize 
                hover:text-primaryHome ${isActive ? 'text-primaryHome' : ''}`}
                  >
                    {nav.name}
                    {isActive && (
                      <span className="absolute left-0 bottom-[-5px] w-full h-[3px] rounded-sm bg-primaryHome"></span>
                    )}
                  </Link>
                </li>
              );
            })}
            <li>
              <Link
                href="/my-account"
                className={`relative font-body font-medium text-2xl transition-colors duration-300 capitalize 
                            hover:text-primaryHome ${pathname === '/my-account' ? 'text-primaryHome' : ''}`}
              >
                Account
                {pathname === '/my-account' && (
                  <span className="absolute left-0 bottom-[-5px] w-full h-[3px] rounded-sm bg-primaryHome"></span>
                )}
              </Link>
            </li>
          </ul>
        </nav>
        <SheetFooter className="flex-col gap-4 mt-auto">
          <div className="flex justify-center items-center">
            {/* <DarkMode /> */}
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
