'use client';
import { motion } from 'framer-motion';
import { Locale } from '@/i18n/routing';
import { useParams } from 'next/navigation';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';

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
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="w-full sm:w-1/3">
        <motion.h2
          className="text-primaryHome text-[20px] sm:text-[24px] leading-none uppercase mb-2"
          initial={{ opacity: 0, y: -30 }} // Начальное состояние — скрыт, смещен вверх
          whileInView={{ opacity: 1, y: 0 }} // Появление и плавное возвращение на место
          transition={{ duration: 0.7, delay: 1.5 }} // Задержка на 1.5 секунды
        >
          {experienceData?.title[locale]}
        </motion.h2>

        <motion.p
          className="text-[12px] sm:text-[14px] text-justify mb-4"
          initial={{ opacity: 0, y: 20 }} // Начальное состояние — скрыт, смещен вниз
          whileInView={{ opacity: 1, y: 0 }} // Появление и возвращение на место
          transition={{ duration: 0.7, delay: 1.7 }} // Задержка для описания
        >
          {experienceData?.description[locale]}
        </motion.p>
      </div>
      <ul className="w-full sm:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {experienceData?.experiences?.map((experience, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }} // Анимация с разных сторон
            whileInView={{ opacity: 1, x: 0 }} // Позиция и прозрачность в конечном состоянии
            transition={{
              duration: 0.7, // Длительность анимации
              delay: 1.5 + index * 0.2, // Задержка для каждого элемента
            }}
            viewport={{ once: true, amount: 0.3 }} // Анимация запускается, когда элемент становится видимым на 30%
          >
            <Card className="flex flex-col gap-4 h-full">
              <CardHeader className="flex-grow-0">
                <CardTitle className="text-[12px] sm:text-[14px] text-primaryHome">
                  {experience.start} - {experience.end}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                {experience.company[locale]}
              </CardContent>
              <CardFooter className="flex-grow-0">
                <div className="relative flex items-center pl-6 capitalize">
                  {experience.position[locale]}
                  <span className="absolute left-0 top-1/2 transform -translate-y-1/2 w-2.5 h-2.5 bg-green-500 rounded-full mr-2"></span>
                </div>
              </CardFooter>
            </Card>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default ResumeExperience;
