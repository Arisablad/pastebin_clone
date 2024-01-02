import React, { ReactNode } from 'react';

const MaxWidthWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-background-secondary xl:px-[226px] mx-auto py-16">
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
