import React from 'react';
import CardItemProps from './@types';
import Image from 'next/image';
import clsx from 'clsx';
import { EmptyImage } from '@/constants/imageUrl';

const CardItem = ({ image, height, title, content, icon, onClick }: CardItemProps) => {
  return (
    <div
      style={{ height }}
      className={clsx('rounded-xl overflow-hidden flex flex-col', onClick && 'cursor-pointer')}
    >
      <div onClick={onClick} className="h-[218px] overflow-hidden">
        <Image
          className="w-full h-full object-cover scaleImage"
          src={image && image !== '' 
                  ? image 
                  : EmptyImage}
          alt={'hotel'}
          width={0}
          height={0}
          unoptimized
        />
      </div>
      <div className="xl:p-8 p-4 bg-primary-switch relative">
        <div className="absolute -top-7 left-7 w-[50px] h-[50px] flex justify-center items-center text-PrimaryWhite rounded-lg bg-icon-switch shadow-md">
          <div className="text-primary-switch w-6 h-6 flex items-center justify-center">
            <Image
              className="w-full h-full object-cover"
              src={ icon && icon !== '' 
              ? icon 
              : EmptyImage}
              alt={'hotel'}
              width={0}
              height={0}
              unoptimized
            />
          </div>
        </div>
        <div onClick={onClick}>{title}</div>
        <div className="overflow-hidden flex flex-col">{content}</div>
      </div>
    </div>
  );
};

export default CardItem;
