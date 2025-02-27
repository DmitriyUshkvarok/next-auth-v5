'use client';

import { Pie, PieChart } from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

export function DevelopmentTypeChart({
  frontendTotal,
  backendTotal,
  fullstackTotal,
}: {
  frontendTotal: number;
  backendTotal: number;
  fullstackTotal: number;
}) {
  const chartData = [
    {
      developmentType: 'Front-End',
      count: frontendTotal,
      fill: 'hsl(210, 100%, 60%)',
    },
    {
      developmentType: 'Back-End',
      count: backendTotal,
      fill: 'hsl(50, 100%, 60%)',
    },
    {
      developmentType: 'Full-Stack',
      count: fullstackTotal,
      fill: 'hsl(275, 100%, 60%)',
    },
  ];

  const chartConfig = {
    frontend: {
      label: 'Front-End',
      color: 'hsl(var(--chart-1))',
    },
    backend: {
      label: 'Back-End',
      color: 'hsl(var(--chart-2))',
    },
    fullstack: {
      label: 'Full-Stack',
      color: 'hsl(var(--chart-3))',
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
    >
      <PieChart>
        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
        <Pie data={chartData} dataKey="count" label nameKey="developmentType" />
      </PieChart>
    </ChartContainer>
  );
}
