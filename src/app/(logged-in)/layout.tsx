import Link from 'next/link';
import LogoutButton from '@/components/forms/logout-button';
import { auth } from '../../../auth';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import ProfileAvatar from '@/components/account-header/ProfileAvatar';

export default async function LoggedInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const role = session?.user?.role === 'admin';

  if (!session?.user?.id) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-[hsl(40,35%,77%)] dark:bg-[hsl(240,0%,13%)] flex justify-between p-4 items-center">
        <ul className="flex gap-4">
          <li>
            <Link href="/my-account">My Account</Link>
          </li>
          {role && (
            <li>
              <Link href="/admin">Admin Panel</Link>
            </li>
          )}
          <Suspense fallback={null}>
            <ProviderCheck />
          </Suspense>
        </ul>
        <div className="ml-auto mr-8">
          <ProfileAvatar user={session?.user} />
        </div>
        <div>
          <LogoutButton />
        </div>
      </nav>
      <div className="flex-1 flex justify-center items-center">{children}</div>
    </div>
  );
}

async function ProviderCheck() {
  const session = await auth();
  const provider = session?.user?.provider !== 'google';

  return (
    <>
      {provider && (
        <li>
          <Link href="/change-password">Change Password</Link>
        </li>
      )}
    </>
  );
}
