import Image from 'next/image';
import Form from '@/components/elements/Form';
import Search from '@/components/elements/Search';
import Table from '@/components/elements/Table';
import Main from '@/components/layout/Main';

export default async function Home() {
  const data = await fetch(
    'https://restcountries.com/v3.1/all?fields=flag,name,population,area,region,subregion,flags,unMember,borders,languages',
    {
      next: {
        revalidate: 3600,
      },
    }
  );
  const countryResponse = await data.json();
  const totalCountries = countryResponse.length;

  const renderTotalCountries = () => {
    if (totalCountries === 0) {
      return <span>No countries found</span>;
    } else {
      return <span>Found {totalCountries} countries</span>;
    }
  };

  return (
    <Main>
        <div className="flex justify-between items-center flex-wrap mb-8">
          {renderTotalCountries()}
          <div className="relative w-full max-w-sm">
            <Search />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr_1fr] gap-8">
          <Form />
          <div className="md:col-span-2">
            <Table resCountry={countryResponse} />
          </div>
        </div>
    </Main>
  );
}
