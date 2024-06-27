import clsx from 'clsx';
import React from 'react';

interface ChevronNextIconProps {
  className?: string;
  height?: number;
  width?: number;
}

const ChevronNextIcon = ({ className, height, width }: ChevronNextIconProps) => {
  return (
    <span className={clsx(className, 'inline-flex items-center justify-center')}>
      <svg width="11" height="16" viewBox="0 0 11 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.1093 7.37568L2.98163 0.255608C2.81677 0.090796 2.59671 0 2.36206 0C2.12741 0 1.90735 0.090796 1.74249 0.255608L1.21759 0.779831C0.876037 1.12142 0.876037 1.6766 1.21759 2.01767L7.20284 7.99668L1.21095 13.9823C1.0461 14.1471 0.955078 14.3668 0.955078 14.6011C0.955078 14.8357 1.0461 15.0554 1.21095 15.2203L1.73585 15.7444C1.90084 15.9092 2.12077 16 2.35542 16C2.59007 16 2.81013 15.9092 2.97499 15.7444L10.1093 8.61782C10.2745 8.45248 10.3653 8.23174 10.3647 7.99707C10.3653 7.7615 10.2745 7.54088 10.1093 7.37568Z" fill="white"/>
</svg>

    </span>
  );
};

export default ChevronNextIcon;