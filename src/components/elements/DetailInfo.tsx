import React from 'react';

type DetailInfoProps = {
    title: string;
    value: string;
}

const DetailInfo:React.FC<DetailInfoProps> = ({ title, value }) => {
  return (
    <div className="w-full flex items-center justify-between border border-semi-black p-4">
      <span>{title}</span>
      <span>{value}</span>
    </div>
  );
};

export default DetailInfo;
