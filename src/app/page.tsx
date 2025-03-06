import { getHomePageNavigation } from '@/action/homePageActions';
import Header from '@/components/home/header/header';
import HeroContainer from '@/components/home/hero/hero-container';
import PageTransition from '@/components/ui/PageTransition/PageTransition';
import SrairEffect from '@/components/ui/PageTransition/SrairEffect';

export default async function Home() {
  const pageRoutes = await getHomePageNavigation();

  return (
    <>
      <Header navigations={pageRoutes.data ?? []} />
      <SrairEffect />
      <PageTransition>
        <HeroContainer />
      </PageTransition>
    </>
  );
}
