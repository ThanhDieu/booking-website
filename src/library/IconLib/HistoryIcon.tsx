import clsx from 'clsx';
import React from 'react';

interface HistoryIconProps {
  className?: string;
  height?: number;
  width?: number;
}

const HistoryIcon = ({ className, height, width }: HistoryIconProps) => {
  return (
    <span className={clsx(className, 'inline-flex items-center mr-[4px]')}>
<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clipPath="url(#clip0_75_285)">
<path d="M17.3991 1.23535V0H8.35527V1.24164H5.84766V8.70789C7.3152 9.50578 8.31352 11.0616 8.31352 12.8463C8.31352 13.9066 7.61793 15.6374 6.18691 18.1375C6.07316 18.3362 5.95969 18.5309 5.84766 18.7205V19.8474H12.302V16.0654H13.5352V19.8474H19.8655V1.24371L17.3991 1.23535ZM11.0687 14.7394H9.83539V13.5062H11.0687V14.7394ZM11.0687 12.2729H9.83539V11.0397H11.0687V12.2729ZM11.0687 9.86305H9.83539V8.62984H11.0687V9.86305ZM13.5352 14.7394H12.3019V13.5062H13.5352V14.7394ZM13.5352 12.2729H12.3019V11.0397H13.5352V12.2729ZM13.5352 9.86305H12.3019V8.62984H13.5352V9.86305ZM14.7684 6.98547H13.5352V5.54664H12.3019V6.98547H11.0687V2.87461H12.3019V4.31344H13.5352V2.87461H14.7684V6.98547ZM16.0018 14.7394H14.7685V13.5062H16.0018V14.7394ZM16.0018 12.2729H14.7685V11.0397H16.0018V12.2729ZM16.0018 9.86305H14.7685V8.62984H16.0018V9.86305Z" fill="white"/>
<path d="M3.60652 9.37305C1.69113 9.37305 0.132812 10.9314 0.132812 12.8467C0.132812 13.3123 0.387422 14.5383 2.09277 17.5188C2.65223 18.4966 3.21648 19.3958 3.60652 20.0005C3.99652 19.3958 4.56082 18.4966 5.12027 17.5188C6.82559 14.5383 7.08023 13.3123 7.08023 12.8467C7.08019 10.9313 5.52191 9.37305 3.60652 9.37305ZM3.60652 15.1365C2.34391 15.1365 1.31668 14.1093 1.31668 12.8467C1.31668 11.5841 2.34387 10.5568 3.60652 10.5568C4.86914 10.5568 5.89637 11.5841 5.89637 12.8467C5.89637 14.1093 4.86914 15.1365 3.60652 15.1365Z" fill="white"/>
<path d="M3.60742 11.7891C3.0248 11.7891 2.55078 12.263 2.55078 12.8457C2.55078 13.4284 3.02477 13.9023 3.60742 13.9023C4.19008 13.9023 4.66406 13.4284 4.66406 12.8457C4.66406 12.2631 4.19 11.7891 3.60742 11.7891Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0_75_285">
<rect width="20" height="20" fill="white"/>
</clipPath>
</defs>
</svg>

    </span>
  );
};

export default HistoryIcon;