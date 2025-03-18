import {
  getResumeEducation,
  getResumeExperience,
  getResumePageNavigation,
  getResumePageSidebarText,
  getResumeSkills,
  getResumeAbout,
} from '@/action/resumePageActions';
import ResumeNavigation from './resume-navigation';
import ResumeNavigationTextInfo from './resume-navigation-text-info';
import { Suspense } from 'react';
const ResumeContainer = async () => {
  const result = await getResumePageNavigation();
  const dataTextResult = await getResumePageSidebarText();
  const resultForProps = Array.isArray(dataTextResult.data)
    ? dataTextResult.data[0]
    : dataTextResult.data;
  const experienceData = await getResumeExperience();
  const educationData = await getResumeEducation();
  const skillsData = await getResumeSkills();
  const aboutData = await getResumeAbout();

  return (
    <section className="px-4 py-10">
      <div>
        <div className="flex flex-col gap-6">
          <ResumeNavigationTextInfo dataText={resultForProps} />
          <Suspense fallback={null}>
            <ResumeNavigation
              data={result.data ?? []}
              experienceData={experienceData.data}
              educationData={educationData.data}
              skillsData={skillsData.data}
              aboutData={aboutData.data}
            />
          </Suspense>
        </div>
      </div>
    </section>
  );
};

export default ResumeContainer;
