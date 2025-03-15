import { getResumePageSidebarText } from '@/action/resumePageActions';
import AdminEditResumeSidebarTextForm from '@/components/admin/admin-edit-resume-page/admin-edit-resume-sidebar-text-form';

const AdminEditResumeTextPage = async () => {
  const data = await getResumePageSidebarText();
  const result = Array.isArray(data.data) ? data.data[0] : data.data;
  return (
    <section>
      <h1 className="capitalize px-4 text-3xl mb-4">
        Begin updating the resume, sidebar titles, and description page data
        within the application.
      </h1>
      <AdminEditResumeSidebarTextForm data={result} />
    </section>
  );
};

export default AdminEditResumeTextPage;
