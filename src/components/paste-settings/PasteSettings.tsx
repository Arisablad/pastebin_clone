import React from 'react';
import PasteForm from './PasteForm';

function PasteSettings() {
  return (
    <div className="px-4 lg:col-span-8 mt-10">
      <p className="border-b-border font-medium text-xl mb-6">
        Optional Paste Settings
      </p>
      <PasteForm />
    </div>
  );
}

export default PasteSettings;
