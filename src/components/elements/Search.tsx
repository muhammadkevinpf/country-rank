"use client"
import React from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { Input } from '../ui/input';
import { useCountryStore } from '@/lib/countryStore';

const Search = () => {
  const setSearch = useCountryStore((state) => state.setSearch);
  const search = useCountryStore((state) => state.search);
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <>
      <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" />
      <Input
        type="text"
        placeholder="Search by Name, Region, Subregion"
        className="pl-9 text-sm"
        value={search}
        onChange={handleSearchChange}
      />
    </>
  );
};

export default Search;
