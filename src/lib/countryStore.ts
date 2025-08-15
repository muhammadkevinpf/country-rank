import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Country, Region, SortBy, Status } from '@/types';

type State = {
  countries: Country[];
  search: string;
  sortBy: SortBy;
  regions: Region[];
  status: Status[];
  setRegions: (regions: Region[]) => void;
  setSortBy: (sortBy: SortBy) => void;
  setCountries: (countries: Country[]) => void;
  setSearch: (search: string) => void;
  setStatus: (status: Status[]) => void;
};

export const useCountryStore = create<State>()(
  devtools((set) => ({
    countries: [],
    search: '',
    sortBy: 'alphabetical',
    regions: [
      { key: 'americas', label: 'Americas', selected: false },
      { key: 'antarctic', label: 'Antarctic', selected: false },
      { key: 'africa', label: 'Africa', selected: false },
      { key: 'asia', label: 'Asia', selected: false },
      { key: 'europe', label: 'Europe', selected: false },
      { key: 'oceania', label: 'Oceania', selected: false },
    ],
    status: [
      { label: 'Member of the United Nations', selected: false },
      { label: 'Independent', selected: false },
    ],
    setRegions: (regions: Region[]) => set({ regions }),
    setSortBy: (sortBy) => set({ sortBy }),
    setCountries: (countries) => set({ countries }),
    setSearch: (search) => set({ search }),
    setStatus: (status: Status[]) => set({ status }),
  }))
);
