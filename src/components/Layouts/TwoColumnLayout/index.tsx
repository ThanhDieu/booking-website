import React from 'react';

interface TwoColumnLayoutProps {
  children: React.ReactNode[];
}

const TwoColumnLayout: React.FC<TwoColumnLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="w-full md:w-8/12 bg-primary-switch p-6 rounded-lg">{children[0]}</div>
      <div className="w-full md:w-4/12 md:ml-12 bg-primary-switch p-6 rounded-lg">
        {children[1]}
      </div>
    </div>
  );
};

export default TwoColumnLayout;
