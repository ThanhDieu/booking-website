import clsx from 'clsx';
import React from 'react';

interface ChervRighIconProps {
  className?: string;
  height?: number;
  width?: number;
}

const ChervRighIcon = ({ className, height, width }: ChervRighIconProps) => {
  return (
    <span className={clsx(className, 'inline-flex items-center justify-center')}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width || '6'}
        height={height || '12'}
        viewBox="0 0 6 12"
        fill="currentColor"
      >
        <path
          d="M0.339844 9.36133V1.33008C0.339844 0.767578 0.996094 0.486328 1.40234 0.892578L5.40234 4.89258C5.65234 5.14258 5.65234 5.54883 5.40234 5.79883L1.40234 9.79883C0.996094 10.2051 0.339844 9.92383 0.339844 9.36133Z"
          fill="#3A6EA5"
        />
      </svg>
    </span>
  );
};

export default ChervRighIcon;
