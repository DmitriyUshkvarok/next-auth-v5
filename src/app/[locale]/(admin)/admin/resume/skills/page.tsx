import { getResumeSkills } from '@/action/resumePageActions';
import AdminEditResumeSkills from '@/components/admin/admin-edit-resume-page/admin-edit-resume-skills';

const ResumeSkillsPage = async () => {
  const result = await getResumeSkills();

  return (
    <section>
      <h1 className="capitalize px-4 text-3xl mb-4">
        Begin updating the resume skills page data within the application.
      </h1>
      <AdminEditResumeSkills data={result.data} />
    </section>
  );
};

export default ResumeSkillsPage;
