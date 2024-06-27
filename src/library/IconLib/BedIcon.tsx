import clsx from 'clsx';
import React from 'react';

interface BedIconProps {
  className?: string;
  height?: number;
  width?: number;
}

const BedIcon = ({ className, height, width }: BedIconProps) => {
  return (
    <span className={clsx(className, 'inline-flex items-center justify-center')}>
      <svg
        width={width || "25"}
        height={height || "19"}
        viewBox="0 0 25 19"
        fill="currentcolor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 10.8621V17.1983C0 17.6979 0.399999 18.1034 0.892857 18.1034C1.38571 18.1034 1.78571 17.6979 1.78571 17.1983V16.2931H23.2143V17.1983C23.2143 17.6979 23.6143 18.1034 24.1071 18.1034C24.6 18.1034 25 17.6979 25 17.1983V10.8621C25 9.36491 23.7982 8.14655 22.3214 8.14655H2.67857C1.20179 8.14655 0 9.36491 0 10.8621Z"
          fill="currentcolor"
        />
        <path
          d="M22.3214 6.33621V0.905172C22.3214 0.405517 21.9214 0 21.4286 0H3.57143C3.07857 0 2.67857 0.405517 2.67857 0.905172V6.33621H5.35714V5.43103C5.35714 4.43263 6.15804 3.62069 7.14286 3.62069H9.82143C10.8062 3.62069 11.6071 4.43263 11.6071 5.43103V6.33621H13.3929V5.43103C13.3929 4.43263 14.1938 3.62069 15.1786 3.62069H17.8571C18.842 3.62069 19.6429 4.43263 19.6429 5.43103V6.33621H22.3214Z"
          fill="currentcolor"
        />
      </svg>
    </span>
  );
};

export default BedIcon;
