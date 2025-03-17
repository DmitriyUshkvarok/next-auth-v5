import ServicesList from './services-list';
import { getTranslations } from 'next-intl/server';

type ServiicesProps = {
  data: {
    count: number;
    title: { en: string; ru: string; uk: string };
    description: { en: string; ru: string; uk: string };
  }[];
};
const ServicesContainer = async ({ data }: ServiicesProps) => {
  const t = await getTranslations('Services');
  return (
    <section className="container mx-auto px-2 pt-4 pb-14">
      <h1 className="mb-2 text-[28px] sm:text-[36px] text-center">
        {t('title')}
      </h1>
      <p className="text-[20px] sm:text-[26px] text-center text-muted-foreground mb-8">
        {t('description')}
      </p>
      <ServicesList data={data} />
    </section>
  );
};

export default ServicesContainer;
