'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { NavigationProps } from './header';

const Navigation = ({ navigations }: NavigationProps) => {
  const pathname = usePathname();

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
            hover:text-primaryHome ${pathname === '/' ? 'text-primaryHome' : ''}`}
          >
            Home
            {pathname === '/' && (
              <span className="absolute left-0 bottom-[-5px] w-full h-[3px] rounded-sm bg-primaryHome"></span>
            )}
          </Link>
        </motion.li>
        {navigations.map((nav, i) => {
          const path = new URL(nav.url).pathname;
          const isActive = pathname === path;

          return (
            <motion.li
              key={nav.name}
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
                {nav.name}
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
            Account
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
