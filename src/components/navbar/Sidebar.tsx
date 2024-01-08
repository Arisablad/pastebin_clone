'use client';
import React, { useEffect, useState } from 'react';
import PasteList from './PasteList';
import { Skeleton } from '../ui/skeleton';

const Sidebar = () => {
  const [pastes, setPastes] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pastesData = await getPastes();
        setPastes(pastesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <aside className="hidden col-span-2 xl:flex flex-col px-2 gap-2">
      <p className="font-medium border-b-2 border-border py-2 border-dotted">
        Public Pastes
      </p>
      {pastes && pastes.length > 0 ? (
        <PasteList PublicPastes={pastes}></PasteList>
      ) : loading ? (
        <div className="flex w-full flex-col gap-4 items-center">
          <Skeleton className="h-12 w-full rounded-full bg-accent-foreground" />
          <Skeleton className="h-12 w-full rounded-full bg-accent-foreground" />
          <Skeleton className="h-12 w-full rounded-full bg-accent-foreground" />
          <Skeleton className="h-12 w-full rounded-full bg-accent-foreground" />
        </div>
      ) : (
        <p className="text-center mt-12">No Public Pastes yet...</p>
      )}
    </aside>
  );
};

export default Sidebar;
