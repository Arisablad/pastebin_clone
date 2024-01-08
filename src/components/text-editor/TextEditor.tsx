import React, { ReactNode, Suspense, useState } from 'react';
import dynamic from 'next/dynamic';
import '@uiw/react-textarea-code-editor/dist.css';

const CodeEditor = dynamic(
  () => import('@uiw/react-textarea-code-editor').then((mod) => mod.default),
  { ssr: false }
);

function TextEditor({
  code,
  setCode,
  disabled = true,
  label = 'New paste',
  language = 'js',
  pasteExposure = null,
  placeholder = 'Enter your code',
}: {
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
  disabled: boolean;
  label: string | ReactNode;
  language: string;
  pasteExposure?: string | null;
  placeholder?: string | undefined;
}) {
  return (
    <div className="px-4 lg:col-span-8 mt-10">
      <div className="flex justify-between">
        <p className="font-medium text-xl">{label}</p>
        <p>
          Syntax Highlighting:{' '}
          <span className="text-blue-400 font-bold">{language}</span>
        </p>
      </div>
      <div className="border border-border h-[300px] w-full overflow-y-auto">
        <CodeEditor
          value={code}
          language={language}
          placeholder={placeholder ?? undefined}
          onChange={(event) => setCode(event.target.value)}
          padding={15}
          disabled={disabled}
          style={{
            backgroundColor: '#f5f5f5',
            fontFamily:
              'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
            fontSize: '0.9rem',
          }}
        />
      </div>
      {code.trim().length < 3 && (
        <p className="text-red-500">Paste should have at least 3 characters</p>
      )}
      {pasteExposure && (
        <p className="text-right mt-2">
          Paste Exposure:{' '}
          <span className="font-medium underline  ">{pasteExposure}</span>
        </p>
      )}
    </div>
  );
}

export default TextEditor;
