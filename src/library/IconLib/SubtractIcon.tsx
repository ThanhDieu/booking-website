import { useAppSelector } from '@/store/hooks';
import { ThemeType } from '@/store/slice/themeSlice';
import clsx from 'clsx';
import React from 'react';

interface SubtractIconProps {
  className?: string;
  height?: number;
  width?: number;
}

const SubtractIcon = ({ className, height, width }: SubtractIconProps) => {
  const { selected } = useAppSelector((state) => state.themeSlice);
  const icon = selected === ThemeType.default ? '#646667' : '#A5A7A7';
  return (
    <span className={clsx(className, 'inline-flex items-center justify-center')}>
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.33333 11.3333H16.3333M21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11Z"
          stroke={icon}
          strokeWidth="1.5"
        />
      </svg>
    </span>
  );
};

export default SubtractIcon;
