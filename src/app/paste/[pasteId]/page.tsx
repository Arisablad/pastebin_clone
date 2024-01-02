'use client';
import { useParams } from 'next/navigation';
import React from 'react';

function SinglePastePage() {
  const params = useParams<{ pasteId: string }>();
  const pasteId = params.pasteId;
  return <div>SinglePastePage {pasteId}</div>;
}

export default SinglePastePage;
