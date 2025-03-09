import { getResumePageNavigation } from '@/action/resumePageActions';
import AdminEditResumeNavigation from '@/components/admin/admin-edit-resume-page/admin-edit-resume-navigation';

const AdminEditResumeNavigationPage = async () => {
  const result = await getResumePageNavigation();
  return (
    <>
      <AdminEditResumeNavigation data={result.data ?? []} />
    </>
  );
};

export default AdminEditResumeNavigationPage;
