import Header from '@/components/home/header/header';
import { getHomePageNavigation } from '@/action/homePageActions';
import PageTransition from '@/components/ui/PageTransition/PageTransition';
import SrairEffect from '@/components/ui/PageTransition/SrairEffect';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
