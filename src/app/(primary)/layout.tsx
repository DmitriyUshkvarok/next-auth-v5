import Header from '@/components/home/header/header';
import { getHomePageNavigation } from '@/action/homePageActions';
import PageTransition from '@/components/ui/PageTransition/PageTransition';
import SrairEffect from '@/components/ui/PageTransition/SrairEffect';
import { headers } from 'next/headers';
import ResumeNavigationContainer from '@/components/resume/resume-container';
import { getResumePageNavigation } from '@/action/resumePageActions';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pageRoutes = await getHomePageNavigation();
  const resumeRoutes = await getResumePageNavigation();
  const getHeaders = await headers();
  const pathname = getHeaders.get('x-invoke-path') || '';

  // Извлекаем относительные пути из resumeRoutes
  const navigationPaths = resumeRoutes?.data?.map((item) => {
    const url = new URL(item.url);
    return url.pathname;
  });

  // Добавляем маршрут '/resume' в массив navigationPaths
  if (navigationPaths && !navigationPaths.includes('/resume')) {
    navigationPaths.push('/resume');
  }

  const isResumePath = pathname.startsWith('/resume');
  console.log('pathname', pathname);
  console.log(navigationPaths); // Проверяем, что массив содержит '/resume'
  console.log(isResumePath); // Проверяем, совпадает ли текущий путь с маршрутом из массива
  return (
    <>
      <Header navigations={pageRoutes.data ?? []} />
      <SrairEffect />
      <PageTransition>
        <main
          className={`container mx-auto ${navigationPaths ? 'flex justify-between px-2' : ''}`}
        >
          <ResumeNavigationContainer />
          <section>{children}</section>
        </main>
      </PageTransition>
    </>
  );
}
