import { getResumePageNavigation } from '@/action/resumePageActions';
import AdminEditResumeNavigation from '@/components/admin/admin-edit-resume-page/admin-edit-resume-navigation';

const AdminEditResumeNavigationPage = async () => {
  const result = await getResumePageNavigation();
  return (
    <section>
      <h1 className="capitalize px-4 text-3xl mb-4">
        Begin updating the resume navigation, page data within the application.
      </h1>
      <AdminEditResumeNavigation data={result.data ?? []} />
    </section>
  );
};

export default AdminEditResumeNavigationPage;
