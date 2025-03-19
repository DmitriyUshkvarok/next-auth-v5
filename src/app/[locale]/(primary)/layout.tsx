import Header from '@/components/home/header/header';
import { getHomePageNavigation } from '@/action/homePageActions';
import PageTransition from '@/components/ui/PageTransition/PageTransition';
import SrairEffect from '@/components/ui/PageTransition/SrairEffect';
import { auth } from '../../../../auth';
import { redirect } from 'next/navigation';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const isAdmin = session?.user.role === 'admin';

  if (!isAdmin) {
    return redirect('/my-account');
  }

  const pageRoutes = await getHomePageNavigation();

  return (
    <>
      <Header navigations={pageRoutes.data ?? []} />
      <SrairEffect />
      <PageTransition>
        <main className={`container mx-auto '}`}>
          <section>{children}</section>
        </main>
      </PageTransition>
    </>
  );
}
