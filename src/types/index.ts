type Country = {
  region: string;
  subregion: string;
  area: number;
  flag: string;
  population: number;
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
  name: {
    common: string;
    official: string;
    nativeName: {
      [key: string]: {
        official: string;
        common: string;
      };
    };
  };
  unMember: boolean;
  borders: string[];
  languages: {
    [key: string]: string;
  };
};

type Region = {
  label: 'Americas' | 'Antarctic' | 'Africa' | 'Asia' | 'Europe' | 'Oceania';
  selected: boolean;
  key: string;
};

type SortBy = 'alphabetical' | 'population' | 'area';

type CountryTableColumn = {
  flag: string;
  name: string;
  population: number;
  area: number;
  region: string;
};

type Status = {
  label: 'Member of the United Nations' | 'Independent';
  selected: boolean;
};

export type { Country, Region, SortBy, CountryTableColumn, Status };
