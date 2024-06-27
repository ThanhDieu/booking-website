import clsx from 'clsx';
import React from 'react';
import styles from '../../Hotel.module.scss';
import { Wrapper } from '@/components/global/Wrapper';
import Image from 'next/image';
import ButtonShare from '@/components/global/ButtonShare';
import { ImageType } from '../DiningSection/types';
import { useRouter } from 'next/router';
import { EmptyImage } from '@/constants/imageUrl';
import { useIbeTranslation } from '@/hooks';
import Link from 'next/link';
import getImagePath from '@/util/getImagePath';
import Coupon from '@/components/HomePage/partials/Coupon';

interface BannerPropType {
  title: string;
  media: ImageType;
  whiteLogo: string;
  subTitle?: string;
  hideButton?: boolean;
  tag?: any;
}

const Banner = ({ title, subTitle, media, whiteLogo, hideButton = false, tag }: BannerPropType) => {
  const banner = useIbeTranslation('banner');
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();

    const href = e.currentTarget.href;
    const targetId = href.replace(/.*\#/, '');

    const ele = document.getElementById(targetId);
    ele?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };
  return (
    <div className="relative h-screen overflow-hidden">
      <Image
        className={clsx(styles.hotelBg)}
        alt="hotel background"
        height={0}
        width={0}
        quality={80}
        src={media?.data?.attributes?.url ? getImagePath(media?.data?.attributes?.url) : EmptyImage}
        unoptimized
      />
      {tag && <Coupon {...tag} />}
      <div className="absolute z-10 top-2/4 md:top-[35%] xl:top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
        <Wrapper>
          <div className="flex flex-col justify-center text-center">
            <p className={clsx(styles.textSmall, 'text-PrimaryWhite')}>{subTitle}</p>
            <Image
              className="mx-auto object-cover"
              alt="hotel logo"
              height={47}
              width={200}
              src={whiteLogo ? whiteLogo : '/images/logos/HeaderLogo.png'}
            />
            <h1 className={'text-center text-PrimaryWhite font-[lora]'}>{title}</h1>
            {!hideButton && (
              <div className="flex mt-6 justify-center">
                {/* <ButtonShare
                className="bg-PrimaryWhite !text-PrimaryBlack"
                onClick={() => handleClick}
                style={'PrimaryWhite'}
                content={banner?.holidayPackages}
                size={'large'}
              /> */}
                <Link
                  className="h-12 px-4 bg-PrimaryBlue hover:bg-DarkBlue rounded-md text-PrimaryWhite transition-all flex items-center"
                  href="#highlights"
                  onClick={handleScroll}
                >
                  {banner?.holidayPackages}
                </Link>
              </div>
            )}
          </div>
        </Wrapper>
      </div>
      <div className={clsx(styles.bannerOverlay)} />
    </div>
  );
};

export default Banner;
