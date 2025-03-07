import ServicesList from './services-list';

type ServiicesProps = {
  data: {
    count: number;
    title: string;
    description: string;
  }[];
};
const ServicesContainer = async ({ data }: ServiicesProps) => {
  return (
    <section className="h-screen container mx-auto px-2 pt-4 pb-4">
      <h1 className="mb-2">Web Development Services</h1>
      <p className="text-xl text-muted-foreground mb-8">
        I create modern, fast, and user-friendly web solutions for any need.
        From landing pages to complex web applications — your project is in good
        hands.
      </p>
      <ServicesList data={data} />
    </section>
  );
};

export default ServicesContainer;
