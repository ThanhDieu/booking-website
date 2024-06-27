import Image from 'next/image';
import { Splide, SplideProps, SplideSlide } from '@splidejs/react-splide';
import DiningFooter from './DiningFooter';
import { SlideType } from './types';
import { EmptyImage } from '@/constants/imageUrl';
import getImagePath from '@/util/getImagePath';

interface IProps {
  cardContent?: SlideType[];
}

const RenderDiningSliderCard = ({ title, text, icon, link, items }: SlideType) => {
  return (
    <div className="overflow-hidden rounded-xl bg-primary-switch h-full">
      <div className="h-[320px] lg:h-[400px] overflow-hidden">
        <Image
          alt={'gallery'}
          className="w-full h-full object-cover scaleImage"
          unoptimized
          width={5}
          height={5}
          src={
            icon?.data?.attributes?.formats?.medium?.url
              ? getImagePath(icon?.data?.attributes?.formats?.medium?.url) ||
              getImagePath(icon?.data?.attributes?.url)
              : EmptyImage
          }
        />
      </div>
      <DiningFooter
        link={link}
        title={title || ''}
        desc={text || ''}
        items={items}
      />
    </div>
  );
};

const slideOption: SplideProps = {
  options: {
    rewind: true,
    perPage: 2,
    gap: '3.125rem',
    perMove: 1,
    pagination: false,
    lazyLoad: true,
    drag: 'free',
    breakpoints: {
      1024: {
        perPage: 2,
        gap: '1rem',
      },
      768: {
        perPage: 1,
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

const DiningSlide = ({ cardContent }: IProps) => {
  return (
    <div className="rooms holiday">
      <Splide {...slideOption}>
        {cardContent?.map((splide, index) => (
          <SplideSlide key={index} className="cursor-grab">
            <RenderDiningSliderCard {...splide} />
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

export default DiningSlide;
