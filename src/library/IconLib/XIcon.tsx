import clsx from 'clsx';
import React from 'react';

interface XIconProps {
  className?: string;
  height?: number;
  width?: number;
}

const XIcon = ({ className, height, width }: XIconProps) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.085 2.91514C12.9261 2.75625 12.7106 2.66699 12.4858 2.66699C12.2611 2.66699 12.0456 2.75625 11.8866 2.91514L7.99984 6.80192L4.11306 2.91514C3.95412 2.75625 3.73859 2.66699 3.51385 2.66699C3.28912 2.66699 3.07359 2.75625 2.91465 2.91514C2.75576 3.07407 2.6665 3.28961 2.6665 3.51434C2.6665 3.73908 2.75576 3.95461 2.91465 4.11355L6.80143 8.00033L2.91465 11.8871C2.75576 12.046 2.6665 12.2616 2.6665 12.4863C2.6665 12.711 2.75576 12.9266 2.91465 13.0855C3.07359 13.2444 3.28912 13.3337 3.51385 13.3337C3.73859 13.3337 3.95412 13.2444 4.11306 13.0855L7.99984 9.19873L11.8866 13.0855C12.0456 13.2444 12.2611 13.3337 12.4858 13.3337C12.7106 13.3337 12.9261 13.2444 13.085 13.0855C13.2439 12.9266 13.3332 12.711 13.3332 12.4863C13.3332 12.2616 13.2439 12.046 13.085 11.8871L9.19825 8.00033L13.085 4.11355C13.2439 3.95461 13.3332 3.73908 13.3332 3.51434C13.3332 3.28961 13.2439 3.07407 13.085 2.91514Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default XIcon;
