'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../ui/card';
import { Locale } from '@/i18n/routing';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
type ServiicesProps = {
  data: {
    count: number;
    title: { en: string; ru: string; uk: string };
    description: { en: string; ru: string; uk: string };
  }[];
};
const ServicesList = ({ data }: ServiicesProps) => {
  const t = useTranslations('ServicesList');
  const params = useParams();
  const locale = params.locale as Locale;
  const truncateText = (text: string, maxLength = 200) => {
    return text.length > maxLength
      ? text.slice(0, maxLength).trimEnd() + '...'
      : text;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {data.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }} // Анимация с разных сторон
          whileInView={{ opacity: 1, x: 0 }} // Позиция и прозрачность в конечном состоянии
          transition={{
            duration: 0.7, // Длительность анимации
            delay: 0.6 + index * 0.2, // Задержка для каждого элемента
          }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <Card
            key={item.count}
            className="border border-primaryHome p-4 rounded-lg transition-transform duration-300 hover:scale-[1.01]"
          >
            <Link
              href={`/service/${item.count}`}
              className="flex flex-col gap-4 "
            >
              <CardHeader className="text-[28px] text-primaryHome sm:text-[34px] xl:text-[60px] leading-[1.1] font-semibold">
                <div className="mb-2 sm:mb-4"> {item.count}</div>
                <CardTitle className="uppercase text-[12px] font-semibold sm:text-[18px] xl:text-[24px] leading-5 break-words">
                  {item.title[locale]}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <CardDescription>
                  {truncateText(item.description[locale])}
                </CardDescription>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <span className="text-[11px] sm:text-sm text-muted-foreground">
                  {t('lastUpdated', { date: new Date().toLocaleDateString() })}
                </span>
                <span className="text-primaryHome text-[11px] sm:text-sm font-medium hover:underline cursor-pointer">
                  {t('learnMore')}
                </span>
              </CardFooter>
            </Link>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default ServicesList;
