import Header from '@/components/home/header/header';
import { getHomePageNavigation } from '@/action/homePageActions';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pageRoutes = await getHomePageNavigation();
  return (
    <>
      <Header navigations={pageRoutes.data ?? []} />
      <main>{children}</main>
    </>
  );
}
