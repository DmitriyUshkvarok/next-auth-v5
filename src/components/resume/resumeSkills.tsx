'use client';

import { Locale } from '@/i18n/routing';
import { useParams } from 'next/navigation';

type ResumeSkillsPropsData = {
  skillsData: {
    title: {
      en: string;
      ru: string;
      uk: string;
    };
    description: {
      en: string;
      ru: string;
      uk: string;
    };
    skills: Array<{
      skillName: {
        en: string;
        ru: string;
        uk: string;
      };
    }> | null;
  } | null;
};

const ResumeSkills = ({ skillsData }: ResumeSkillsPropsData) => {
  const params = useParams();
  const locale = (params.locale as Locale)
  return (
    <div>
      <h2>{skillsData?.title[locale]}</h2>
      <p>{skillsData?.description[locale]}</p>
      <ul>
        {skillsData?.skills?.map((skill, index) => (
          <li key={index}>
            <strong>{skill?.skillName[locale]}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResumeSkills;
