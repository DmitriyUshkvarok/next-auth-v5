import { ProjectStatsProps } from '@/utils/types';
import ProjectsTypesTrend from './projects-types-trend';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  CodeIcon,
  EyeIcon,
  EyeOffIcon,
  LaptopIcon,
  MonitorIcon,
  PieChartIcon,
  ServerIcon,
} from 'lucide-react';
import ComplexityDistributionChart from './complexity-chart';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { IsPublicChart } from './isPublicChart';
import { DevelopmentTypeChart } from './developmentTypeChart';

const ProjectsTypes = ({ stats }: { stats: ProjectStatsProps }) => {
  const totalPublic =
    stats.publicComplexityStats.isPublic.find((item) => item.isPublic)?.count ||
    0;
  const totalPrivate =
    stats.publicComplexityStats.isPublic.find((item) => !item.isPublic)
      ?.count || 0;

  const frontendTotal =
    stats.developmentTypes.find((item) => item.developmentType === 'frontend')
      ?.count || 0;
  const backendTotal =
    stats.developmentTypes.find((item) => item.developmentType === 'backend')
      ?.count || 0;
  const fullstackTotal =
    stats.developmentTypes.find((item) => item.developmentType === 'fullstack')
      ?.count || 0;

  return (
    <>
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Первая карточка: Обзор проектов */}
        <Card className="p-4 space-y-4">
          <CardHeader className="pb-4 border-b">
            <CardTitle className="text-lg font-semibold">
              Projects Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Visibility */}
            <Card className="p-4">
              <CardTitle className="mb-4">Projects Visibility</CardTitle>
              <CardContent className="flex flex-col gap-2 p-0">
                <div className="flex items-center gap-2 bg-green-100 dark:bg-green-900 p-3 rounded-lg">
                  <EyeIcon className="text-green-600 dark:text-green-400" />
                  <span className="text-lg">Public:</span>
                  <span className="text-3xl font-bold">{totalPublic}</span>
                </div>
                <div className="flex items-center gap-2 bg-red-100 dark:bg-red-900 p-3 rounded-lg">
                  <EyeOffIcon className="text-red-600 dark:text-red-400 w-6 h-6" />
                  <span className="text-lg">Private:</span>
                  <span className="text-3xl font-bold">{totalPrivate}</span>
                </div>
              </CardContent>
            </Card>

            {/* Development Types */}
            <Card className="p-4">
              <CardTitle className="mb-4">Development Types</CardTitle>
              <CardContent className="flex flex-col gap-2 p-0">
                <div className="flex justify-between items-center gap-2 bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
                  <MonitorIcon className="text-blue-600 dark:text-blue-400 w-6 h-6" />
                  <span className="text-sm font-medium">Front-End</span>
                  <span className="text-3xl font-bold">{frontendTotal}</span>
                </div>
                <div className="flex justify-between items-center gap-2 bg-yellow-100 dark:bg-yellow-900 p-3 rounded-lg">
                  <ServerIcon className="text-yellow-600 dark:text-yellow-400 w-6 h-6" />
                  <span className="text-sm font-medium">Back-End</span>
                  <span className="text-3xl font-bold">{backendTotal}</span>
                </div>
                <div className="flex justify-between items-center gap-2 bg-purple-100 dark:bg-purple-900 p-3 rounded-lg">
                  <CodeIcon className="text-purple-600 dark:text-purple-400 w-6 h-6" />
                  <span className="text-sm font-medium">Full-Stack</span>
                  <span className="text-3xl font-bold">{fullstackTotal}</span>
                </div>
              </CardContent>
            </Card>

            {/* Button */}
            <div className="text-center">
              <Button size="sm" asChild>
                <Link href="/admin/all-projects">View all projects</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Вторая карточка: Графики */}
        <Card className="p-4 space-y-4">
          <CardHeader className="pb-4 border-b">
            <CardTitle className="text-lg font-semibold">
              <span>Projects Visibility Distribution</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Card className="p-4">
              <CardTitle className="mb-4 text-center">
                Projects Visibility
              </CardTitle>
              <CardContent className="p-0">
                <IsPublicChart
                  totalPublic={totalPublic}
                  totalPrivate={totalPrivate}
                />
              </CardContent>
            </Card>
            <Card className="p-4">
              <CardTitle className="mb-4 text-center">
                Development Types
              </CardTitle>
              <CardContent className="p-0">
                <DevelopmentTypeChart
                  frontendTotal={frontendTotal}
                  backendTotal={backendTotal}
                  fullstackTotal={fullstackTotal}
                />
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
      {/* Третья карточка: График сложности */}
      <Card className="p-4 space-y-4 my-4">
        <CardHeader className="pb-4 border-b">
          <CardTitle className="text-lg font-semibold flex justify-between items-center">
            <span>Complexity Distribution</span>
            <PieChartIcon />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ComplexityDistributionChart stats={stats} />
        </CardContent>
      </Card>

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
