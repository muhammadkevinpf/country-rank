'use client';
import React, { useEffect, useMemo } from 'react';
import {
  Table as TableComponent,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { convertToSlug, formatNumberWithCommas } from '@/lib/utils';
import { Country, CountryTableColumn, Region } from '@/types';
import { useCountryStore } from '@/lib/countryStore';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Button } from '../ui/button';

const columns: ColumnDef<CountryTableColumn>[] = [
  {
    accessorKey: 'flag',
    header: 'Flag',
    cell: ({ getValue }) => (
      <Image
        src={getValue() as string}
        alt="Country Flag"
        width={75}
        height={50}
        className="w-[50px] h-[25px] md:w-[75px] md:h-[50px] object-cover"
      />
    ),
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'population',
    header: 'Population',
    cell: ({ getValue }) => formatNumberWithCommas(getValue() as number),
  },
  {
    accessorKey: 'area',
    header: 'Area (km²)',
    cell: ({ getValue }) => formatNumberWithCommas(getValue() as number),
  },
  { accessorKey: 'region', header: 'Region' },
];

const Table = ({ resCountry }: { resCountry: Country[] }) => {
  const setCountries = useCountryStore((state) => state.setCountries);
  const search = useCountryStore((state) => state.search);
  const regions = useCountryStore((state) => state.regions);
  const sortBy = useCountryStore((state) => state.sortBy);
  const countries = useCountryStore((state) => state.countries);
  const status = useCountryStore((state) => state.status);
  const router = useRouter();

  useEffect(() => {
    if (resCountry && resCountry.length > 0) {
      setCountries(resCountry);
    }
  }, [resCountry, setCountries]);

  // Get selected region labels
  const selectedRegions = useMemo(
    () => regions.filter((r) => r.selected).map((r) => r.label),
    [regions]
  );

  // filter selected Status
  const selectedStatus = useMemo(
    () => status.filter((s) => s.selected).map((s) => s.label),
    [status]
  );

  // Filter and sort countries
  const filteredCountries = useMemo(() => {
    let filtered = countries.filter((country) => {
      // Region filter
      const regionMatch =
        selectedRegions.length === 0 ||
        selectedRegions.includes(country.region as Region['label']);

      const filterStatus =
        selectedStatus.length === 0 ||
        (selectedStatus.includes('Member of the United Nations') &&
          country.unMember) ||
        (selectedStatus.includes('Independent') && !country.unMember);

      // Search filter (name or region)
      const searchLower = search.toLowerCase();
      const nameMatch = country.name.common.toLowerCase().includes(searchLower);
      const regionSearchMatch = country.region
        .toLowerCase()
        .includes(searchLower);
      const subRegionSearchMatch = country.subregion
        .toLowerCase()
        .includes(searchLower);

      return (
        regionMatch &&
        filterStatus &&
        (nameMatch ||
          regionSearchMatch ||
          subRegionSearchMatch ||
          search === '')
      );
    });

    // Sort
    if (sortBy === 'alphabetical') {
      filtered = filtered.sort((a, b) =>
        a.name.common.localeCompare(b.name.common)
      );
    } else if (sortBy === 'population') {
      filtered = filtered.sort((a, b) => b.population - a.population);
    } else if (sortBy === 'area') {
      filtered = filtered.sort((a, b) => b.area - a.area);
    }

    return filtered;
  }, [countries, selectedRegions, search, sortBy, selectedStatus]);

  const tableData: CountryTableColumn[] = useMemo(
    () =>
      filteredCountries.map((country) => ({
        flag: country.flags.svg || country.flags.png,
        name: country.name.common,
        population: country.population,
        area: country.area,
        region: country.region,
      })),
    [filteredCountries]
  );

  const table = useReactTable({
    data: tableData,
    columns,
    pageCount: Math.ceil(tableData.length / 10),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div>
      <div>
        <TableComponent>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  onClick={() =>
                    router.push(
                      `/country/${convertToSlug(row.getValue('name'))}`
                    )
                  }
                  className="cursor-pointer"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  {search ? 'No results found' : 'No countries available'}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </TableComponent>
      </div>
      <div className="flex w-full justify-between items-center mt-4">
        <Button
          size="lg"
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
          className="disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          Previous
        </Button>
        <Button
          size="lg"
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
          className="disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Table;
