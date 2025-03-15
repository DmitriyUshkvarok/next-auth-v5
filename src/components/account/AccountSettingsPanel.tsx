import Link from 'next/link';
import DarkMode from '../ui/dark-mode/dark-mode';
import { Home, UserCog } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import LocaleSwitcher from '../ui/LocaleSwitcher.tsx/LocaleSwitcher';

const AccountSettingsPanel = ({ role }: { role: boolean }) => {
  return (
    <nav>
      <TooltipProvider>
        <ul className="flex flex-col justify-center gap-4 p-2">
          <li>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/">
                  <Home />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Home Page</p>
              </TooltipContent>
            </Tooltip>
          </li>
          {role && (
            <li>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href="/admin">
                    <UserCog />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Admin Panel</p>
                </TooltipContent>
              </Tooltip>
            </li>
          )}
          <li>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <DarkMode />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Toggle Dark Mode</p>
              </TooltipContent>
            </Tooltip>
          </li>
          <li>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <LocaleSwitcher />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Language Selection</p>
              </TooltipContent>
            </Tooltip>
          </li>
        </ul>
      </TooltipProvider>
    </nav>
  );
};

export default AccountSettingsPanel;
