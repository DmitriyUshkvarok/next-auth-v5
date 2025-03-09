import {
  getResumePageNavigation,
  getResumePageSidebarText,
} from '@/action/resumePageActions';
import ResumeNavigation from './resume-navigation';
import ResumeNavigationTextInfo from './resume-navigation-text-info';

const ResumeContainer = async () => {
  const result = await getResumePageNavigation();
  const dataTextResult = await getResumePageSidebarText();
  const resultForProps = Array.isArray(dataTextResult.data)
    ? dataTextResult.data[0]
    : dataTextResult.data;

  return (
    <section className="px-2">
      <div>
        <div className="flex flex-col gap-6">
          <ResumeNavigationTextInfo dataText={resultForProps} />
          <ResumeNavigation data={result.data ?? []} />
        </div>
      </div>
    </section>
  );
};

export default ResumeContainer;
