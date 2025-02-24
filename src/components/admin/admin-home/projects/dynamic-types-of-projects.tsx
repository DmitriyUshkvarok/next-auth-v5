'use client';

import { TrendingUp } from 'lucide-react';
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { ProjectStatsProps } from '@/utils/types';

const DynamicTypesOfProjects = ({ stats }: { stats: ProjectStatsProps }) => {
  const chartData = [
    {
      category: 'Commercial',
      commercialProjects: Number(stats.commercial.projects),
    },
    {
      category: 'Non-Commercial',
      nonCommercialProjects: Number(stats.nonCommercial.projects),
    },
  ];

  const chartConfig = {
    commercialProjects: {
      label: 'Commercial',
      color: 'hsl(var(--chart-2))',
    },
    nonCommercialProjects: {
      label: 'Non-Commercial',
      color: 'hsl(var(--chart-3))',
    },
  } satisfies ChartConfig;

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Project Categories Distribution</CardTitle>
        <CardDescription>Distribution of projects by type</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[250px]"
        >
          <RadialBarChart
            data={chartData}
            endAngle={180}
            innerRadius={80}
            outerRadius={130}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {stats.totalProjects.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-muted-foreground"
                        >
                          Projects
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="commercialProjects"
              stackId="a"
              cornerRadius={5}
              fill={chartConfig.commercialProjects.color}
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="nonCommercialProjects"
              stackId="a"
              cornerRadius={5}
              fill={chartConfig.nonCommercialProjects.color}
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing distribution of project types
        </div>
      </CardFooter>
    </Card>
  );
};

export default DynamicTypesOfProjects;
