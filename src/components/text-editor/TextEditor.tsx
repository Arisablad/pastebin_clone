import React, { ReactNode, useState } from 'react';
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
}: {
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
  disabled: boolean;
  label: string | ReactNode;
  language: string;
}) {
  return (
    <div className="px-4 lg:col-span-8 mt-10">
      <div className="flex justify-between">
        <p className="font-medium text-xl">{label}</p>
        <p>Syntax Highlighting</p>
      </div>
      <div className="border border-border h-[300px] w-full">
        <CodeEditor
          value={code}
          language={language}
          placeholder="Please enter JS code."
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
    </div>
  );
}

export default TextEditor;
