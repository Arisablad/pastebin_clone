'use client';
import { Paste, columns } from '@/components/tables/Columns';
import { DataTable } from '@/components/tables/Data-Table';
import React, { useEffect, useState } from 'react';

export default function UserPastasPage() {
  const [data, setData] = useState<[] | Paste[]>([]);

  useEffect(() => {
    async function getData(): Promise<void> {
      // Fetch data from your API here.
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/pastas`
        );
        const parsedResponse = await response.json();

        if (!response.ok) {
          throw new Error(parsedResponse.message);
        }
        if (response.ok && !parsedResponse.pastes) {
          throw new Error(parsedResponse.message);
        }

        setData(parsedResponse.pastes);
      } catch (error) {
        throw new Error((error as { message: string }).message);
      }
    }
    getData();
  }, []);
  return (
    <div className="container mx-auto py-10">
      {data?.length > 0 ? (
        <DataTable columns={columns} data={data} />
      ) : (
        <div className="text-xl">No pastes created yet</div>
      )}
    </div>
  );
}
