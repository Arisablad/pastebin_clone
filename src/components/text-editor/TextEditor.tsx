import React from 'react';

function TextEditor() {
  return (
    <div className="px-4 lg:col-span-8 mt-10">
      <div className="flex justify-between">
        <p className="font-medium text-xl">New Paste</p>
        <p>Syntax Highlighting</p>
      </div>
      <textarea className="border border-border h-[300px] w-full">
        TextEditor
      </textarea>
    </div>
  );
}

export default TextEditor;
