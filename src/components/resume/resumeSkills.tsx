'use client';
import { motion } from 'framer-motion';
import { Locale } from '@/i18n/routing';
import { useParams } from 'next/navigation';
import { Card } from '../ui/card';

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
          {skillsData?.title[locale]}
        </motion.h2>

        <motion.p
          className="text-[12px] sm:text-[14px] text-justify mb-4"
          initial={{ opacity: 0, y: 20 }} // Начальное состояние — скрыт, смещен вниз
          whileInView={{ opacity: 1, y: 0 }} // Появление и возвращение на место
          transition={{ duration: 0.7, delay: 1.7 }} // Задержка для описания
        >
          {skillsData?.description[locale]}
        </motion.p>
      </div>
      <div className="w-full sm:w-2/3 h-[450px] overflow-y-scroll custom-scrollbar">
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {skillsData?.skills?.map((skill, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }} // Анимация с разных сторон
              whileInView={{ opacity: 1, x: 0 }} // Позиция и прозрачность в конечном состоянии
              transition={{
                duration: 0.7, // Длительность анимации
                delay: 0.4 + index * 0.2, // Задержка для каждого элемента
              }}
              viewport={{ once: true, amount: 0.3 }} // Анимация запускается, когда элемент становится видимым на 30%
            >
              <Card className="flex items-center justify-center h-[70px] text-[12px] sm:text-[14px]">
                {skill.skillName[locale]}
              </Card>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ResumeSkills;
