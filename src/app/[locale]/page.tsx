import { getHomePageNavigation } from '@/action/homePageActions';
import Header from '@/components/home/header/header';
import HeroContainer from '@/components/home/hero/hero-container';
import { auth } from '../../../auth';
import { redirect } from 'next/navigation';

export default async function Home() {
  const pageRoutes = await getHomePageNavigation();
  const session = await auth();
  const isAdmin = session?.user.role === 'admin';

  if (!isAdmin) {
    return redirect('/my-account');
  }

  return (
    <>
      <Header navigations={pageRoutes.data ?? []} />
      <HeroContainer />
    </>
  );
}
