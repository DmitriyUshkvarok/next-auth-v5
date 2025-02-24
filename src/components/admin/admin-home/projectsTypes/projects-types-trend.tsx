'use client';

import { ProjectStatsProps } from '@/utils/types';
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export default function ProjectsTypesTrend({
  stats,
}: {
  stats: ProjectStatsProps;
}) {
  // Преобразуем данные под формат Recharts
  const data = stats.websiteTypes.map(({ type, count }) => ({
    name: type,
    projects: Number(count),
  }));

  return (
    <>
      <ResponsiveContainer height={350} width="100%">
        <BarChart
          data={data}
          className="[&_.recharts-tooltip-cursor]:fill-zinc-200 dark:[&_.recharts-tooltip-cursor]:fill-zinc-800"
        >
          <CartesianGrid vertical={false} />
          <XAxis dataKey="name" stroke="#888888" fontSize={12} />
          <YAxis stroke="#888888" fontSize={12} />
          <Tooltip
            separator=": "
            formatter={(value) => [value, 'Projects']}
            labelClassName="font-bold"
            wrapperClassName="!text-sm dark:!bg-black rounded-md dark:!border-border"
          />
          <Legend
            iconType="circle"
            formatter={() => <div className="text-sm">Projects</div>}
          />
          <Bar
            dataKey="projects"
            fill="hsl(var(--chart-1))"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}
