import {
  getResumePageNavigation,
  getResumePageSidebarText,
} from '@/action/resumePageActions';
import ResumeNavigation from './resume-navigation';

const ResumeNavigationContainer = async () => {
  const result = await getResumePageNavigation();
  const dataTextResult = await getResumePageSidebarText();
  const resultForProps = Array.isArray(dataTextResult.data)
    ? dataTextResult.data[0]
    : dataTextResult.data;

  return (
    <section className="py-14">
      <ResumeNavigation data={result.data ?? []} dataText={resultForProps} />
    </section>
  );
};

export default ResumeNavigationContainer;
