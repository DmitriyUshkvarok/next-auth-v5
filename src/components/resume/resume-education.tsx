'use client';
import { useParams } from 'next/navigation';
import { Locale } from '@/i18n/routing';
interface ResumeEducationPropsData {
  educationData: {
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
    educations:
      | {
          start: string;
          end: string;
          course: {
            en: string;
            ru: string;
            uk: string;
          };
          typeCourse: {
            en: string;
            ru: string;
            uk: string;
          };
        }[]
      | null;
  } | null;
}
const ResumeEducation = ({ educationData }: ResumeEducationPropsData) => {
  const params = useParams();
  const locale = params.locale as Locale;
  return (
    <div>
      <h2>{educationData?.title[locale]}</h2>
      <p>{educationData?.description[locale]}</p>
      <ul>
        {educationData?.educations?.map((education, index) => (
          <li key={index}>
            <strong>{education.course[locale]}</strong> at
            {education.typeCourse[locale]} ({education.start} - {education.end})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResumeEducation;
