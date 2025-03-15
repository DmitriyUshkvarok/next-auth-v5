import { auth } from '../../../../auth';
import { redirect } from 'next/navigation';
import PageTransition from '@/components/ui/PageTransition/PageTransition';
import SrairEffect from '@/components/ui/PageTransition/SrairEffect';

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
    <>
      <SrairEffect />
      <PageTransition>
        <main>{children}</main>
      </PageTransition>
    </>
  );
}
