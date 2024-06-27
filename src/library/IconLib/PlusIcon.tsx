import clsx from 'clsx';
import React from 'react';

interface PlusIconProps {
  className?: string;
  height?: number;
  width?: number;
}

const PlusIcon = ({ className, height, width }: PlusIconProps) => {
  return (
    <span className={clsx(className, 'inline-flex items-center justify-center')}>
      <svg
        width={width || '14'}
        height={height || '14'}
        viewBox="0 0 14 14"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_2599_1570)">
          <path
            d="M13.4167 6.41667H7.58333V0.583333C7.58333 0.428624 7.52187 0.280251 7.41248 0.170854C7.30308 0.0614582 7.15471 0 7 0V0C6.84529 0 6.69692 0.0614582 6.58752 0.170854C6.47812 0.280251 6.41667 0.428624 6.41667 0.583333V6.41667H0.583333C0.428624 6.41667 0.280251 6.47812 0.170854 6.58752C0.0614582 6.69692 0 6.84529 0 7H0C0 7.15471 0.0614582 7.30308 0.170854 7.41248C0.280251 7.52187 0.428624 7.58333 0.583333 7.58333H6.41667V13.4167C6.41667 13.5714 6.47812 13.7197 6.58752 13.8291C6.69692 13.9385 6.84529 14 7 14C7.15471 14 7.30308 13.9385 7.41248 13.8291C7.52187 13.7197 7.58333 13.5714 7.58333 13.4167V7.58333H13.4167C13.5714 7.58333 13.7197 7.52187 13.8291 7.41248C13.9385 7.30308 14 7.15471 14 7C14 6.84529 13.9385 6.69692 13.8291 6.58752C13.7197 6.47812 13.5714 6.41667 13.4167 6.41667Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0_2599_1570">
            <rect width="14" height="14" fill="currentColor" />
          </clipPath>
        </defs>
      </svg>
    </span>
  );
};

export default PlusIcon;
