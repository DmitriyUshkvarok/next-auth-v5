'use client';
import { Locale } from '@/i18n/routing';
import { useParams } from 'next/navigation';

interface ResumeExperiencePropsData {
  experienceData: {
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
    experiences:
      | {
          start: string;
          end: string;
          position: {
            en: string;
            ru: string;
            uk: string;
          };
          company: {
            en: string;
            ru: string;
            uk: string;
          };
        }[]
      | null;
  } | null;
}
const ResumeExperience = ({ experienceData }: ResumeExperiencePropsData) => {
  const params = useParams();
  const locale = params.locale as Locale;
  return (
    <div>
      <h2>{experienceData?.title[locale]}</h2>
      <p>{experienceData?.description[locale]}</p>
      <ul>
        {experienceData?.experiences?.map((experience, index) => (
          <li key={index}>
            <strong>{experience.position[locale]}</strong> at
            {experience.company[locale]} ({experience.start} - {experience.end})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResumeExperience;
