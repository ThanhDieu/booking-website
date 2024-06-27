import Currency from '@/components/global/CurrencyComponent';
import { pathPage } from '@/constants';
import { EmptyImage } from '@/constants/imageUrl';
import { useIbeTranslation } from '@/hooks';
import { BundleType } from '@/types/bundle/bundleType';
import { HolidaysSection } from '@/types/homePage';
import { isSpecialDays, timeInPeriodsDefault } from '@/util/bundle';
import getImagePath from '@/util/getImagePath';
import { querySearchParams } from '@/util/searchParams';
import { useLocale } from '@m0-0a/next-intl';
import { Splide, SplideProps, SplideSlide } from '@splidejs/react-splide';
import Image from 'next/image';
import { useRouter } from 'next/router';

const RenderViewSlideCard = ({
  media,
  extendedData,
  title,
  priceMin,
  landscape,
  bundleId,
  periods,
  minimumStay,
  daysOfWeek,
  property
}: BundleType) => {
  const step0 = useIbeTranslation('bookingSteps.step0');
  const renderBundleImage = media?.map((media) => {
    return media;
  });
  const router = useRouter();
  const { locale } = useLocale();
  const defaultTime = timeInPeriodsDefault(
    periods,
    minimumStay || 1,
    isSpecialDays(daysOfWeek)
  );
  return (
    <div
      onClick={() => router.push({
        pathname: `/${pathPage.result}/${bundleId}/`,
        query: querySearchParams({
          countryCode: property?.location?.countryCode,
          propertyId: property.extId,
          adults: 1,
          rooms: 1,
          children: 0,
          childrenAgeBelow: [],
          arrival: defaultTime?.start || undefined,
          departure: defaultTime?.end || undefined,
        })
      })}
      className="relative h-[288px] overflow-hidden rounded-lg scalePackages cursor-pointer"
    >
      <Image
        alt={''}
        className="w-full h-full rounded-lg object-cover"
        unoptimized
        width={0}
        height={0}
        src={media?.length > 0 ? getImagePath(renderBundleImage[0], 400) : EmptyImage}
      />
      <p className='w-full absolute top-0 left-0 p-4 z-50 bg-gradient-to-b from-PrimaryBlack text-PrimaryWhite'>{`${property?.name}, ${property?.country}`}</p>
      <div className="absolute rounded-lg bottom-0 w-full h-1/2 flex items-end justify-between gap-4 px-6 pb-6 bg-gradient-to-t from-PrimaryBlack">
        <div className="bg-PrimaryWhite rounded-lg w-[50px] h-[50px] p-2 xl:flex lg:hidden items-center justify-center">
          <Image
            alt={'gallery'}
            className="w-[32px] h-[32px]"
            unoptimized
            width={0}
            height={0}
            src={landscape?.icons?.dark ? getImagePath(landscape?.icons?.dark) : EmptyImage}
          />
        </div>
        <p className="text-PrimaryWhite !font-[Lora] w-[155px] leading-[22px] textDesc-2">
          {extendedData?.title && extendedData?.title?.[locale]
            ? extendedData?.title?.[locale]
            : extendedData?.title?.en || title}
        </p>
        <div>
          <p className="text-PrimaryWhite !font-[Lora] w-fit">{step0?.from}</p>
          <div className="px-2 py-1 border border-solid border-PrimaryWhite w-fit  rounded">
            <Currency color="text-PrimaryWhite" price={priceMin} />
          </div>
        </div>
      </div>
    </div>
  );
};
const SlideOption: SplideProps = {
  options: {
    rewind: false,
    perPage: 3,
    gap: '1.5rem',
    perMove: 1,
    pagination: false,
    lazyLoad: true,
    drag: 'free',
    breakpoints: {
      640: {
        perPage: 1,
        arrows: false,
      },
      768: {
        perPage: 2,
        arrows: false,
      },
      1024: {
        perPage: 2,
      },
    },
  },
};
const ViewSlide = ({ homeBundles }: HolidaysSection) => {
  return (
    <div className="holiday pt-6">
      <Splide aria-label="holiday slide" {...SlideOption}>
        {homeBundles &&
          homeBundles?.map((landscape) => (
            <SplideSlide key={landscape.title} className="cursor-pointer">
              <RenderViewSlideCard {...landscape} />
            </SplideSlide>
          ))}
      </Splide>
    </div>
  );
};

export default ViewSlide;
