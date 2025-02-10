'use client';

import { Button } from '@/components/ui/button';
import { logout } from '@/action/authActions';
import { LogOut } from 'lucide-react';

export default function LogoutButton() {
  return (
    <Button
      variant="outline"
      className="p-0 outline-none border-none bg-transparent hover:bg-transparent"
      onClick={async () => {
        await logout();
      }}
    >
      <LogOut />
      <span>Log out</span>
    </Button>
  );
}
