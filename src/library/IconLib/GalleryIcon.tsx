import clsx from 'clsx';
import React from 'react';

interface GalleryIconProps {
  className?: string;
  height?: number;
  width?: number;
}

const GalleryIcon = ({ className, height, width }: GalleryIconProps) => {
  return (
    <span className={clsx(className, 'inline-flex items-center')}>
      <svg
        width="22"
        height="18"
        viewBox="0 0 22 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20.6031 0.445312H1.39685C0.625449 0.445312 0 1.07072 0 1.84212V16.1596C0 16.931 0.625449 17.5564 1.39685 17.5564H20.6031C21.3745 17.5564 22 16.931 22 16.1596V1.84212C22 1.07072 21.3746 0.445312 20.6031 0.445312ZM20.6031 1.84212V12.0009L17.8503 9.49811C17.4366 9.12201 16.8003 9.13703 16.405 9.53269L13.619 12.3183L8.12569 5.75671C7.71045 5.26083 6.94988 5.25596 6.52841 5.74588L1.39685 11.7096V1.84212H20.6031ZM14.6667 5.50879C14.6667 4.44789 15.5263 3.58814 16.5872 3.58814C17.6482 3.58814 18.5079 4.44789 18.5079 5.50879C18.5079 6.56968 17.6482 7.42939 16.5872 7.42939C15.5264 7.42943 14.6667 6.56968 14.6667 5.50879Z"
          fill="white"
        />
      </svg>
    </span>
  );
};

export default GalleryIcon;
