import WorkContainer from './work/work-container';
import ServicesContainer from './services/services-container';

export const DynamicContentPageRender = ({ slug }: { slug: string }) => {
  const currentSlug = slug.split('/').filter(Boolean).join('/');

  // Функции, возвращающие компоненты в зависимости от slug
  const renderComponent = () => {
    switch (currentSlug) {
      case 'services':
        return <ServicesContainer />;
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
