'use client';

import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { NavigationProps } from './header';
import { Locale } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
const Navigation = ({ navigations }: NavigationProps) => {
  const pathname = usePathname();
  const params = useParams();
  const locale = params.locale as Locale;
  const t = useTranslations('Navigation');
  const isHomeActive = pathname === `/${locale}` || pathname === `/${locale}/`;

  // Варианты анимации для каждого элемента
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5 }, // Задержка для каждого элемента
    }),
  };

  return (
    <nav>
      <ul className="flex items-center gap-4">
        <motion.li
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          custom={0} // Первый элемент
        >
          <Link
            href="/"
            className={`relative font-body font-medium text-lg transition-colors duration-300 capitalize 
      hover:text-primaryHome ${isHomeActive ? 'text-primaryHome' : ''}`}
          >
            {t('home')}
            {isHomeActive && (
              <span className="absolute left-0 bottom-[-5px] w-full h-[3px] rounded-sm bg-primaryHome"></span>
            )}
          </Link>
        </motion.li>
        {navigations.map((nav, i) => {
          // const cleanPathname = pathname.replace(`/${locale}`, '') || '/';
          // const path = new URL(nav.url).pathname.replace(`/${locale}`, '');
          const cleanPathname = pathname.startsWith(`/${locale}`)
            ? pathname
            : `/${locale}${pathname}`;
          const path = nav.url.startsWith(`/${locale}`)
            ? new URL(nav.url).pathname
            : `/${locale}${new URL(nav.url).pathname}`;
          const isActive =
            cleanPathname === path || // Точное совпадение
            (path === '/services' && /^\/service\/\d+$/.test(cleanPathname));

          return (
            <motion.li
              key={nav.name.en}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              custom={i} // Передаем индекс для задержки
            >
              <Link
                href={path}
                className={`relative font-body font-medium text-lg transition-colors duration-300 capitalize 
        hover:text-primaryHome ${isActive ? 'text-primaryHome' : ''}`}
              >
                {nav.name[locale]}
                {isActive && (
                  <span className="absolute left-0 bottom-[-5px] w-full h-[3px] rounded-sm bg-primaryHome"></span>
                )}
              </Link>
            </motion.li>
          );
        })}
        <motion.li
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          custom={navigations.length} // Задержка для последнего элемента
        >
          <Link
            href="/my-account"
            className={`relative font-body font-medium text-lg transition-colors duration-300 capitalize 
                hover:text-primaryHome ${pathname === '/my-account' ? 'text-primaryHome' : ''}`}
          >
            {t('account')}
            {pathname === '/my-account' && (
              <span className="absolute left-0 bottom-[-5px] w-full h-[3px] rounded-sm bg-primaryHome"></span>
            )}
          </Link>
        </motion.li>
      </ul>
    </nav>
  );
};

export default Navigation;
