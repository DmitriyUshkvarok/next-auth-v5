'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const HeroPhoto = ({ photo }: { photo: string | null }) => {
  const { theme } = useTheme();
  const [strokeColor, setStrokeColor] = useState('hsl(35, 90%, 55%)');

  useEffect(() => {
    if (theme === 'dark') {
      setStrokeColor('hsl(150, 100%, 40%)'); // Зелёный для тёмной темы
    } else {
      setStrokeColor('hsl(35, 90%, 55%)'); // Оранжевый для светлой темы
    }
  }, [theme]);
  return (
    <div className="w-full h-full relative">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { delay: 1.2, duration: 0.3, ease: 'easeIn' },
        }}
      >
        <motion.div
          className="absolute w-[260px] h-[260px] xl:w-[430px] xl:h-[430px] mix-blend-normal dark:mix-blend-lighten"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: 1.3, duration: 0.3, ease: 'easeInOut' },
          }}
        >
          <Image
            src={photo ?? '/placeholder.png'}
            alt="admin photo"
            priority
            quality={100}
            fill
            className="object-contain ml-6 mt-4 mask-gradient"
          />
        </motion.div>
        <motion.svg
          className="w-[300px] h-[300px] xl:w-[470px] xl:h-[470px]"
          fill="transparent"
          viewBox="0 0 506 506"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.circle
            cx="253"
            cy="253"
            r="250"
            stroke={strokeColor}
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ strokeDasharray: '24 10 0 0' }}
            animate={{
              strokeDasharray: ['15 120 25 25', '16 25 92 72', '4 250 22 22'],
              rotate: ['120deg', '360deg'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        </motion.svg>
      </motion.div>
    </div>
  );
};

export default HeroPhoto;
