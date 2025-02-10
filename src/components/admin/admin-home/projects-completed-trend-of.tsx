'use client';
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

const data = [
  {
    name: 'Jan',
    completed: 10,
    inProgress: 5,
  },
  {
    name: 'Feb',
    completed: 12,
    inProgress: 4,
  },
  {
    name: 'Mar',
    completed: 8,
    inProgress: 6,
  },
  {
    name: 'Apr',
    completed: 15,
    inProgress: 3,
  },
  {
    name: 'May',
    completed: 14,
    inProgress: 5,
  },
  {
    name: 'Jun',
    completed: 16,
    inProgress: 2,
  },
  {
    name: 'Jul',
    completed: 18,
    inProgress: 3,
  },
  {
    name: 'Aug',
    completed: 20,
    inProgress: 2,
  },
  {
    name: 'Sep',
    completed: 22,
    inProgress: 1,
  },
  {
    name: 'Oct',
    completed: 19,
    inProgress: 4,
  },
  {
    name: 'Nov',
    completed: 17,
    inProgress: 5,
  },
  {
    name: 'Dec',
    completed: 21,
    inProgress: 3,
  },
];

export default function ProjectsCompletedTrends() {
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
          formatter={(value, name) => {
            if (name === 'inProgress') {
              return [value, 'In Progress'];
            } else if (name === 'completed') {
              return [value, 'Completed'];
            }
          }}
          labelClassName="font-bold"
          wrapperClassName="!text-sm dark:!bg-black rounded-md dark:!border-border"
        />
        <Legend
          iconType="circle"
          formatter={(value) => {
            if (value === 'inProgress') {
              return <div className="text-sm">In Progress</div>;
            } else if (value === 'completed') {
              return <div className="text-sm">Completed</div>;
            }
          }}
        />
        <Bar dataKey="completed" stackId={1} fill="#10b981" />
        <Bar
          dataKey="inProgress"
          stackId={1}
          fill="#facc15"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
