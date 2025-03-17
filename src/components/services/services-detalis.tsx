'use client';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '../ui/card';
import BackButton from '../ui/BackButton/BackButton';
import { useParams } from 'next/navigation';
import { Locale } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

type ServiceData = {
  title: {
    en: string;
    ru: string;
    uk: string;
  } | null;
  description: {
    en: string;
    ru: string;
    uk: string;
  } | null;
} | null;
const ServicesDetails = ({ data }: { data: ServiceData }) => {
  const params = useParams();
  const locale = params.locale as Locale;
  const t = useTranslations('ServicesDetails');
  return (
    <section className="p-4">
      <Card className="border border-primaryHome p-4 rounded-lg shadow-md">
        <CardHeader className="p-2 border-b-[1px] border-b-gray-700">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold text-primaryHome mb-2 uppercase">
              {data?.title?.[locale]}
            </CardTitle>
            <BackButton />
          </div>
        </CardHeader>

        <CardContent>
          <div className="rounded-lg mt-6">
            <h2 className="text-xl font-semibold text-primaryHome">
              {t('title')}
            </h2>
            <CardDescription className="text-lg">
              {data?.description?.[locale]}
            </CardDescription>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default ServicesDetails;
