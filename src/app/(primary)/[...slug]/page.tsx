import { getHomePageNavigation } from '@/action/homePageActions';
import { DynamicContentPageRender } from '@/components/DynamicContentPageRender';
import { notFound } from 'next/navigation';

export const metadata = {
  dynamic: 'force-static', // 👈 Важно для SSR в dev-режиме
};

export async function generateStaticParams() {
  const response = await getHomePageNavigation();

  if (!response.success || !response.data) {
    return [];
  }

  return response.data.map((route) => ({
    slug: new URL(route.url).pathname.split('/').filter(Boolean), // ✅ Универсальный парсинг URL
  }));
}

const DynamicPage = async ({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) => {
  const { slug } = await params;
  const navSlug = slug?.join('/') || '';

  const response = await getHomePageNavigation();
  const routes =
    response.data?.map((route) => {
      const url = new URL(route.url); // Разбираем URL
      return url.pathname; // Извлекаем только путь (например, "/services")
    }) || [];

  const normalizedNavSlug = `/${navSlug}`; // Добавляем "/" для корректного сравнения

  // Маршруты, которые могут иметь вложенные пути
  const dynamicRoutes = ['/service', '/work'];

  // Проверка на допустимые маршруты:
  const isValidRoute =
    routes.some((route) => normalizedNavSlug.startsWith(route)) ||
    dynamicRoutes.some((route) => normalizedNavSlug.startsWith(route + '/')); // Разрешаем вложенные пути

  if (!isValidRoute) {
    return notFound();
  }

  return <DynamicContentPageRender slug={navSlug} />;
};

export default DynamicPage;
