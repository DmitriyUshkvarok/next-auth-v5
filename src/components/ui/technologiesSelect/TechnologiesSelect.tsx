'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import Image from 'next/image';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Technology {
  name: string;
  icon: string;
}

interface TechnologiesSelectProps {
  allTechnologies: Technology[];
}

const TechnologiesSelect = ({ allTechnologies }: TechnologiesSelectProps) => {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const placeholder = '/placeholder.png';

  const uniqueTechnologies = Array.from(
    new Map(allTechnologies.map((tech) => [tech.name, tech])).values()
  );

  const handleSelectChange = useCallback(
    (selectedTech: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (selectedTech === 'all-projects') {
        params.delete('technology');
      } else {
        params.set('technology', selectedTech);
      }

      params.set('page', '1');
      replace(`/admin/all-projects?${params.toString()}`);
    },
    [replace, searchParams]
  );

  return (
    <Select onValueChange={handleSelectChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a Technology" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Technologies</SelectLabel>
          <SelectItem value="all-projects">All Projects</SelectItem>
          {uniqueTechnologies.map((tech) => (
            <SelectItem key={tech.name} value={tech.name}>
              <Image
                src={tech.icon || placeholder}
                alt={tech.name || 'tech icon'}
                width={10}
                height={10}
                className="w-4 h-4 inline-block mr-2"
              />
              {tech.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default TechnologiesSelect;
