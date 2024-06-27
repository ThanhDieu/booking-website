import { pathPage } from '@/constants';
import { EmptyImage } from '@/constants/imageUrl';
import { useAppDispatch } from '@/store/hooks';
import { setAppFilter } from '@/store/slice/commonSlice';
import { HolidaysSection, SlpideCardProps } from '@/types/homePage';
import getImagePath from '@/util/getImagePath';
import { useLocale } from '@m0-0a/next-intl';
import { Splide, SplideProps, SplideSlide } from '@splidejs/react-splide';
import Image from 'next/image';
import { useRouter } from 'next/router';

export const SlpideCard = ({ data }: SlpideCardProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { locale } = useLocale();
  /** navigate func */
  const handleNavigateFill = () => {
    dispatch(setAppFilter({
      activities: [data.activityId]
    }));
    router.push({
      pathname: `/${pathPage.result}/all`,
      query: `activities=${data.activityId}`,
    });
  };
  return (
    <div
      onClick={handleNavigateFill}
      className="relative rounded-lg h-[270px] overflow-hidden scalePackages"
    >
      <Image
        alt={'gallery'}
        className="w-full !h-full object-cover cursor-pointer "
        width={0}
        height={0}
        src={data?.media ? getImagePath(data?.media) : EmptyImage}
      />
      <div className="absolute bottom-0 bg-gradient-to-t from-PrimaryBlack w-full h-1/2 flex items-end justify-center pb-4 hoverOverlay">
        <p className="text-PrimaryWhite text-xl leading-[26px] font-medium !font-[Lora] text-center cursor-pointer">
          {data?.extendedData?.title
            ? data?.extendedData?.title?.[locale] || data?.extendedData?.title?.en
            : data?.title || ''}
        </p>
      </div>
    </div>
  );
};

export const SlideOption: SplideProps = {
  options: {
    rewind: false,
    gap: '1.5rem',
    perPage: 6,
    perMove: 1,
    pagination: false,
    lazyLoad: true,
    drag: 'free',
    breakpoints: {
      640: {
        perPage: 2,
        arrows: false,
      },
      768: {
        perPage: 4,
        arrows: false,
      },
      1024: {
        perPage: 4,
      },
    },
  },
};
const HolidayPackages = ({ activitiesPackage }: HolidaysSection) => {
  return (
    <div className="holiday">
      {activitiesPackage && (
        <Splide aria-label="holiday slide" {...SlideOption}>
          {activitiesPackage?.map((splide) => (
            <SplideSlide key={splide.activityId} className="cursor-pointer">
              <SlpideCard data={splide} />
            </SplideSlide>
          ))}
        </Splide>
      )}
    </div>
  );
};

export default HolidayPackages;
