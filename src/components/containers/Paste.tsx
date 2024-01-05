'use client';
import React, { useState } from 'react';
import TextEditor from '../text-editor/TextEditor';
import PasteSettings from '../paste-settings/PasteSettings';

function Paste({
  showSettings = false,
  disabled = true,
  language = 'js',
  label = 'New paste',
}) {
  const [code, setCode] = useState(`function add(a, b) {\n  return a + b;\n}`);

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
