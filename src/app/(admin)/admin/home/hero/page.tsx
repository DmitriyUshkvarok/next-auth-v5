import { getHomePageHero } from '@/action/homePageActions';
import AdminEditHeroForm from '@/components/admin/admin-edit-home-page/admin-edit-hero-form';

const HomeEditHeroPage = async () => {
  const data = await getHomePageHero();
  const result = Array.isArray(data.data) ? data.data[0] : data.data;

  return (
    <section>
      <h1 className="capitalize px-4 text-3xl mb-4">
        start updating the homepage hero data on the application
      </h1>
      <AdminEditHeroForm data={result} />
    </section>
  );
};

export default HomeEditHeroPage;
