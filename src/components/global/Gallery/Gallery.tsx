import { EmptyImage } from '@/constants/imageUrl';
import getImagePath from '@/util/getImagePath';
import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';
import { Splide, SplideProps, SplideSlide } from '@splidejs/react-splide';

interface GalleryProps {
  gallery: { data: [{ attributes: { url: string } }] };
  className?:string;
}

const SlideOption: SplideProps = {
  options: {
    autoplay:true,
    rewind: false,
    perPage: 6,
    perMove: 1,
    pagination: false,
    drag: 'free',
    arrows: false,
    breakpoints: {
      640: {
        perPage: 2,
        arrows: false,
      },
      768: {
        perPage: 3,
        arrows: false,
      },
      1024: {
        perPage: 4,
      },
    },
  },
};

const Gallery = ({ gallery, className }: GalleryProps) => {
  return (
      gallery 
      ? (<div className={clsx('bg-secondary-switch flex flex-row items-center lg:pt-12 pt-4 ', className ? className : '')} id="gallery">
          <Splide aria-label="gallery slide" {...SlideOption}>
           {(gallery && gallery?.data?.length > 0)
             ? gallery?.data?.map((item, index) => (
               <SplideSlide className="cursor-pointer" key={`${index}${item?.attributes?.url}`}>
               <Image
               key={`image_${index}`}
               alt={'gallery'}
               className="h-full w-full object-cover"
               unoptimized
                width={0}
                height={0}
                src={item?.attributes ? getImagePath(item?.attributes?.url) : EmptyImage}/>
                </SplideSlide>
                )) 
              : ''}
           </Splide>
         </div>)
    : <div className='hidden'></div>
  );
};

export default Gallery;
