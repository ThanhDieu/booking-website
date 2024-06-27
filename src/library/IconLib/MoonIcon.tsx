import clsx from 'clsx';
import React from 'react';
interface SunIconProps {
  className?: string;
  height?: number;
  width?: number;
}

const SunIcon = ({ className }: SunIconProps) => {
  return (
    <span className={clsx(className, 'inline-flex ml-2 items-center justify-center')}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
      >
        <rect width="32" height="32" rx="16" fill="#EFF0F0" />
        <path
          d="M16 23.5C13.9028 23.5 12.1283 22.7742 10.6767 21.3225C9.225 19.8708 8.49944 18.0967 8.5 16C8.5 14.0833 9.125 12.42 10.375 11.01C11.625 9.6 13.2222 8.77722 15.1667 8.54167C15.5139 8.5 15.7847 8.625 15.9792 8.91667C16.1736 9.20833 16.1667 9.51389 15.9583 9.83333C15.7222 10.1944 15.545 10.5764 15.4267 10.9792C15.3083 11.3819 15.2494 11.8056 15.25 12.25C15.25 13.5 15.6875 14.5625 16.5625 15.4375C17.4375 16.3125 18.5 16.75 19.75 16.75C20.1806 16.75 20.6078 16.6875 21.0317 16.5625C21.4556 16.4375 21.8339 16.2639 22.1667 16.0417C22.4583 15.8472 22.7569 15.8369 23.0625 16.0108C23.3681 16.1847 23.5 16.4589 23.4583 16.8333C23.2639 18.75 22.4481 20.3403 21.0108 21.6042C19.5736 22.8681 17.9033 23.5 16 23.5Z"
          fill="#0E1013"
        />
      </svg>
    </span>
  );
};

export default SunIcon;
