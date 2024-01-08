'use client';
import React, { Suspense, use, useState } from 'react';
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
  label: string;
  fetchedPaste?: TPaste;
  pasteExposure?: string | null;
  placeholder?: string | undefined;
  language?: string;
};

function Paste({
  showSettings = false,
  disabled = true,
  label = 'New paste',
  fetchedPaste,
  pasteExposure = null,
  placeholder = 'Enter your code',
  language = 'js',
}: TPasteProps) {
  const [code, setCode] = useState(fetchedPaste?.code || '');
  const [newLanguage, setNewLanguage] = useState(language);

  const handleNewLanguage = (lang: string) => {
    setNewLanguage(lang);
    console.log(' new lang', lang);
  };

  return (
    <>
      <TextEditor
        label={label}
        disabled={disabled}
        code={code}
        setCode={setCode}
        language={newLanguage}
        pasteExposure={pasteExposure}
        placeholder={placeholder}
      />

      {showSettings && (
        <PasteSettings code={code} handleNewLanguage={handleNewLanguage} />
      )}
    </>
  );
}

export default Paste;
