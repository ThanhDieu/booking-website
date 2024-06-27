import ButtonShare from '@/components/global/ButtonShare';
import { RatingStarIcon, CheckIconBlue } from '@/library';
import { HighlightItems } from '@/types/homePage';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { EmptyImage } from '@/constants/imageUrl';
import { querySearchParams } from '@/util/searchParams';
import getImagePath from '@/util/getImagePath';
import { useIbeTranslation } from '@/hooks';
import { useAppSelector } from '@/store/hooks';
import { ThemeType } from '@/store/slice/themeSlice';
import { defaultParamsSearch } from '@/constants/bundleConst';
import { usePlausible } from 'next-plausible';
import { PlausibleEvents } from '@/types/plausible';
import { pathPage } from '@/constants';

interface NewHighlightCardProps {
  highlightItems: HighlightItems | undefined;
  className?: string;
}
const NewHighlightCard = ({ highlightItems, className }: NewHighlightCardProps) => {
  const plausible = usePlausible<PlausibleEvents>();

  const { selected } = useAppSelector((state) => state.themeSlice);

  const accountPage = useIbeTranslation('accountPage');
  const router = useRouter();
  const renderImageList = highlightItems?.imageList?.data
    ? highlightItems?.imageList?.data?.map((images) => {
      return images?.attributes?.url
        ? getImagePath(images?.attributes?.formats?.small?.url || images?.attributes?.url)
        : EmptyImage;
    })
    : [];

  const renderIconList = highlightItems?.itemIcon?.data?.map((icon) => {
    return icon?.attributes?.url;
  });
  return (
    <div className="relative cursor-pointer"
    onClick={()=>router.push(`/hotel/${highlightItems?.property?.data?.attributes?.code}`)}
    
    >
      <Image
        width={0}
        height={0}
        alt={''}
        src={renderImageList[0] || EmptyImage}
        className="object-cover w-full h-[216px] rounded-t-2xl"
      />
      <div className="bg-icon-switch p-2 w-[50px] h-[50px] rounded-lg absolute top-[190px] left-6">
        <Image
          width={0}
          height={0}
          alt={''}
          src={
            selected === ThemeType.default
              ? renderIconList?.length
                ? getImagePath(renderIconList[0])
                : EmptyImage
              : renderIconList?.length && renderIconList?.length > 0
                ? getImagePath(renderIconList[1])
                : EmptyImage
          }
          className="h-8 w-8"
        />
      </div>
      <div className="px-6 py-8 flex flex-col bg-primary-switch rounded-b-2xl">
        <div className="flex flex-col gap-4 items-start justify-between">
          <div className="flex gap-2 h-14 w-full">
            <div className="flex flex-row gap-y-1 w-full">
              <p className="text-xl leading-[26px] font-normal font-[Lora] text-primary-switch textDesc-2">
                {highlightItems?.itemTitle}
              </p>
              <p className="w-[100px] min-w-[20%] text-right">
                {[...Array(highlightItems?.itemRating)]?.map((len, index) => (
                  <RatingStarIcon key={index} />
                ))}
              </p>
            </div>
          </div>
          <p className="text-secondary-switch w-full textDesc-2 h-11">
            {highlightItems?.itemSubtitle}
          </p>
        </div>
        <div className="lg:h-[172px] h-[123px]">
          {highlightItems?.checkList?.map((check, idx) => (
            <div key={idx} className="flex gap-2 lg:py-4 py-2 border-switch border-b border-0 border-solid">
              <CheckIconBlue />
              <p className="text-primary-switch leading-5 textDesc-1">
                {JSON.stringify(check)?.split('"')}
              </p>
            </div>
          ))}
        </div>
        <div className="flex gap-4 justify-center mt-6 z-50 opacity-0">
          <ButtonShare
            content={accountPage?.yourBookingPage?.bookingHistory?.bookButton}
            onClick={() => {
              plausible("click", {
                props: {
                  id: `book_now_${highlightItems?.property?.data?.attributes?.code}`
                }
              })
              highlightItems?.property?.data?.attributes &&
                router.push({
                  pathname: `/${pathPage.result}/all`,
                  query: querySearchParams({
                    ...defaultParamsSearch,
                    countryCode: highlightItems?.property?.data?.attributes?.location?.countryCode,
                    propertyId: highlightItems?.property?.data?.attributes?.code,
                  }),
                });
            }}
            size="medium"
            style="dark"
            className="!font-[500]"
          />
          <ButtonShare
            content={accountPage?.yourBookingPage?.bookingHistory?.hotelButton}
            onClick={() => {
              plausible("click", {
                props: {
                  id: `go_to_hotel_${highlightItems?.property?.data?.attributes?.code}`
                }
              })
              if (highlightItems?.property?.data?.attributes) {
                router.push(`/hotel/${highlightItems?.property?.data?.attributes?.code}`)
              }
            }}
            size="medium"
            style="outline"
            className="!font-[500]"
          />
        </div>
        <div className="flex gap-4 justify-center mt-6 z-50 w-full absolute bottom-8 left-0">
          <ButtonShare
            content={accountPage?.yourBookingPage?.bookingHistory?.bookButton}
            onClick={() => {
              plausible("click", {
                props: {
                  id: `book_now_${highlightItems?.property?.data?.attributes?.code}`
                }
              })
              highlightItems?.property?.data?.attributes &&
                router.push({
                  pathname: `/${pathPage.result}/all`,
                  query: querySearchParams({
                    ...defaultParamsSearch,
                    countryCode: highlightItems?.property?.data?.attributes?.location?.countryCode,
                    propertyId: highlightItems?.property?.data?.attributes?.code,
                  }),
                });
            }}
            size="medium"
            style="dark"
            className="!font-[500]"
          />
          <ButtonShare
            content={accountPage?.yourBookingPage?.bookingHistory?.hotelButton}
            onClick={() => {
              plausible("click", {
                props: {
                  id: `go_to_hotel_${highlightItems?.property?.data?.attributes?.code}`
                }
              })
              if (highlightItems?.property?.data?.attributes) {
                router.push(`/hotel/${highlightItems?.property?.data?.attributes?.code}`)
              }
            }}
            size="medium"
            style="outline"
            className="!font-[500]"
          />
        </div>
      </div>
    </div>
  );
};

export default NewHighlightCard;
