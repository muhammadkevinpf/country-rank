import Image from 'next/image';
import React from 'react';

type NeighbourType = {
  name: string;
  flag: string;
};

const NeighbourCard: React.FC<{ codes: [] }> = async ({ codes }) => {
  const getNeighbours = async () => {
    const neighbours = [];
    if (codes.length > 0) {
      for (const code of codes) {
        const neighbourData = await fetch(
          `https://restcountries.com/v3.1/alpha/${code}?fields=name,flags`,
          { next: { revalidate: 3600 } }
        ).then((res) => res.json());
        if (neighbourData) {
          neighbours.push({
            name: neighbourData.name.common,
            flag: neighbourData.flags.svg,
          });
        }
      }
    }
    return neighbours;
  };

  const renderNeighbours = async () => {
    const neighbours = await getNeighbours();
    return neighbours.map((neighbour: NeighbourType) => (
      <div key={neighbour.name} className="flex flex-col items-center gap-3">
        <Image
          src={neighbour.flag}
          alt={`${neighbour.name} flag`}
          width={120}
          height={80}
          className="w-30 h-20 rounded"
        />
        <span>{neighbour.name}</span>
      </div>
    ));
  };
  return <div className='flex flex-wrap gap-5 mt-5 justify-between md:justify-start'>{renderNeighbours()}</div>;
};

export default NeighbourCard;
