'use client';
import React, { useState } from 'react';
import TextEditor from '../text-editor/TextEditor';
import PasteSettings from '../paste-settings/PasteSettings';

function Paste() {
  const [code, setCode] = useState(`function add(a, b) {\n  return a + b;\n}`);

  return (
    <>
      <TextEditor code={code} setCode={setCode} />
      <PasteSettings code={code} />
    </>
  );
}

export default Paste;
