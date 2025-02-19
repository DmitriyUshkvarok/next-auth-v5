'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { TechnologiesSelectProps } from '@/components/ui/technologiesSelect/TechnologiesSelect';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

const predefinedColors = [
  'hsl(210, 90%, 50%)',
  'hsl(0, 85%, 55%)',
  'hsl(48, 90%, 60%)',
  'hsl(120, 75%, 50%)',
  'hsl(333, 71%, 51%)',
];

const TechnologyDenamicGrapic = ({
  allTechnologies,
}: TechnologiesSelectProps) => {
  // Подсчет количества проектов для каждой технологии
  const technologyCounts = allTechnologies.reduce<Record<string, number>>(
    (acc, tech) => {
      const normalizedTech = tech.name.toLowerCase(); // Нормализуем регистр
      acc[normalizedTech] = (acc[normalizedTech] || 0) + 1;
      return acc;
    },
    {}
  );

  const chartData = Object.entries(technologyCounts).map(
    ([tech, count], index) => ({
      role: tech,
      count,
      fill: predefinedColors[index % predefinedColors.length],
    })
  );

  const chartConfig = {
    label: {
      color: 'hsl(var(--background))',
    },
  } satisfies ChartConfig;

  return (
    <Card className="my-4">
      <CardHeader>
        <CardTitle>Technology Usage Distribution</CardTitle>
        <CardDescription>
          Overview of the most frequently used technologies in projects
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer height={350} width="100%">
          <ChartContainer config={chartConfig}>
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{
                right: 16,
              }}
            >
              <CartesianGrid horizontal={false} vertical={false} />
              <YAxis
                dataKey="role"
                type="category"
                tickLine={false}
                axisLine={false}
                tick={{
                  fill: 'hsl(0, 0%, 40%)',
                  fontSize: 11,
                }}
                tickFormatter={(value) =>
                  value.charAt(0).toUpperCase() + value.slice(1)
                }
              />
              <XAxis
                type="number"
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
                tick={{
                  fill: 'hsl(0, 0%, 40%)',
                  fontSize: 12,
                }}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Bar
                dataKey="count"
                layout="vertical"
                radius={4}
                isAnimationActive={true}
              >
                {chartData.map((entry, index) => (
                  <LabelList
                    key={`label-${index}`}
                    dataKey="role"
                    position="insideLeft"
                    offset={8}
                    className="fill-[#ffffff19] capitalize"
                    fontSize={12}
                  />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
        </ResponsiveContainer>
      </CardContent>
      <CardFooter className="flex-col items-center gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Technology adoption increased by 4.2% this quarter{' '}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Displaying the number of projects per technology
        </div>
      </CardFooter>
    </Card>
  );
};

export default TechnologyDenamicGrapic;
