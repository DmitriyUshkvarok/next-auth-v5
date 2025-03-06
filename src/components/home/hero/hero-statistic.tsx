'use client';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter/AnimatedCounter';

interface StatisticsHomePageProps {
  data: { count: number; title: string }[];
}

const HeroStatistic = ({ data }: StatisticsHomePageProps) => {
  return (
    <ul className="flex items-center justify-between">
      {data.map((item) => (
        <li
          key={item.title}
          className="flex flex-col items-center justify-center gap-2 sm:flex-row sm:justify-between"
        >
          <div className="text-[28px] sm:text-[34px] xl:text-[50px] leading-[1.1] font-semibold">
            <AnimatedCounter value={item.count} />
          </div>
          <div className="text-[12px] text-center sm:text-[18px] xl:text-[24px] leading-5 break-words">
            {item.title}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default HeroStatistic;
