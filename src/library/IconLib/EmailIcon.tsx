import clsx from 'clsx';
import React from 'react';

interface TrashBinIconProps {
  className?: string;
  height?: number;
  width?: number;
}

const TrashBinIcon = ({ className, height, width }: TrashBinIconProps) => {
  return (
    <span className={clsx(className, 'inline-flex ml-2 items-center justify-center')}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width || '20'}
        height={height || '20'}
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <g id="Email" clipPath="url(#clip0_716_12469)">
          <path
            id="Vector"
            d="M19 1H5C3.67441 1.00159 2.40356 1.52888 1.46622 2.46622C0.528882 3.40356 0.00158786 4.67441 0 6L0 18C0.00158786 19.3256 0.528882 20.5964 1.46622 21.5338C2.40356 22.4711 3.67441 22.9984 5 23H19C20.3256 22.9984 21.5964 22.4711 22.5338 21.5338C23.4711 20.5964 23.9984 19.3256 24 18V6C23.9984 4.67441 23.4711 3.40356 22.5338 2.46622C21.5964 1.52888 20.3256 1.00159 19 1ZM5 3H19C19.5988 3.00118 20.1835 3.18151 20.679 3.5178C21.1744 3.85409 21.5579 4.33095 21.78 4.887L14.122 12.546C13.5584 13.1073 12.7954 13.4225 12 13.4225C11.2046 13.4225 10.4416 13.1073 9.878 12.546L2.22 4.887C2.44215 4.33095 2.82561 3.85409 3.32105 3.5178C3.81648 3.18151 4.40121 3.00118 5 3ZM19 21H5C4.20435 21 3.44129 20.6839 2.87868 20.1213C2.31607 19.5587 2 18.7956 2 18V7.5L8.464 13.96C9.40263 14.8963 10.6743 15.422 12 15.422C13.3257 15.422 14.5974 14.8963 15.536 13.96L22 7.5V18C22 18.7956 21.6839 19.5587 21.1213 20.1213C20.5587 20.6839 19.7956 21 19 21Z"
            fill="currentColor"
          />
        </g>
      </svg>
    </span>
  );
};

export default TrashBinIcon;
