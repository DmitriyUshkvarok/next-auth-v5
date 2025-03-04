import { getHomePageNavigation } from '@/action/homePageActions';
import Header from '@/components/home/header/header';

export default async function Home() {
  const pageRoutes = await getHomePageNavigation();

  return <Header navigations={pageRoutes.data ?? []} />;
}
