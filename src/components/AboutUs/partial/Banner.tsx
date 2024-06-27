import getImagePath from '@/util/getImagePath';
import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';
import styles from './../AboutUs.module.scss';

type AboutBannerProps = {
  image: string;
  title?: string;
  text?: string;
  contentStyle?: string;
};

const AboutBanner = ({ image, title, text, contentStyle }: AboutBannerProps) => {
  return (
    <div className="relative flex">
      <Image
        className={clsx(styles.aboutUsBanner, 'object-cover !h-[60vh] lg:!h-screen')}
        src={image}
        alt=""
        width={0}
        height={0}
        priority
      />
      <div className="bannerOverlay !h-[60vh] lg:!h-screen"></div>
      <div
        className={clsx(
          'left-1/3 top-2/4 md:top-1/3 -translate-y-[33%] -translate-x-[33%] absolute z-20 max-w-[792px]',
          contentStyle
        )}
      >
        <h1 className="font-[Lora] text-PrimaryWhite">{title}</h1>
        <p className="text-base leading-[26px] pt-8 text-PrimaryWhite">{text}</p>
      </div>
    </div>
  );
};

export default AboutBanner;
