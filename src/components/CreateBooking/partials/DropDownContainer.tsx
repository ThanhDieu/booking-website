import clsx from 'clsx';
import React, { useState } from 'react';
import DropDownHeader from './DropDownHeader';

interface IProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

const DropDownContainer = ({ title, subtitle, children, className }: IProps) => {
  const [showChildren, setShowChildren] = useState(true);

  const handleSetShowChildren = () => {
    setShowChildren(!showChildren);
  };
  return (
    <div className={clsx(className, `bg-primary-switch p-6 rounded-lg`)}>
      <DropDownHeader
        showChildren={showChildren}
        onClick={() => handleSetShowChildren()}
        title={title}
        subtitle={subtitle}
      />
      {showChildren && children}
    </div>
  );
};
export default DropDownContainer;
