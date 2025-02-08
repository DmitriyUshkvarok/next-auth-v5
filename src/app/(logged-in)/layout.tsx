import Link from 'next/link';
import LogoutButton from '@/components/forms/logout-button';
import { auth } from '../../../auth';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

export default async function LoggedInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-gray-200 flex justify-between p-4 items-center">
        <ul className="flex gap-4">
          <li>
            <Link href="/my-account">My Account</Link>
          </li>
          <Suspense fallback={null}>
            <ProviderCheck />
          </Suspense>
        </ul>
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
