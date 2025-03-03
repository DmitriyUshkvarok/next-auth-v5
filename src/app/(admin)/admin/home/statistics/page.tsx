import { getHomePageStatistics } from '@/action/homePageActions';
import AdminEditStatisticsForm from '@/components/admin/admin-edit-home-page/admin-edit-statistics-form';
const HomeEditStatisticPage = async () => {
  const result = await getHomePageStatistics();
  return (
    <section>
      <h1 className="capitalize px-4 text-3xl mb-4">
        start updating the homepage statistics data on the application
      </h1>
      <AdminEditStatisticsForm data={result.data ?? []} />
    </section>
  );
};

export default HomeEditStatisticPage;
