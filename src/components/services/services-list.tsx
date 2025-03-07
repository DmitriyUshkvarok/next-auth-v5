import Link from 'next/link';

type ServiicesProps = {
  data: {
    count: number;
    title: string;
    description: string;
  }[];
};
const ServicesList = ({ data }: ServiicesProps) => {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {data.map((item) => (
        <li key={item.count} className="border-b border-muted pb-4">
          <Link
            href={`/service/${item.count}`}
            className="flex flex-col gap-4 "
          >
            <div className="text-[28px] text-primaryHome sm:text-[34px] xl:text-[50px] leading-[1.1] font-semibold">
              {item.count}
            </div>
            <h2 className="text-[12px] font-semibold sm:text-[18px] xl:text-[24px] leading-5 break-words">
              {item.title}
            </h2>
            <p className="text-muted-foreground">{item.description}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default ServicesList;
