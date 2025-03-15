import { getHomePageResume } from '@/action/homePageActions';
import AdminEditResumeForm from '@/components/admin/admin-edit-home-page/admin-edit-resume-form';

const UpdateResumePage = async () => {
  const result = await getHomePageResume();
  return (
    <section>
      <h1 className="capitalize px-4 text-3xl mb-4">
        start updating the homepage resume on the application
      </h1>
      <AdminEditResumeForm data={result?.resumeUrl} />
    </section>
  );
};

export default UpdateResumePage;
