import { getHomePageNavigation } from '@/action/homePageActions';
import Header from '@/components/home/header/header';
import HeroContainer from '@/components/home/hero/hero-container';

export default async function Home() {
  const pageRoutes = await getHomePageNavigation();

  return (
    <>
      <Header navigations={pageRoutes.data ?? []} />
      <HeroContainer />
    </>
  );
}
