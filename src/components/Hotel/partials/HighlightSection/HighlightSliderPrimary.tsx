import clsx from 'clsx';
import Image from 'next/image';
import styles from '../../Hotel.module.scss';
import { Splide, SplideProps, SplideSlide } from '@splidejs/react-splide';
import { ImageType } from '@/types/propertyType.ts/propertyType';
import EnvVariable, { EmptyImage } from '@/constants/imageUrl';
import getImagePath from '@/util/getImagePath';

export interface PrimaryContentType {
  title: string;
  media: ImageType;
}
interface IProps {
  cardContent: PrimaryContentType[];
}

const RenderHighlightPrimaryCard = (content: PrimaryContentType) => {
  const imgSrc = content.media.data?.attributes?.url;

  return (
    <div className="h-[350px] lg:h-[400px] overflow-hidden rounded-xl relative scalePackages">
      <Image
        alt={'gallery'}
        className="w-full h-full object-cover"
        unoptimized
        width={0}
        height={0}
        src={imgSrc ? getImagePath(imgSrc) : EmptyImage}
      />
      <div className="absolute bottom-1 px-[25px] pb-[25px] flex justify-between w-full">
        <h2 className={clsx(styles.highlightTitle, 'text-PrimaryWhite font-[lora]')}>
          {content.title}
        </h2>
      </div>
    </div>
  );
};

const slideOption: SplideProps = {
  options: {
    rewind: true,
    loop: false,
    perPage: 2,
    gap: '3.125rem',
    perMove: 1,
    pagination: false,
    lazyLoad: true,
    drag: 'free',
    breakpoints: {
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

const HighlightSliderPrimary = ({ cardContent = [] }: IProps) => {
  return (
    <div className="rooms holiday">
      <Splide {...slideOption}>
        {cardContent?.map((splide, index) => (
          <SplideSlide key={index} className="cursor-grab">
            <RenderHighlightPrimaryCard {...splide} />
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

export default HighlightSliderPrimary;
