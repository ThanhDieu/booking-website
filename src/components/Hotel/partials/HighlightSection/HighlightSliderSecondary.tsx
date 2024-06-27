import Image from 'next/image';
import { ActivityType } from './SecondaryFooter';
import { Splide, SplideProps, SplideSlide } from '@splidejs/react-splide';
import { BundleType } from '@/types/bundle/bundleType';
import { EmptyImage } from '@/constants/imageUrl';
import Currency from '@/components/global/CurrencyComponent';
import { useRouter } from 'next/router';
import getImagePath from '@/util/getImagePath';
import { useIbeTranslation } from '@/hooks';
import { useLocale } from '@m0-0a/next-intl';
import { pathPage } from '@/constants';
import clsx from 'clsx';

export interface SecondaryContentType {
  title: string;
  image: string;
  icon: React.ReactDOM | React.ReactElement;
  price: number;
  activities: ActivityType[];
}

interface IProps {
  cardContent: BundleType[];
}

const RenderHighlightSecondaryCard = ({
  media,
  extendedData,
  title,
  priceMin,
  landscape,
  bundleId,
}: BundleType) => {
  const step0 = useIbeTranslation('bookingSteps.step0');

  const router = useRouter();
  const renderBundleImage = media?.map((media) => {
    return media;
  });
  const { locale } = useLocale();

  return (
    <div
      onClick={() => router.push(`/${pathPage.result}/${bundleId}/`)}
      className="relative h-[288px] overflow-hidden rounded-lg scalePackages cursor-pointer"
    >
      <Image
        alt={''}
        className="w-full h-full rounded-lg object-cover"
        unoptimized
        width={0}
        height={0}
        src={media?.length > 0 ? getImagePath(renderBundleImage[0]) : EmptyImage}
      />
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
          {' '}
          {extendedData?.title && extendedData?.title?.[locale]
            ? extendedData?.title?.[locale]
            : extendedData?.title?.en || title}
        </p>

        <div className="w-fit">
          <p className="text-PrimaryWhite !font-[Lora] w-fit">{step0?.from}</p>
          <div className="px-2 py-1 border border-solid border-PrimaryWhite w-fit rounded">
            <Currency color="text-PrimaryWhite" price={priceMin} />
          </div>
        </div>
      </div>
    </div>
  );
};

const slideOption: SplideProps = {
  options: {
    rewind: true,
    perPage: 3,
    gap: '3.125rem',
    perMove: 1,
    pagination: false,
    lazyLoad: true,
    drag: 'free',
    breakpoints: {
      1024: {
        gap: '1rem',
      },
      768: {
        perPage: 2,
        gap: '1rem',
        arrows: false,
      },
      640: {
        perPage: 1,
        gap: '1rem',
        arrows: false,
      },
    },
  },
};

const HighlightSliderSecondary = ({ cardContent }: IProps) => {
  return (
    <div className={clsx('rooms holiday', cardContent?.length > 0 ? 'lg:pt-10 pt-5' : '')}>
      {cardContent?.length ? (
        <Splide {...slideOption}>
          {cardContent.map((items, idx) => (
            <SplideSlide className="cursor-pointer" key={idx}>
              <RenderHighlightSecondaryCard {...items} />
            </SplideSlide>
          ))}
        </Splide>
      ) : (
        ''
      )}
    </div>
  );
};

export default HighlightSliderSecondary;
