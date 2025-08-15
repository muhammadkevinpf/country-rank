'use client';
import * as React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { useCountryStore } from '@/lib/countryStore';
import { SortBy } from '@/types';
import { Checkbox } from '../ui/checkbox';

const options = [
  { key: 'alphabetical', label: 'Alphabetical' },
  { key: 'population', label: 'Population' },
  { key: 'area', label: 'Area' },
];

const Form = () => {
  const sortBy = useCountryStore((state) => state.sortBy);
  const setSortBy = useCountryStore((state) => state.setSortBy);
  const regions = useCountryStore((state) => state.regions);
  const setRegions = useCountryStore((state) => state.setRegions);
  const status = useCountryStore((state) => state.status);
  const setStatus = useCountryStore((state) => state.setStatus);

  const handleSortChange = (value: string) => {
    setSortBy(value as SortBy);
  };

  const handleRegionChange = (value: string) => {
    const updatedRegions = regions.map((region) =>
      region.key === value ? { ...region, selected: !region.selected } : region
    );
    setRegions(updatedRegions);
  };

  const handleStatusChange = (value: string) => {
    const updatedStatus = status.map((stat) =>
      stat.label === value ? { ...stat, selected: !stat.selected } : stat
    );
    setStatus(updatedStatus);
  };

  const renderOptions = options.map((option) => (
    <SelectItem key={option.key} value={option.key}>
      {option.label}
    </SelectItem>
  ));

  const renderRegions = regions.map((region) => (
    <Button
      key={region.key}
      onClick={() => handleRegionChange(region.key)}
      className={`${
        region.selected ? 'bg-semi-black' : 'bg-black'
      } cursor-pointer hover:bg-semi-black`}
    >
      {region.label}
    </Button>
  ));

  const renderStatus = status.map((stat) => (
    <div className='flex items-center mb-4' key={stat.label}>
      <Checkbox
        id={stat.label}
        key={stat.label}
        checked={stat.selected}
        onCheckedChange={() => handleStatusChange(stat.label)}
        className='mr-2'
      />
      <Label htmlFor={stat.label}>{stat.label}</Label>
    </div>
  ));
  return (
    <div>
      <div className="mb-8">
        <Label className="text-sm mb-2">Sort by</Label>
        <Select
          defaultValue="alphabetical"
          onValueChange={handleSortChange}
          value={sortBy}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>{renderOptions}</SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="text-sm">Region</Label>
        <div className="flex flex-wrap gap-2">{renderRegions}</div>
      </div>
      <div>
        <Label className="text-sm mt-4 mb-2">Status</Label>
        {renderStatus}
      </div>
    </div>
  );
};

export default Form;
