import React from 'react';
import BoxContentProps from './@types';
import clsx from 'clsx';
import Image from 'next/image';
import { EmptyImage } from '@/constants/imageUrl';
import getImagePath from '@/util/getImagePath';

export enum StyleBox {
  BOX = 'box',
  LINE = 'line',
}

const BoxContent = ({
  onClick,
  className,
  label,
  icon,
  labelStyle,
  width,
  height,
  style,
}: BoxContentProps) => {
  return (
    <div
      onClick={onClick}
      style={{ width, height }}
      className={clsx(
        'flex items-center justify-between h-[40px] mt-1 first-of-type:mt-0 px-3 rounded-md',
        {
          'border border-solid border-switch': style === StyleBox.BOX,
          '!border-t border-b-0 border-l-0 border-r-0 rounded-none border-solid border-switch ':
            style === StyleBox.LINE,
          'cursor-pointer': onClick
        },
        className
      )}
    >
      <p className={clsx(labelStyle, 'leading-5 text-primary-switch text-base')}>{label}</p>
      <div className="w-6 h-6 overflow-hidden flex items-center justify-center">
        <Image
          className="w-full h-full object-cover"
          src={icon && icon !== '' ? getImagePath(icon) : EmptyImage}
          alt={label || 'icon'}
          width={0}
          height={0}
        />
      </div>
    </div>
  );
};

export default BoxContent;
