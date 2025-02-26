'use client';

import { ProjectStatsProps } from '@/utils/types';
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

const COMPLEXITY_COLORS: Record<string, string> = {
  low: '#84cc16',
  medium: '#3b82f6',
  high: '#f97316',
};
export default function ComplexityDistributionChart({
  stats,
}: {
  stats: ProjectStatsProps;
}) {
  const data = stats.publicComplexityStats.complexity.map((item) => ({
    name: item.complexity,
    value: item.count,
    color: COMPLEXITY_COLORS[item.complexity] || '#8884d8',
  }));
  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart className="w-full">
        <Legend
          iconType="circle"
          layout="vertical"
          verticalAlign="middle"
          align="left"
          formatter={(value, entry, index) => (
            <span className="inline-flex items-center gap-2">
              <span className="text-sm font-medium capitalize">{value}</span>
              <span className="text-sm text-gray-500">
                ({data[index].value})
              </span>
            </span>
          )}
        />
        <Tooltip
          labelClassName="font-bold"
          wrapperClassName="dark:[&_.recharts-tooltip-item]:!text-white [&_.recharts-tooltip-item]:!text-black !text-sm dark:!bg-black rounded-md dark:!border-border"
        />
        <Pie data={data} dataKey="value" nameKey="name">
          {data.map((dataItem, i) => (
            <Cell key={i} fill={dataItem.color} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
