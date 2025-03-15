import { getResumeEducation } from '@/action/resumePageActions';
import AdminEditResumeEducation from '@/components/admin/admin-edit-resume-page/admin-edit-resume-education';

const ResumeEducationPage = async () => {
  const result = await getResumeEducation();

  return (
    <section>
      <h1 className="capitalize px-4 text-3xl mb-4">
        Begin updating the resume education, page data within the application.
      </h1>
      <AdminEditResumeEducation data={result.data} />
    </section>
  );
};

export default ResumeEducationPage;
