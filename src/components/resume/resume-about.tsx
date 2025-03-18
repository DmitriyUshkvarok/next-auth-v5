'use client';
import { Locale } from '@/i18n/routing';
import { useParams } from 'next/navigation';
import { ResumeAboutProps } from './types/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
// import { motion } from 'framer-motion';

export type ResumeAboutPropsData = {
  aboutData: ResumeAboutProps | null;
};

const ResumeAbout = ({ aboutData }: { aboutData: ResumeAboutProps }) => {
  const params = useParams();
  const locale = params.locale as Locale;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-primaryHome mb-4 text-3xl">
          {aboutData?.title[locale]}
        </CardTitle>
        <CardDescription className="text-xl">
          {aboutData?.description[locale]}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-xl">{aboutData?.subDescription[locale]}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-center gap-2">
        <p className="text-lg">Name: {aboutData?.name[locale]}</p>
        <p className="text-lg">Email: {aboutData?.email}</p>
        <p className="text-lg">Experience: {aboutData?.experience[locale]}</p>
        <p className="text-lg">Nationality: {aboutData?.nationality[locale]}</p>
        <p className="text-lg">Date of Birth: {aboutData?.dateOfBirth}</p>
        <p className="text-lg">Location: {aboutData?.location[locale]}</p>
      </CardFooter>
    </Card>
  );
};

export default ResumeAbout;
