import { getServiceByCount } from '@/action/servicesAction';

const ServicesDetalis = async ({ serviceId }: { serviceId: string }) => {
  const result = await getServiceByCount(serviceId);
  const data = result.data;

  return (
    <section>
      <h1>{data?.title}</h1>
      <p>{data?.description}</p>
    </section>
  );
};

export default ServicesDetalis;
