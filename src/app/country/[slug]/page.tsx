import DetailInfo from '@/components/elements/DetailInfo';
import NeighbourCard from '@/components/elements/NeighbourCard';
import StatCard from '@/components/elements/StatCard';
import Main from '@/components/layout/Main';
import { revertSlugToNormal } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';

type CurrencyType = {
  name: string;
  symbol: string;
};

const Country = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const revertSlug = revertSlugToNormal(slug);
  const data = await fetch(
    `https://restcountries.com/v3.1/name/${revertSlug}?fullText=true`,
    {
      next: { revalidate: 3600 },
    }
  );
  const response = await data.json();
  const country = response[0];

  const languages = Object.values(country.languages).join(', ');
  const currencies = Object.values(country.currencies)
    .map((currency) => (currency as CurrencyType).name)
    .join(', ');

  return (
    <Main>
      <div className="flex w-full flex-col items-center justify-center text-center p-4">
        <Image
          src={country.flags.svg}
          alt={`${country.name.common} flag`}
          width={400}
          height={200}
          className="w-[400px] h-auto mb-4 rounded-xl -mt-20"
        />
        <h1 className="text-2xl font-bold mb-2">{country.name.common}</h1>
        <p>{country.name.official}</p>
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-12 mt-4">
          <StatCard title="Population" value={country.population} />
          <StatCard title="Area (km²)" value={country.area} />
        </div>
      </div>
      <DetailInfo title="Capital" value={country.capital[0]} />
      <DetailInfo title="Subregion" value={country.subregion} />
      <DetailInfo title="Languages" value={languages} />
      <DetailInfo title="Currencies" value={currencies} />
      <DetailInfo title="Continents" value={country.continents[0]} />
      <NeighbourCard codes={country.borders || []} />
    </Main>
  );
};

export default Country;
