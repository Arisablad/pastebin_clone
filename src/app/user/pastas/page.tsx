'use client';
import { Paste, columns } from '@/components/tables/Columns';
import { DataTable } from '@/components/tables/Data-Table';
import { useToast } from '@/components/ui/use-toast';
import { Trash2Icon } from 'lucide-react';
import React, { useEffect, useState } from 'react';

export default function UserPastasPage() {
  const [data, setData] = useState<[] | Paste[]>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [unselectAll, setUnselectAll] = useState(0);
  const { toast } = useToast();

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

  const handleRowSelectChagne = (value: {}) => {
    setRowSelection(value);
  };

  const handleTrashClick = async () => {
    if (Object.keys(rowSelection).length <= 0) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'You need to select rows to delete.',
      });
      return;
    }

    const selectedRows = Object.keys(rowSelection).map(
      (selection) => selection
    );
    const idsToRemove = selectedRows.map(
      (selectedRow) => (data[parseInt(selectedRow)] as Paste)._id
    );

    try {
      if (idsToRemove.length > 0) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/pastas`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(idsToRemove),
          }
        );

        const parsedResponse = await response.json();

        if (!response.ok) {
          toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Something went wrong.',
          });
          return;
        }

        if (response.status !== 200) {
          toast({
            variant: 'destructive',
            title: 'Error',
            description: parsedResponse.message || 'Unknown error',
          });
          return;
        }
        toast({
          variant: 'default',
          title: 'Success',
          description: parsedResponse.message,
        });

        setData((prev) =>
          prev.filter((element) => !idsToRemove.includes(element._id))
        );
        setUnselectAll((prev) => prev++);
        return;
      }
    } catch (error) {
      throw new Error(
        (error as { message: string }).message || 'Unknown Error'
      );
    }
  };

  return (
    <div className="container mx-auto py-10">
      {data?.length > 0 ? (
        <>
          <Trash2Icon
            onClick={handleTrashClick}
            className="hover:text-red-600 transition-all duration-300 cursor-pointer"
          />

          <DataTable
            columns={columns}
            data={data}
            handleRowSelectChagne={handleRowSelectChagne}
            unselectAll={unselectAll}
          />
        </>
      ) : (
        <div className="text-xl">No pastes created yet</div>
      )}
    </div>
  );
}
