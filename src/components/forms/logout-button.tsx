'use client';

import { Button } from '@/components/ui/button';
import { logout } from '@/action/authActions'; 

export default function LogoutButton() {
  return (
    <Button
      size="sm"
      onClick={async () => {
        await logout();
      }}
    >
      Logout
    </Button>
  );
}
