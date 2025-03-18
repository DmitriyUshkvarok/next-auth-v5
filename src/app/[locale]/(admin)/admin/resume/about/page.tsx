import { getResumeAbout } from '@/action/resumePageActions';
import AdminEditResumeAbout from '@/components/admin/admin-edit-resume-page/admin-edit-resume-about';

const ResumeAboutPage = async () => {
  const result = await getResumeAbout();

  return (
    <section>
      <h1 className="capitalize px-4 text-3xl mb-4">
        Begin updating the resume About, page data within the application.
      </h1>
      <AdminEditResumeAbout data={result.data} />
    </section>
  );
};

export default ResumeAboutPage;
