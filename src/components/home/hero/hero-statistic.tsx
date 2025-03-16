'use client';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter/AnimatedCounter';
import { Locale } from '@/i18n/routing';
import { useParams } from 'next/navigation';

interface StatisticsHomePageProps {
  data: { count: number; title: { en: string; ru: string; uk: string } }[];
}

const HeroStatistic = ({ data }: StatisticsHomePageProps) => {
  const params = useParams();
  const locale = params.locale as Locale;
  return (
    <ul className="flex items-center justify-between">
      {data.map((item, index) => (
        <li
          key={index}
          className="flex flex-col items-center justify-center gap-2 sm:flex-row sm:justify-between"
        >
          <div className="text-[28px] text-primaryHome sm:text-[34px] xl:text-[50px] leading-[1.1] font-semibold">
            <AnimatedCounter value={item.count} />
          </div>
          <div className="text-[12px] font-semibold text-center sm:text-[18px] xl:text-[24px] leading-5 break-words">
            {item.title[locale]}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default HeroStatistic;
