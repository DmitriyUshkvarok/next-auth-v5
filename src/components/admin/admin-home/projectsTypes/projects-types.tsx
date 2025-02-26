import { ProjectStatsProps } from '@/utils/types';
import ProjectsTypesTrend from './projects-types-trend';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  EyeIcon,
  EyeOffIcon,
  LaptopIcon,
  PieChartIcon,
  StarIcon,
} from 'lucide-react';
import ComplexityDistributionChart from './complexity-chart';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const ProjectsTypes = ({ stats }: { stats: ProjectStatsProps }) => {
  console.log(stats);
  const totalPublic =
    stats.publicComplexityStats.isPublic.find((item) => item.isPublic)?.count ||
    0;
  const totalPrivate =
    stats.publicComplexityStats.isPublic.find((item) => !item.isPublic)
      ?.count || 0;
  return (
    <>
      <div className="grid lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Projects Visibility</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <EyeIcon className="text-green-500" />
                <span className="text-lg">Public:</span>
                <span className="text-4xl font-bold">{totalPublic}</span>
              </div>
              <div className="flex items-center gap-2">
                <EyeOffIcon className="text-red-500" />
                <span className="text-lg">Private:</span>
                <span className="text-4xl font-bold">{totalPrivate}</span>
              </div>
            </div>
            <div className="mt-2">
              <Button size="sm" asChild>
                <Link href="/admin/all-projects">View all</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex justify-between items-center">
              <span>Team leaders</span>
              <StarIcon className="text-yellow-500" />
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2"></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex justify-between items-center">
              <span>Complexity distribution</span>
              <PieChartIcon />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ComplexityDistributionChart stats={stats} />
          </CardContent>
        </Card>
      </div>
      <Card className="my-4">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <LaptopIcon />
            <span>Project Type Trends</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pl-0">
          <ProjectsTypesTrend stats={stats} />
        </CardContent>
      </Card>
    </>
  );
};

export default ProjectsTypes;
