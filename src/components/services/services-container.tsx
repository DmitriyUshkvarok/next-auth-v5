import { getServicesList } from '@/action/servicesAction';
import ServicesList from './services-list';

const ServicesContainer = async () => {
  const result = await getServicesList();
  return (
    <section className="h-screen container mx-auto px-2 pt-4 pb-4">
      <h1 className='mb-2'>Web Development Services</h1>
      <p className="text-xl text-muted-foreground mb-8">
        I create modern, fast, and user-friendly web solutions for any need.
        From landing pages to complex web applications — your project is in good
        hands.
      </p>
      <ServicesList data={result.data ?? []} />
    </section>
  );
};

export default ServicesContainer;
