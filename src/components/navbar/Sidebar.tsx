import { PUBLIC_PASTES } from '@/constants/public_pastes';
import React from 'react';
import PasteList from './PasteList';

const getPastes = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/paste`);
  const parsedResponse = await response.json();

  if (!response.ok) {
    throw new Error('Something went wrong');
  }

  if (response.ok && parsedResponse.pastes) {
    return parsedResponse.pastes;
  }
};

const Sidebar = async () => {
  const pastes = await getPastes();
  return (
    <aside className="hidden col-span-2 xl:flex flex-col px-2 gap-2">
      <p className="font-medium border-b-2 border-border py-2 border-dotted">
        Public Pastes
      </p>
      {pastes && pastes.length > 0 ? (
        <PasteList PublicPastes={pastes}></PasteList>
      ) : (
        <p className="text-center mt-12">No Public Pastes yet...</p>
      )}
    </aside>
  );
};

export default Sidebar;
