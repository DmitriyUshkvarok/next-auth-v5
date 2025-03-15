import { getHomePageSocialLinks } from '@/action/homePageActions';
import AdminEditSocialLinksForm from '@/components/admin/admin-edit-home-page/admin-edit-social-links-form';

const HomeEditNavLinksPage = async () => {
  const result = await getHomePageSocialLinks();
  return (
    <section>
      <h1 className="capitalize px-4 text-3xl mb-4">
        start updating the homepage social links data on the application
      </h1>
      <AdminEditSocialLinksForm data={result.data ?? []} />
    </section>
  );
};

export default HomeEditNavLinksPage;
