import WorkContainer from './work/work-container';
import ServicesContainer from './services/services-container';
import ServicesDetalis from './services/services-detalis';
import { getServicesList } from '@/action/servicesAction';
import { notFound } from 'next/navigation';
import ResumeContainer from './resume/resume-container';

export const DynamicContentPageRender = async ({ slug }: { slug: string }) => {
  const currentSlug = slug.split('/').filter(Boolean).join('/');
  const result = await getServicesList();

  // Проверка для services
  if (currentSlug.startsWith('service/')) {
    const serviceId = currentSlug.split('/')[1];
    const exists = result.data?.some(
      (item) => item.count.toString() === serviceId
    );

    if (!exists) {
      return notFound();
    }

    return <ServicesDetalis serviceId={serviceId} />;
  }

  const renderComponent = () => {
    switch (currentSlug) {
      case 'services':
        return <ServicesContainer data={result.data ?? []} />;
      case 'resume/experience':
        return <div>experience</div>;
      case 'resume':
        return <ResumeContainer />;
      case 'resume/skills':
        return <div>skills</div>;
      case 'resume/about':
        return <div>about</div>;
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
