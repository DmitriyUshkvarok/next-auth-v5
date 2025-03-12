'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRouter, useSearchParams } from 'next/navigation';
import ResumeExperience from './resume-experience';
import ResumeEducation from './resume-education';

interface NavigationItem {
  name: string;
  url: string;
}

export type ResumeExperienceProps = {
  title: string;
  description: string;
  experiences:
    | {
        start: string;
        end: string;
        position: string;
        company: string;
      }[]
    | null;
} | null;

export type ResumeEducationProps = {
  title: string;
  description: string;
  educations:
    | {
        start: string;
        end: string;
        course: string;
        typeCourse: string;
      }[]
    | null;
} | null;

const ResumeNavigation = ({
  data,
  experienceData,
  educationData,
}: {
  data: NavigationItem[];
  experienceData: ResumeExperienceProps;
  educationData: ResumeEducationProps;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') || data[0]?.name;

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
              key={item.name}
              value={item.name}
              onClick={() => handleTabChange(item.name)}
              className="flex justify-center items-center w-full max-w-[500px] h-[40px] bg-card data-[state=active]:bg-primaryHome"
            >
              {item.name}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value={data[0]?.name}>
          <ResumeExperience experienceData={experienceData} />
        </TabsContent>
        <TabsContent value={data[1]?.name}>
          <ResumeEducation educationData={educationData} />
        </TabsContent>
        <TabsContent value={data[2]?.name}>hi 3</TabsContent>
        <TabsContent value={data[3]?.name}> hi 4</TabsContent>
      </Tabs>
    </>
  );
};

export default ResumeNavigation;
