'use client';

import { Input } from '../input';
import { useSearchParams, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

const NavSearch = () => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const [search, setSearch] = useState(
    searchParams.get('search')?.toString() || ''
  );

  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set('search', value);
    } else {
      params.delete('search');
    }
    replace(`/admin/all-projects?${params.toString()}`);
  }, 300);

  useEffect(() => {
    if (!searchParams.get('search')) {
      setSearch('');
    }
  }, [searchParams]);

  return (
    <div className="relative">
      <Input
        type="search"
        placeholder="Search project"
        className="max-w-xs dark:bg-muted pl-10"
        onChange={(e) => {
          setSearch(e.target.value);
          handleSearch(e.target.value);
        }}
        value={search}
      />
      <Search
        className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500"
        size={18}
      />
    </div>
  );
};

export default NavSearch;
