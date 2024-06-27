import clsx from 'clsx';
import React from 'react';

interface LocationIconProps {
  className?: string;
  height?: number;
  width?: number;
}

const LocationIcon = ({ className, height, width }: LocationIconProps) => {
  return (
    <span className={clsx(className, 'inline-flex items-center justify-center')}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width || '16'}
        height={height || '16'}
        viewBox="0 0 16 16"
        fill="currentColor"
      >
        <path
          d="M7.9999 1.28571C9.47753 1.28571 10.8946 1.87269 11.9395 2.91754C12.9843 3.96238 13.5713 5.3795 13.5713 6.85713C13.5713 9.21142 11.917 11.7771 8.65132 14.5817C8.46974 14.7377 8.23822 14.8234 7.99883 14.8232C7.75944 14.823 7.52807 14.7369 7.34675 14.5806L7.13075 14.3931C4.00961 11.6617 2.42847 9.15885 2.42847 6.85713C2.42847 5.3795 3.01546 3.96238 4.0603 2.91754C5.10515 1.87269 6.52226 1.28571 7.9999 1.28571ZM7.9999 4.71428C7.43157 4.71428 6.88653 4.94004 6.48467 5.34191C6.0828 5.74377 5.85704 6.28881 5.85704 6.85713C5.85704 7.42546 6.0828 7.9705 6.48467 8.37236C6.88653 8.77423 7.43157 8.99999 7.9999 8.99999C8.56822 8.99999 9.11326 8.77423 9.51513 8.37236C9.91699 7.9705 10.1428 7.42546 10.1428 6.85713C10.1428 6.28881 9.91699 5.74377 9.51513 5.34191C9.11326 4.94004 8.56822 4.71428 7.9999 4.71428Z"
          fill="currentColor"
        />
      </svg>
    </span>
  );
};

export default LocationIcon;
