'use client';
import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/ui/menubar';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

// Массив с названиями месяцев
const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

interface YearAndMonth {
  year: number;
  months: number[];
}

interface YearAndMonthSelectProps {
  yearsAndMonthsData: YearAndMonth[];
}

const YearAndMonthSelect = ({
  yearsAndMonthsData,
}: YearAndMonthSelectProps) => {
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  const handleYearChange = useCallback(
    (year: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (year === 'all-years') {
        params.delete('year');
        params.delete('month');
      } else {
        params.set('year', year);
      }
      replace(`/admin/all-projects?${params.toString()}`);
    },
    [replace, searchParams]
  );

  const handleMonthChange = useCallback(
    (month: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (month === 'all-months') {
        params.delete('month');
      } else {
        params.set('month', month);
      }
      replace(`/admin/all-projects?${params.toString()}`);
    },
    [replace, searchParams]
  );

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger className="cursor-pointer">Year</MenubarTrigger>
        <MenubarContent>
          <Select onValueChange={handleYearChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Years</SelectLabel>
                <SelectItem value="all-years">All Years</SelectItem>
                {yearsAndMonthsData?.map(({ year }) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger className="cursor-pointer">Month</MenubarTrigger>
        <MenubarContent>
          <Select onValueChange={handleMonthChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a Month" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Months</SelectLabel>
                <SelectItem value="all-months">All Months</SelectItem>
                {yearsAndMonthsData?.map(({ months }) =>
                  months?.map((monthNumber) => (
                    <SelectItem
                      key={monthNumber}
                      value={monthNumber.toString()}
                    >
                      {monthNames[monthNumber - 1]}
                      {/* Преобразуем номер месяца в название */}
                    </SelectItem>
                  ))
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default YearAndMonthSelect;
