'use client';
import { PUBLIC_PASTES } from '@/constants/public_pastes';
import { TvIcon } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';

const Sidebar = () => {
  return (
    <aside className="hidden col-span-2 xl:flex flex-col px-2 gap-2">
      <p className="font-medium border-b-2 border-border py-2 border-dotted">
        Public Pastes
      </p>
      {PUBLIC_PASTES.map((singlePaste) => (
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
    </aside>
  );
};

export default Sidebar;
