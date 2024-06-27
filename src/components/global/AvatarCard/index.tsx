import React, { Fragment } from 'react';
import styles from './AvatarCard.module.scss';
import AvatarCardProps from './@types';
import { Avatar } from 'antd';
import { StarFilled, UserOutlined } from '@ant-design/icons';
import ButtonShare from '../ButtonShare';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { EmptyImage } from '@/constants/imageUrl';

enum Style {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical',
}

const AvatarCard = ({
  button,
  size,
  className,
  src,
  content,
  style,
  penalClass,
  propertyId,
  classImage
}: AvatarCardProps) => {
  const router = useRouter();
  return (
    <div
      className={clsx('flex items-start justify-around gap-2 ', penalClass, {
        'flex-col': style === Style.VERTICAL,
      })}
    >
      <div
        onClick={() => propertyId ? router.push(`/hotel/${propertyId}`) : ''}
        className={clsx(
          'flex gap-2 col-span-2',
          {
            'flex-col': style === Style.VERTICAL,
            'flex-row': style === Style.HORIZONTAL,
          },
          className
        )}
      >
        <div className="">
          <Image
            className={clsx("mx-auto object-cover rounded-[50%]", classImage || '')}
            src={src || EmptyImage}
            width={size ? size : 60}
            height={size ? size : 60}
            alt=""
          />
        </div>
        <div>{content}</div>
      </div>
      {button}
    </div>
  );
};

export default AvatarCard;
