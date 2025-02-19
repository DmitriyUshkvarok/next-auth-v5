import { Skeleton } from '@/components/ui/skeleton';

const TechnologyGraphSkeleton = () => {
  return (
    <div className="w-full h-[350px] flex flex-col gap-2">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="flex items-center gap-2">
          <Skeleton className="w-24 h-4 bg-gray-300" />
          {/* Название технологии */}
          <Skeleton className="flex-1 h-6 bg-gray-400 rounded-lg" />
          {/* Полоска графика */}
        </div>
      ))}
    </div>
  );
};

export default TechnologyGraphSkeleton;
