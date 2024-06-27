import clsx from 'clsx';
import React from 'react';

interface ChevronPrevIconProps {
  className?: string;
  height?: number;
  width?: number;
}

const ChevronPrevIcon = ({ className, height, width }: ChevronPrevIconProps) => {
  return (
    <span className={clsx(className, 'inline-flex items-center justify-center')}>
      <svg width="11" height="16" viewBox="0 0 11 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.943479 8.62432L8.07111 15.7444C8.23596 15.9092 8.45602 16 8.69067 16C8.92532 16 9.14539 15.9092 9.31024 15.7444L9.83514 15.2202C10.1767 14.8786 10.1767 14.3234 9.83514 13.9823L3.8499 8.00332L9.84178 2.01768C10.0066 1.85286 10.0977 1.63316 10.0977 1.39888C10.0977 1.16435 10.0066 0.944643 9.84178 0.779701L9.31688 0.255608C9.1519 0.0907966 8.93196 1.05548e-06 8.69731 1.07597e-06C8.46266 1.09646e-06 8.2426 0.0907966 8.07775 0.255608L0.943479 7.38218C0.778235 7.54752 0.687474 7.76826 0.687995 8.00293C0.687475 8.2385 0.778235 8.45912 0.943479 8.62432Z" fill="white"/>
</svg>

    </span>
  );
};

export default ChevronPrevIcon;