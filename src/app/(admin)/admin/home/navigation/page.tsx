import { getHomePageNavigation } from '@/action/homePageActions';
import AdminEditNavigationForm from '@/components/admin/admin-edit-home-page/admin-edit-navigation-form';
const HomeEditNavigationPage = async () => {
  const result = await getHomePageNavigation();
  return (
    <section>
      <h1 className="capitalize px-4 text-3xl mb-4">
        start updating the homepage navigation data on the application
      </h1>
      <AdminEditNavigationForm data={result.data ?? []} />
    </section>
  );
};

export default HomeEditNavigationPage;
