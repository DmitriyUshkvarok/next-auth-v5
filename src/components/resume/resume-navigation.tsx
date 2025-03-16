'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import ResumeExperience from './resume-experience';
import ResumeEducation from './resume-education';
import ResumeSkills from './resumeSkills';
import { Locale } from '@/i18n/routing';
import {
  NavigationItem,
  ResumeEducationProps,
  ResumeExperienceProps,
  ResumeSkillsProps,
} from './types/types';

const ResumeNavigation = ({
  data,
  experienceData,
  educationData,
  skillsData,
}: {
  data: NavigationItem[];
  experienceData: ResumeExperienceProps;
  educationData: ResumeEducationProps;
  skillsData: ResumeSkillsProps;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const locale = params.locale as Locale;
  const activeTab = searchParams.get('tab') || data[0]?.name.en;

  const handleTabChange = (tabName: string) => {
    router.push(`/resume?tab=${tabName}`);
  };

  return (
    <>
      <Tabs
        defaultValue={activeTab}
        className="mt-4 flex justify-between w-full h-full"
      >
        <TabsList className="flex flex-col gap-4 justify-normal w-full max-w-[500px] h-full bg-transparent">
          {data.map((item) => (
            <TabsTrigger
              key={item?.name.en}
              value={item?.name.en}
              onClick={() => handleTabChange(item.name.en)}
              className="flex justify-center items-center w-full max-w-[500px] h-[40px] bg-card data-[state=active]:bg-primaryHome"
            >
              {item?.name[locale]}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value={data[0]?.name.en}>
          <ResumeExperience experienceData={experienceData} />
        </TabsContent>
        <TabsContent value={data[1]?.name.en}>
          <ResumeEducation educationData={educationData} />
        </TabsContent>
        <TabsContent value={data[2]?.name.en}>
          <ResumeSkills skillsData={skillsData} />
        </TabsContent>
        <TabsContent value={data[3]?.name.en}> hi 4</TabsContent>
      </Tabs>
    </>
  );
};

export default ResumeNavigation;
