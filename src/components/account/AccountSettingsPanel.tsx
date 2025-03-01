import Link from 'next/link';
import DarkMode from '../ui/dark-mode/dark-mode';
import { Home, UserCog } from 'lucide-react';

const AccountSettingsPanel = ({ role }: { role: boolean }) => {
  return (
    <nav>
      <ul className="flex flex-col justify-center gap-4 p-2">
        <li>
          <Link href="/">
            <Home />
          </Link>
        </li>
        {role && (
          <li>
            <Link href="/admin">
              <UserCog />
            </Link>
          </li>
        )}
        <li>
          <DarkMode />
        </li>
      </ul>
    </nav>
  );
};

export default AccountSettingsPanel;
