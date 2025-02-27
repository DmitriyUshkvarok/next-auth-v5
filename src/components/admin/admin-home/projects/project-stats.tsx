import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  BadgeCheckIcon,
  LaptopIcon,
  FolderArchive,
  Handshake,
  Briefcase,
  DollarSign,
} from 'lucide-react';

import Link from 'next/link';
import { DevelopmentStats, ProjectStatsProps } from '@/utils/types';
import DynamicTypesOfProjects from '@/components/admin/admin-home/projects/dynamic-types-of-projects';
import DevelopmentTypeChartYear from './developmen-type-chart-year';

export default function ProjectsStats({
  stats,
  data,
}: {
  stats: ProjectStatsProps;
  data: DevelopmentStats[];
}) {
  return (
    <>
      <div className="grid lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Total Projects</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <FolderArchive />
              <div className="text-5xl font-bold">{stats.totalProjects}</div>
            </div>
            <Button size="sm" asChild>
              <Link href="/admin/all-projects">View all</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Общая сумма бюджета */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Total Budget</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-2 items-center">
            <DollarSign />
            <div className="text-5xl font-bold">${stats.totalBudget}</div>
          </CardContent>
        </Card>

        {/* Коммерческие проекты */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Commercial Projects</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Briefcase />
              <div className="text-5xl font-bold">
                {stats.commercial.projects}
              </div>
            </div>
            <span className="text-xs text-muted-foreground">
              ${stats.commercial.budget}
            </span>
          </CardContent>
          <CardFooter className="text-xs text-green-500 flex gap-1 items-center">
            <BadgeCheckIcon />
            High-value clients
          </CardFooter>
        </Card>

        {/* Некоммерческие проекты */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Non-Commercial Projects</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Handshake />
              <div className="text-5xl font-bold">
                {stats.nonCommercial.projects}
              </div>
            </div>
            <span className="text-xs text-muted-foreground">
              ${stats.nonCommercial.budget}
            </span>
          </CardContent>
          <CardFooter className="text-xs text-blue-500 flex gap-1 items-center">
            Supporting social initiatives
          </CardFooter>
        </Card>
      </div>
      <Card className="my-4">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <LaptopIcon />
            <span>Trend of completed projects</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DevelopmentTypeChartYear data={data} />
          <DynamicTypesOfProjects stats={stats} />
        </CardContent>
      </Card>
    </>
  );
}
