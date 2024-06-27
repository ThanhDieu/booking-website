import clsx from 'clsx';
import React from 'react';

interface ChevronDownIconProps {
  className?: string;
  height?: number;
  width?: number;
}

const ChevronDownIcon = ({ className, height, width }: ChevronDownIconProps) => {
  return (
    <span className={clsx(className, 'inline-flex items-center justify-center')}>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        width={width || '24'}
        height={height || '24'}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
      </svg>
    </span>
  );
};

export default ChevronDownIcon;
