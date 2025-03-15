import { getResumeExperience } from '@/action/resumePageActions';
import AdminEditResumeExperience from '@/components/admin/admin-edit-resume-page/admin-edit-resume-experience';

const ResumeExperincePage = async () => {
  const result = await getResumeExperience();

  return (
    <section>
      <h1 className="capitalize px-4 text-3xl mb-4">
        Begin updating the resume experince, page data within the application.
      </h1>
      <AdminEditResumeExperience data={result.data} />
    </section>
  );
};

export default ResumeExperincePage;
