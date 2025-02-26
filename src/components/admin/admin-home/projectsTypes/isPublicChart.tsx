'use client';

import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from 'recharts';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';

export function IsPublicChart({
  totalPublic,
  totalPrivate,
}: {
  totalPublic: number;
  totalPrivate: number;
}) {
  const totalProjects = totalPublic + totalPrivate;

  // Данные для графика
  const chartData = [
    { name: 'Public', value: totalPublic, fill: 'hsl(var(--chart-1))' },
    { name: 'Private', value: totalPrivate, fill: 'hsl(var(--chart-2))' },
  ];

  const chartConfig = {
    public: { label: 'Public', color: 'hsl(var(--chart-1))' },
    private: { label: 'Private', color: 'hsl(var(--chart-2))' },
  } satisfies ChartConfig;

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square w max-h-[250px]"
    >
      <RadialBarChart
        data={chartData}
        startAngle={90}
        endAngle={-270}
        innerRadius={80}
        outerRadius={110}
      >
        <PolarGrid radialLines={false} stroke="none" />
        <RadialBar dataKey="value" background cornerRadius={10} />
        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
          <Label
            content={({ viewBox }) => {
              if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-foreground text-4xl font-bold"
                    >
                      {totalProjects}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-muted-foreground text-sm"
                    >
                      Projects
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </PolarRadiusAxis>
      </RadialBarChart>
    </ChartContainer>
  );
}
