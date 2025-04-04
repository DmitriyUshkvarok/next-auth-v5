import WorkContainer from './work/work-container';
import ServicesContainer from './services/services-container';
import ServicesDetalis from './services/services-detalis';
import { getServiceByCount, getServicesList } from '@/action/servicesAction';
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
    const resultDetailList = await getServiceByCount(serviceId);
    const data = resultDetailList.data;
    return <ServicesDetalis data={data} />;
  }

  const renderComponent = () => {
    switch (currentSlug) {
      case 'services':
        return <ServicesContainer data={result.data ?? []} />;
      case 'resume':
        return <ResumeContainer />;
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
