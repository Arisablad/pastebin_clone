'use client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  ColumnFiltersState,
  getFilteredRowModel,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useState } from 'react';
import { Trash2Icon } from 'lucide-react';
import { useToast } from '../ui/use-toast';
import { Paste } from './Columns';
import { unknown } from 'zod';
import { useRouter } from 'next/navigation';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const { toast } = useToast();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      columnFilters,
      rowSelection,
    },
  });

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
        return;
      }
    } catch (error) {
      throw new Error(
        (error as { message: string }).message || 'Unknown Error'
      );
    }
  };

  return (
    <>
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Filter titles..."
          value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('title')?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        {
          <Trash2Icon
            onClick={handleTrashClick}
            className="hover:text-red-600 transition-all duration-300 cursor-pointer"
          />
        }
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
}
