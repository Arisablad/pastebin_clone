'use client';
import { TvIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import dayjs from 'dayjs';

type PublicPaste = {
  id: string;
  title: string;
  createdAt: string;
  size: string;
  syntax: string;
  _id: string;
};
type PasteProps = {
  PublicPastes: PublicPaste[];
};

function PasteList({ PublicPastes }: PasteProps) {
  return (
    <>
      {PublicPastes.map((singlePaste) => (
        <Link
          key={singlePaste._id}
          href={`${process.env.NEXT_PUBLIC_URL}/paste/${singlePaste._id}`}
        >
          <div
            key={singlePaste.id}
            className="flex gap-4 p-4 border-b-2 border-border border-dotted py-2 group hover:bg-gradient-to-b from-[#023859] to-[#02456c] hover:text-white cursor-pointer rounded-md hover:border-none"
          >
            <TvIcon />
            <div className="flex flex-col">
              <p>{singlePaste.title}</p>
              <span className="text-sm text-blue-700 group-hover:text-blue-300">
                {singlePaste.syntax}
              </span>
              <span className="text-gray-600 text-sm group-hover:text-gray-300">
                {dayjs(singlePaste.createdAt).format('DD-MM-YYYY HH:mm:ss')}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
}

export default PasteList;
