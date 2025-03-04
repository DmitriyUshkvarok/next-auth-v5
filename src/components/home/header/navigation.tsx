import Link from 'next/link';
import { NavigationProps } from './header';

const Navigation = ({ navigations }: NavigationProps) => {
  return (
    <nav>
      <ul className="flex items-center gap-2">
        {navigations.map((nav) => {
          const path = new URL(nav.url).pathname;

          return (
            <li key={nav.name}>
              <Link href={path}>{nav.name}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navigation;
