import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Main = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="min-h-screen">
      <div className="relative w-full h-64">
        <Image
          src="/hero-image.jpg"
          alt="Earth from space"
          width={1920}
          height={400}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Link href="/">
            <Image
              src="/Logo.svg"
              alt="Logo"
              width={200}
              height={50}
              className="w-auto h-auto"
            />
          </Link>
        </div>
      </div>
      <div className="relative z-10 bg-black w-11/12 mx-auto -mt-16 rounded-lg p-6 border border-gray">
        {children}
      </div>
    </div>
  );
};

export default Main;
