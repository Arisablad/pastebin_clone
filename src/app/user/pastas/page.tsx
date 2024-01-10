import { Paste, columns } from '@/components/tables/Columns';
import { DataTable } from '@/components/tables/Data-Table';
import React from 'react';

async function getData(): Promise<Paste[]> {
  // Fetch data from your API here.
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/pastas`
    );
    const parsedResponse = await response.json();

    if (!response.ok) {
      throw new Error(parsedResponse.message);
    }
    if (response.ok && !parsedResponse.pastes) {
      throw new Error(parsedResponse.message);
    }

    return parsedResponse.pastes;
  } catch (error) {
    throw new Error((error as { message: string }).message);
  }
}

export default async function UserPastasPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      {data.length > 0 ? (
        <DataTable columns={columns} data={data} />
      ) : (
        <div className="text-xl">No pastes created yet</div>
      )}
    </div>
  );
}
