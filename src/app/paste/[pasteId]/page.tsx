'use client';
import Advertisment from '@/components/advertisments/Advertisment';
import Paste from '@/components/containers/Paste';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Sidebar } from 'lucide-react';
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
};

function SinglePastePage() {
  const params = useParams<{ pasteId: string }>();
  const pasteId = params.pasteId;
  const session = useSession();
  const [paste, setPaste] = useState<Paste | null>(null);
  const { toast } = useToast();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL as string;
  const [errors, setErrors] = useState('');

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
    <div className="grid grid-cols-1 xl:grid-cols-10 gap-4 border border-border p-2">
      <Advertisment />
      <Sidebar />
      {paste && Object.keys(paste).length > 0 ? (
        <Paste
          showSettings={false}
          disabled={true}
          language="js"
          label="Created By"
          fetchedPaste={paste}
        />
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
