'use client';
import Link from 'next/link';
import { usePathname, notFound } from 'next/navigation';
import { Button } from '../ui/button';
import ResumeNavigationTextInfo from './resume-navigation-text-info';

interface NavigationItem {
  name: string;
  url: string;
}

type SidebarTextDataProps = {
  title: string;
  description: string;
};

const ResumeNavigation = ({
  data,
  dataText,
}: {
  data: NavigationItem[];
  dataText: SidebarTextDataProps;
}) => {
  const pathname = usePathname();
  const isResumePage = pathname ? /^\/resume(\/.*)?$/.test(pathname) : false;

  if (!isResumePage) {
    return null;
  }

  // Проверяем, существует ли текущий путь в массиве данных
  const currentPath = pathname;

  // Разрешаем корневой путь /resume
  const isRootPath = currentPath === '/resume';

  // Проверяем, существует ли маршрут в массиве данных
  const routeExists =
    isRootPath ||
    data.some((item) => {
      const itemPath = new URL(item.url).pathname;
      return itemPath === currentPath;
    });

  // Если маршрут не существует, возвращаем "Not Found"
  if (!routeExists) {
    return notFound();
  }
  return (
    <div className="flex flex-col gap-6">
      <ResumeNavigationTextInfo dataText={dataText} />
      <nav>
        <ul className="flex flex-col gap-4">
          {data.map((item) => {
            const path = new URL(item.url).pathname; // Получаем только относительный путь
            const isActive = currentPath === path;
            return (
              <li key={path}>
                <Button
                  asChild
                  variant="outline"
                  className={`w-full max-w-[500px] h-[40px] rounded-sm ${
                    isActive ? 'bg-primaryHome' : 'bg-transparent'
                  }`}
                >
                  <Link href={path}>{item.name}</Link>
                </Button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default ResumeNavigation;
