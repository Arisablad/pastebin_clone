import { PUBLIC_PASTES } from '@/constants/public_pastes';
import React from 'react';
import PasteList from './PasteList';
import { DbConnect } from '@/lib/DbConnection';
import { PasteModel } from '@/models/MongoModels/PasteModel';

const getPastes = async () => {
  try {
    await DbConnect();
    const pastes = await PasteModel.find();
    return pastes;
  } catch (error) {
    console.log(error);
  }
};

const Sidebar = async () => {
  const pastes = await getPastes();
  console.log('pastes', pastes);
  return (
    <aside className="hidden col-span-2 xl:flex flex-col px-2 gap-2">
      <p className="font-medium border-b-2 border-border py-2 border-dotted">
        Public Pastes
      </p>
      <PasteList PublicPastes={PUBLIC_PASTES}></PasteList>
    </aside>
  );
};

export default Sidebar;
