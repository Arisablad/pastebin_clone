import Image from 'next/image';
import React from 'react';
import github from '../../../public/images/github.png';
import Link from 'next/link';

const Advertisment = () => {
  return (
    <div className="h-min lg:col-span-8 relative group">
      <p className="text-center text-xl text-gray-500 absolute top-0 left-0 w-full group-hover:text-white z-10 transition duration-1000 ease-in-out">
        Advertisment
      </p>
      <Link href="https://github.com/Arisablad" target="_blank">
        <Image
          src={github}
          alt="Advertisment"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: '100%', height: 'auto' }}
          className="rounded-xl"
        />
      </Link>
      <div className="absolute top-0 left-0 w-full h-full hidden z-0 rounded-md transition motion-reduce:transition-none lg:block lg:group-hover:bg-sky-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg cursor-pointer"></div>
    </div>
  );
};

export default Advertisment;
