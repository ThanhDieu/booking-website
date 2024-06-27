import clsx from 'clsx';
import React from 'react';

interface CheckIconBlueProps {
  className?: string;
  height?: number;
  width?: number;
}

const CheckIconBlue = ({ className, height, width }: CheckIconBlueProps) => {
  return (
    <span className={clsx(className, 'inline-flex items-center justify-center')}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        height={height || '24px'}
        width={width || '24px'}
      >
        <path
          d="M21.5629 4.43945C22.1488 5.02539 22.1488 5.97695 21.5629 6.56289L9.56289 18.5629C8.97695 19.1488 8.02539 19.1488 7.43945 18.5629L1.43945 12.5629C0.853516 11.977 0.853516 11.0254 1.43945 10.4395C2.02539 9.85352 2.97695 9.85352 3.56289 10.4395L8.50352 15.3754L19.4441 4.43945C20.0301 3.85352 20.9816 3.85352 21.5676 4.43945H21.5629Z"
          fill="#3A6EA5"
        />
      </svg>
    </span>
  );
};

export default CheckIconBlue;
