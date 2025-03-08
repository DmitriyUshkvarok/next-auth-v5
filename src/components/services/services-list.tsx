import Link from 'next/link';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../ui/card';

type ServiicesProps = {
  data: {
    count: number;
    title: string;
    description: string;
  }[];
};
const ServicesList = ({ data }: ServiicesProps) => {
  const truncateText = (text: string, maxLength = 200) => {
    return text.length > maxLength
      ? text.slice(0, maxLength).trimEnd() + '...'
      : text;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {data.map((item) => (
        <Card
          key={item.count}
          className="border border-primaryHome p-4 rounded-lg transition-transform duration-300 hover:scale-[1.01]"
        >
          <Link
            href={`/service/${item.count}`}
            className="flex flex-col gap-4 "
          >
            <CardHeader className="text-[28px] text-primaryHome sm:text-[34px] xl:text-[60px] leading-[1.1] font-semibold">
              <div className="mb-2 sm:mb-4"> {item.count}</div>
              <CardTitle className="uppercase text-[12px] font-semibold sm:text-[18px] xl:text-[24px] leading-5 break-words">
                {item.title}
              </CardTitle>
            </CardHeader>

            <CardContent>
              <CardDescription>
                {truncateText(item.description)}
              </CardDescription>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                Last Updated: {new Date().toLocaleDateString()}
              </span>
              <span className="text-primaryHome text-sm font-medium hover:underline cursor-pointer">
                Learn More
              </span>
            </CardFooter>
          </Link>
        </Card>
      ))}
    </div>
  );
};

export default ServicesList;
