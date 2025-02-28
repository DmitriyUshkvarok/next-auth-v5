'use client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SelectGroup, SelectLabel } from '@radix-ui/react-select';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

const SelectDevelopmentTypeChartYear = ({
  yearsAndMonths,
  selectedYear,
}: {
  yearsAndMonths: { year: number; months: number[] }[];
  selectedYear: string;
}) => {
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  const handleYearChange = useCallback(
    (year: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (year === 'all-years') {
        params.delete('year');
      } else {
        params.set('year', year);
      }

      replace(`/admin/?${params.toString()}`);
    },
    [replace, searchParams]
  );
  return (
    <>
      <Select onValueChange={handleYearChange} value={selectedYear}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a Year" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Years</SelectLabel>
            {yearsAndMonths?.map(({ year }) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
};

export default SelectDevelopmentTypeChartYear;
