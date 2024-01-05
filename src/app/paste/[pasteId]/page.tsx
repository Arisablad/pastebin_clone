'use client';
import Advertisment from '@/components/advertisments/Advertisment';
import Paste from '@/components/containers/Paste';
import { Sidebar } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react';

function SinglePastePage() {
  const params = useParams<{ pasteId: string }>();
  const pasteId = params.pasteId;
  const session = useSession();

  const getSinglePaste = async () => {
    const response = await fetch(`api/paste/${pasteId}`);
    const parsedData = response.json();
    // if(response.ok){

    // }
  };

  useEffect(() => {}, [session]);
  return (
    <div className="grid grid-cols-1 xl:grid-cols-10 gap-4 border border-border p-2">
      <Advertisment />
      <Sidebar />
      <Paste
        showSettings={false}
        disabled={true}
        language="js"
        label="Created By"
      />
    </div>
  );
}

export default SinglePastePage;
