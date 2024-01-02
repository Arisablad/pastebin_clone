'use client';
import { TvIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

type PublicPaste = {
  id: string;
  title: string;
  createdAt: string;
  size: string;
  syntax: string;
};
type PasteProps = {
  PublicPastes: PublicPaste[];
};

function PasteList({ PublicPastes }: PasteProps) {
  return (
    <>
      {PublicPastes.map((singlePaste) => (
        <Link key={singlePaste.id} href={`paste/${singlePaste.id}`}>
          <div
            key={singlePaste.id}
            className="flex gap-4 border-b-2 border-border border-dotted py-2 hover:bg-secondary cursor-pointer"
          >
            <TvIcon />
            <div className="flex flex-col">
              <p>{singlePaste.title}</p>
              <span>
                {singlePaste.syntax} | {singlePaste.createdAt} |{' '}
                {singlePaste.size}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
}

export default PasteList;
