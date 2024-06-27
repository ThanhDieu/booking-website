import { useEffect, useState } from 'react';
import Image from 'next/image';
import { HeroBannerProps } from '@/types/homePage';
import clsx from 'clsx';
import React from 'react';
import styles from './../HomePage.module.scss';
import Coupon from './Coupon';
import getImagePath from '@/util/getImagePath';

const HeroBanner = ({ tag, title, media }: HeroBannerProps) => {
  const [mediaUrl, setMediaUrl] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  useEffect(() => {
    // @ts-ignore
    let mediaUrl = media?.data?.attributes?.formats?.large?.url || media?.data?.attributes?.url;
    // @ts-ignore
    let mediaType = media?.data?.attributes?.mime;

    if (mediaType?.search(/video/i) === -1) {
      setMediaUrl(mediaUrl);
      setVideoUrl(null);
    } else {
      setVideoUrl(mediaUrl);
      setMediaUrl(null);
    }
  }, [media?.data?.attributes]);
  return (
    <div className="relative h-fit flex">
      {mediaUrl ? (
        <Image
          priority
          className={clsx(styles.heroBanner, 'object-cover')}
          alt="hotel background"
          height={0}
          width={0}
          quality={80}
          src={mediaUrl ? getImagePath(mediaUrl) : '/images/hero/empty-hero.webp'}
        />
      ) : (
        <div className={clsx(styles.bannerVideoContainer, 'banner-container')}>
          {videoUrl ? (
            <video
              id="banner-video"
              loop
              autoPlay
              muted
              className={clsx(styles.bannerVideo, 'banner-video')}
            >
              <source src={videoUrl} type="video/mp4" />
            </video>
          ) : null}
        </div>
      )}

      <div className="bannerOverlay"></div>
      <Coupon {...tag} />
      <div className="absolute z-30 top-1/2 left-1/2 xl:-translate-y-1/2 -translate-x-1/2 w-full px-4">
        <h1 className="text-PrimaryWhite text-center xl:py-72 flex flex-col lg:max-w-[608px] mx-auto font-[Lora]">
          {title}
        </h1>
      </div>
    </div>
  );
};

export default HeroBanner;
