'use client';
import Advertisment from '@/components/advertisments/Advertisment';
import Paste from '@/components/containers/Paste';
import Sidebar from '@/components/navbar/Sidebar';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/use-toast';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

type Paste = {
  category: string;
  code: string;
  createdAt: string;
  exposure: string;
  syntax: string;
  title: string;
  updatedAt: string;
  userId: string;
  __v: number;
  _id: string;
  userName: string;
  pasteId: string;
};

function SinglePastePage() {
  const params = useParams<{ pasteId: string }>();
  const pasteId = params.pasteId;
  const { data: session } = useSession();
  const [paste, setPaste] = useState<Paste | null>(null);
  const { toast } = useToast();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL as string;
  const [errors, setErrors] = useState('');
  const [loading, setLoading] = useState(true);

  const getSinglePaste = async () => {
    try {
      const response = await fetch(`${apiUrl}/paste/${pasteId}`);
      const parsedData = await response.json();
      if (!response.ok) {
        setErrors(parsedData.message);
        toast({
          variant: 'destructive',
          title: 'Error Something went wrong',
          description: parsedData.message || 'error',
        });
      }
      if (response.ok && parsedData.paste) {
        setPaste(parsedData.paste);
        return;
      }
      if (response.ok && !parsedData.paste) {
        toast({
          variant: 'destructive',
          title: 'Error Something went wrong',
          description: parsedData.message || 'error',
        });
        setErrors(parsedData.message);
        setPaste(null);
        return;
      }
    } catch (error) {
      console.log('error with fetch', error);
      return;
    } finally {
      setLoading(false);
    }
  };

  console.log('paste');

  useEffect(() => {
    async function fetchPastes() {
      await getSinglePaste();
    }

    fetchPastes();
  }, [session]);
  return (
    <div className="grid grid-cols-1 xl:grid-cols-10 gap-4 border border-border p-2 h-min">
      <Advertisment />
      <Sidebar />

      {paste && Object.keys(paste).length > 0 ? (
        <div className="lg:col-span-8">
          <h1 className="lg:col-span-8 text-center text-xl font-semibold">
            Title: {paste.title}
          </h1>
          <Paste
            showSettings={false}
            disabled={true}
            label={`Created By ${paste.userName}`}
            fetchedPaste={paste}
            pasteExposure={paste.exposure}
            language={paste.syntax}
          />
          <ul className="bg-accent-foreground/20 rounded-md px-4 lg:col-span-8 flex flex-col py-2 items-center">
            <p className=" font-mono text-xl">Additional Paste info:</p>
            <li>Category : {paste.category}</li>
            <li>Created-At: {paste.createdAt}</li>
            <li>Syntax: {paste.syntax}</li>
          </ul>
        </div>
      ) : loading ? (
        <div className="w-full lg:col-span-8">
          <div className="flex w-full flex-col gap-4 items-center">
            <Skeleton className="h-12 w-full rounded-full bg-accent-foreground" />
            <Skeleton className="h-12 w-full rounded-full bg-accent-foreground" />
            <Skeleton className="h-12 w-full rounded-full bg-accent-foreground" />
            <Skeleton className="h-12 w-full rounded-full bg-accent-foreground" />
          </div>
        </div>
      ) : (
        <div className="w-full lg:col-span-8">
          <p>Error {errors}</p>
          <Button asChild>
            <Link href={'/'}>Go Back To Homepage</Link>
          </Button>
        </div>
      )}
    </div>
  );
}

export default SinglePastePage;
