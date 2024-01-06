'use client';
import React, { useState } from 'react';
import TextEditor from '../text-editor/TextEditor';
import PasteSettings from '../paste-settings/PasteSettings';

type TPaste = {
  _id: string;
  category: string;
  syntax: string;
  exposure: string;
  title: string;
  code: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type TPasteProps = {
  showSettings: boolean;
  disabled: boolean;
  language: string;
  label: string;
  fetchedPaste?: TPaste;
};

function Paste({
  showSettings = false,
  disabled = true,
  language = 'js',
  label = 'New paste',
  fetchedPaste,
}: TPasteProps) {
  const [code, setCode] = useState(fetchedPaste?.code || '');

  console.log('code', code);

  return (
    <>
      <TextEditor
        label={label}
        disabled={disabled}
        code={code}
        setCode={setCode}
        language={language}
      />

      {showSettings && <PasteSettings code={code} />}
    </>
  );
}

export default Paste;
