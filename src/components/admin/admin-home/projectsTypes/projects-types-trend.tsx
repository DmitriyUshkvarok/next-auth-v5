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
  Cell,
} from 'recharts';

export default function ProjectsTypesTrend({
  stats,
}: {
  stats: ProjectStatsProps;
}) {
  // Заранее заданные цвета для категорий
  const colors = [
    '#3b82f6', // Синий
    '#84cc16', // Зеленый
    '#f97316', // Оранжевый
    '#ef4444', // Красный
    '#a855f7', // Фиолетовый
    '#14b8a6', // Бирюзовый
    '#eab308', // Желтый
    '#f43f5e', // Розовый
    '#22c55e', // Светло-зеленый
    '#8b5cf6', // Индиго
  ];

  // Преобразуем данные под формат Recharts
  const data = stats.websiteTypes.map(({ type, count }, index) => ({
    name: type,
    projects: Number(count),
    color: colors[index % colors.length], // Назначаем цвет из массива
  }));

  return (
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
        <Bar dataKey="projects" radius={[4, 4, 0, 0]}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
