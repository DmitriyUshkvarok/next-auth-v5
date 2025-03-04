'use client';
import { usePathname } from 'next/navigation';
import WorkContainer from './work/work-container';

export const DynamicContentPageRender = ({ slug }: { slug: string }) => {
  const pathname = usePathname();
  const currentSlug = slug || pathname.split('/').filter(Boolean).join('/');

  // Функции, возвращающие компоненты в зависимости от slug
  const renderComponent = () => {
    switch (currentSlug) {
      case 'services':
        return <div>services</div>;
      case 'resume':
        return <div>resume</div>;
      case 'work':
        return <WorkContainer />;
      case 'contact':
        return <div>contact</div>;
      default:
        return null;
    }
  };

  return renderComponent();
};
