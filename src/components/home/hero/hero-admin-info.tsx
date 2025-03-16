'use client';
import { motion } from 'framer-motion';
import { Locale } from '@/i18n/routing';
import { useParams } from 'next/navigation';

type HeroInfoProps = {
  result: {
    position: { en: string; ru: string; uk: string } | null;
    title: { en: string; ru: string; uk: string } | null;
    developerName: { en: string; ru: string; uk: string } | null;
    description: { en: string; ru: string; uk: string } | null;
  };
};

const textVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// Медленный эффект волны
const waveAnimation = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: { delay: i * 0.08, duration: 0.4 },
  }),
};

// Компонент для анимации текста волной
const AnimatedText = ({ text }: { text: string }) => (
  <span>
    {text.split('').map((char, i) => (
      <motion.span
        key={i}
        custom={i}
        initial="hidden"
        animate="visible"
        variants={waveAnimation}
      >
        {char}
      </motion.span>
    ))}
  </span>
);

const HeroAdminInfo = ({ result }: HeroInfoProps) => {
  const params = useParams();
  const locale = params.locale as Locale;
  return (
    <>
      {/* Позиция */}
      <motion.div
        className="flex justify-center sm:justify-start text-xl mb-2"
        initial="hidden"
        animate="visible"
        variants={textVariant}
      >
        {result?.position?.[locale]}
      </motion.div>

      {/* Заголовок с эффектом волны */}
      <h1 className="text-center sm:text-left">
        <AnimatedText text={result?.title?.[locale] || ''} />
      </h1>

      {/* Имя разработчика с таким же эффектом волны */}
      <div className="mb-6 text-center sm:text-left text-[48px] xl:text-[80px] leading-[1.1] font-semibold text-primaryHome">
        <AnimatedText text={result?.developerName?.[locale] || ''} />
      </div>

      {/* Описание с плавным появлением */}
      <motion.p
        className="max-w-[500px] mb-9 text-center sm:text-left"
        initial="hidden"
        animate="visible"
        variants={textVariant}
        transition={{ delay: 0.3 }}
      >
        {result?.description?.[locale]}
      </motion.p>
    </>
  );
};

export default HeroAdminInfo;
