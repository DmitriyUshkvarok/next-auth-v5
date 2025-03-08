import { getServiceByCount } from '@/action/servicesAction';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '../ui/card';
import BackButton from '../ui/BackButton/BackButton';

const ServicesDetails = async ({ serviceId }: { serviceId: string }) => {
  const result = await getServiceByCount(serviceId);
  const data = result.data;

  return (
    <section className="p-4">
      <Card className="border border-primaryHome p-4 rounded-lg shadow-md">
        <CardHeader className="p-2 border-b-[1px] border-b-gray-700">
          <div className="flex justify-between items-center">
            <CardTitle className="text-3xl font-bold text-primaryHome mb-2 uppercase">
              {data?.title}
            </CardTitle>
            <BackButton />
          </div>
        </CardHeader>

        <CardContent>
          <div className="rounded-lg mt-6">
            <h2 className="text-xl font-semibold text-primaryHome">
              Additional Information
            </h2>
            <CardDescription className="text-lg">
              {data?.description}
            </CardDescription>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default ServicesDetails;
