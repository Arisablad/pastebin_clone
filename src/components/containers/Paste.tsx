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
  userName: string;
  pasteId: string;
};

type TPasteProps = {
  showSettings: boolean;
  disabled: boolean;
  language: string;
  label: string;
  fetchedPaste?: TPaste;
  pasteExposure?: string | null;
};

function Paste({
  showSettings = false,
  disabled = true,
  language = 'js',
  label = 'New paste',
  fetchedPaste,
  pasteExposure = null,
}: TPasteProps) {
  const [code, setCode] = useState(fetchedPaste?.code || '');

  return (
    <>
      <TextEditor
        label={label}
        disabled={disabled}
        code={code}
        setCode={setCode}
        language={language}
        pasteExposure={pasteExposure}
      />

      {showSettings && <PasteSettings code={code} />}
    </>
  );
}

export default Paste;
