import { EmptyImage } from '@/constants/imageUrl';
import EnvVariable from '@/constants/imageUrl';
import { GalleryImageType, ImageType } from '@/types/propertyType.ts/propertyType';
import getImagePath from '@/util/getImagePath';
import { Splide, SplideProps, SplideSlide } from '@splidejs/react-splide';
import Image from 'next/image';

export interface IProps {
  galleryCards: GalleryImageType[];
}

const slideOption: SplideProps = {
  options: {
    rewind: false,
    type: 'loop',
    perPage: 4,
    gap: '1rem',
    perMove: 1,
    pagination: false,
    lazyLoad: true,
    drag: 'free',
  },
};

const GallerySlider = ({ galleryCards }: IProps) => {
  return (
    <div className="rooms holiday">
      <Splide {...slideOption}>
        {galleryCards?.map((splide, index) => (
          <SplideSlide key={index} className="cursor-grab">
            <div className="overflow-hidden rounded-xl flex flex-col gap-[15px]">
              <div>
                <Image
                  alt={'gallery'}
                  className="w-full h-full"
                  unoptimized
                  width={0}
                  height={0}
                  src={splide?.media?.data ? getImagePath(splide?.media?.data?.attributes?.url) : EmptyImage}
                />
              </div>
              <div>
                <Image
                  alt={'gallery'}
                  className="w-full h-full"
                  unoptimized
                  width={0}
                  height={0}
                  src={splide?.media?.data ? getImagePath(splide?.media?.data?.attributes?.url) : EmptyImage}
                />
              </div>
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

export default GallerySlider;
