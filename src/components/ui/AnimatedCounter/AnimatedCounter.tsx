'use client'; // Убедитесь, что компонент работает на клиенте

import { motion, useTransform, useSpring, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface AnimatedCounterProps {
  value: number;
}

export const AnimatedCounter = ({ value }: AnimatedCounterProps) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const spring = useSpring(0, {
    stiffness: 100, // Средняя жесткость
    damping: 50, // Среднее демпфирование
  });

  const displayValue = useTransform(spring, (current) => Math.round(current)); // Округление значения

  useEffect(() => {
    if (inView) {
      spring.set(value); // Запуск анимации до конечного значения
    }
  }, [inView, spring, value]);

  return <motion.span ref={ref}>{displayValue}</motion.span>;
};
