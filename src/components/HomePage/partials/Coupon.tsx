import ButtonShare from '@/components/global/ButtonShare';
import { EmptyImage } from '@/constants/imageUrl';
import getImagePath from '@/util/getImagePath';
import { CouponProps } from '@/types/homePage';

import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { usePlausible } from 'next-plausible';
import { PlausibleEvents } from '@/types/plausible';

const Coupon = ({ media, title, subtitle, linkText, link }: CouponProps) => {
  const router = useRouter();
  const plausible = usePlausible<PlausibleEvents>();
  return (
    <div className="absolute top-14 xl:right-48 right-4 z-40 block">
      {media && (
        <div>
          <Image
            priority
            width={0}
            height={0}
            alt={'logo'}
            className="w-[203px] h-[270px]"
            unoptimized
            src={media?.data ? getImagePath(media?.data?.attributes?.url) : EmptyImage}
          />
          <div className="absolute top-24 right-8 w-[140px] text-center">
            <p className="font-[Lora] font text-2xl capitalize dark:text-PrimaryBlack">{title}</p>
            <p className="text-SecondaryBlack text-sm leading-[18px] pb-2">{subtitle}</p>
            <ButtonShare
              content={linkText ? linkText : 'See more'}
              style={'black'}
              size="small"
              onClick={() => {
                plausible("click", {
                  props: {
                    id: "buy_coupons"
                  }
                })
                link && router.push(link)
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Coupon;
