'use client';
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
  TrendingUp,
} from 'lucide-react';

import Link from 'next/link';
import { DevelopmentStats, ProjectStatsProps } from '@/utils/types';
import DynamicTypesOfProjects from '@/components/admin/admin-home/projects/dynamic-types-of-projects';
import DevelopmentTypeChartYear from './developmen-type-chart-year';
import SelectDevelopmentTypeChartYear from '@/components/ui/selectDevelopmentTypeChartYear/selectDevelopmentTypeChartYear';
import { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
export default function ProjectsStats({
  stats,
  data,
  yearsAndMonths,
  selectedYear,
}: {
  stats: ProjectStatsProps;
  data: DevelopmentStats[];
  yearsAndMonths: { year: number; months: number[] }[];
  selectedYear: string;
}) {
  const [currency, setCurrency] = useState<'USD' | 'UAH' | 'EUR'>('USD');
  const [rates, setRates] = useState<{ UAH: number; EUR: number }>({
    UAH: 1,
    EUR: 1,
  });

  useEffect(() => {
    const fetchRates = async () => {
      const usdToUah = await fetch(
        'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=USD&json'
      )
        .then((res) => res.json())
        .then((data) => data[0]?.rate || 1);

      const usdToEur = await fetch(
        'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=EUR&json'
      )
        .then((res) => res.json())
        .then((data) => data[0]?.rate || 1);

      setRates({ UAH: usdToUah, EUR: usdToEur });
    };

    fetchRates();
  }, []);

  const convert = (amount: number) => {
    if (currency === 'USD') return `$${amount}`;
    if (currency === 'UAH') return `₴${(amount * rates.UAH).toFixed(2)}`;
    if (currency === 'EUR')
      return `€${(amount * (1 / rates.EUR) * rates.UAH).toFixed(2)}`;
  };
  return (
    <>
      <div className="flex justify-end mb-4">
        <Select
          onValueChange={(value: string) =>
            setCurrency(value as 'USD' | 'UAH' | 'EUR')
          }
          value={currency}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={`Select Currency (${currency})`} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="USD">USD</SelectItem>
            <SelectItem value="UAH">UAH</SelectItem>
            <SelectItem value="EUR">EUR</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid lg:grid-cols-4 gap-4">
        <Card className="flex flex-col">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Total Projects</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <FolderArchive />
              <div className="text-5xl font-bold">{stats.totalProjects}</div>
            </div>
          </CardContent>
          <CardFooter className="mt-auto">
            <Button size="sm" asChild>
              <Link href="/admin/all-projects">View all</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Общая сумма бюджета */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Total Budget</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-2 items-center">
            <div className="text-2xl font-bold">
              {convert(stats.totalBudget)}
            </div>
          </CardContent>
        </Card>

        {/* Коммерческие проекты */}
        <Card className="flex flex-col">
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
              {convert(stats.commercial.budget)}
            </span>
          </CardContent>
          <CardFooter className="text-xs text-green-500 flex gap-1 items-center mt-auto">
            <BadgeCheckIcon />
            High-value clients
          </CardFooter>
        </Card>

        {/* Некоммерческие проекты */}
        <Card className="flex flex-col">
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
              {convert(stats.nonCommercial.budget)}
            </span>
          </CardContent>
          <CardFooter className="text-xs text-blue-500 flex gap-1 items-center mt-auto">
            Supporting social initiatives
          </CardFooter>
        </Card>
      </div>
      <Card className="my-4">
        <CardHeader>
          <CardTitle className="text-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp />
              <span>Project Development Trends (Yearly Overview)</span>
            </div>
            <div>
              <SelectDevelopmentTypeChartYear
                yearsAndMonths={yearsAndMonths}
                selectedYear={selectedYear}
              />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DevelopmentTypeChartYear data={data} />
        </CardContent>
      </Card>
      <Card className="my-4">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <LaptopIcon />
            <span>Trend of completed projects</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DynamicTypesOfProjects stats={stats} />
        </CardContent>
      </Card>
    </>
  );
}
