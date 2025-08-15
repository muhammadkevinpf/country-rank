import { formatNumberWithCommas } from '@/lib/utils';
import React from 'react';

type StatCardProps = {
  title: string;
  value: number;
};

const StatCard: React.FC<StatCardProps> = ({title, value}) => {
  return (
    <div className="bg-semi-black p-4 rounded-lg">
      <span className="border-r-2 border-black p-2">{title}</span>
      <span className="p-2">{formatNumberWithCommas(value)}</span>
    </div>
  );
};

export default StatCard;
