import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';

const NoDataFound = ({ message }: { message: string }) => {
  return (
    <Card className="max-w-md mx-auto mt-10 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-center">
          No Data Found
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center text-gray-600">
        <p>{message}</p>
      </CardContent>
    </Card>
  );
};

export default NoDataFound;
