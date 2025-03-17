'use client';
import { Locale } from '@/i18n/routing';
import { useParams } from 'next/navigation';

type SidebarTextDataProps = {
  dataText: {
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
  };
};

const ResumeNavigationTextInfo = ({ dataText }: SidebarTextDataProps) => {
  const params = useParams();
  const locale = params.locale as Locale;
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-primaryHome text-[26px] sm:text-[30px] text-center uppercase">
        {dataText?.title[locale]}
      </h1>
      <p className="text-[14px] sm:text-[16px]">
        {dataText?.description[locale]}
      </p>
    </div>
  );
};

export default ResumeNavigationTextInfo;
