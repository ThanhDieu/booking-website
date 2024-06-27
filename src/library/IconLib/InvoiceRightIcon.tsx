import { useAppSelector } from '@/store/hooks';
import { ThemeType } from '@/store/slice/themeSlice';
import clsx from 'clsx';
import React from 'react';

interface InvoiceRightIconProps {
  className?: string;
  height?: number;
  width?: number;
}

const InvoiceRightIcon = ({ className, height, width }: InvoiceRightIconProps) => {
  const { selected } = useAppSelector((state) => state.themeSlice);
  const stroke = selected === ThemeType.default ? '#0E1013' : 'white';
  const fill = selected === ThemeType.default ? '#D0D2D1' : '#393B3D';
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="16" height="16" rx="8" fill={fill} />
      <path
        d="M5 8H11M11 8L7.8 5M11 8L7.8 11"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default InvoiceRightIcon;
