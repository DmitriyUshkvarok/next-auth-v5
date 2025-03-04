'use client';
import Link from 'next/link';
import { NavigationProps } from './header';
import { usePathname } from 'next/navigation';

const Navigation = ({ navigations }: NavigationProps) => {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="flex items-center gap-6">
        {navigations.map((nav) => {
          const path = new URL(nav.url).pathname;
          const isActive = pathname === path;

          return (
            <li key={nav.name}>
              <Link
                href={path}
                className={`relative font-body font-medium text-white text-lg transition-colors duration-300 capitalize 
                hover:text-primaryGreen ${isActive ? 'text-primaryGreen' : ''}`}
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
  );
};

export default Navigation;
