import Headlines from '@/components/global/Headlines';
import { Wrapper } from '@/components/global/Wrapper';
import useSmoothScroll from '@/hooks/useSmoothScroll';
import { HotelHighlightProps } from '@/types/homePage';
import { Splide, SplideProps, SplideSlide } from '@splidejs/react-splide';
import React from 'react';
import NewHighlightCard from '../MapHotels/NewHighlightCard';

export const SlideOption: SplideProps = {
  options: {
    rewind: false,
    perPage: 3,
    gap: '1.5rem',
    perMove: 1,
    pagination: false,
    lazyLoad: true,
    drag: 'free',
    breakpoints: {
      768: {
        perPage: 1,
        arrows: false,
      },
      1024: {
        perPage: 2,
      },
    },
  },
};
const HotelHighlight = ({ highlightHotels }: HotelHighlightProps) => {
  const targetRef = useSmoothScroll('holiday');
  return (
    <Wrapper className="holiday" id="section3">
      <div ref={targetRef}></div>
      <Headlines title={highlightHotels?.title} subtitle={highlightHotels?.subtitle} />
      {highlightHotels && (
        <Splide aria-label="holiday slide" {...SlideOption}>
          {highlightHotels?.highlightItems?.map((hotel) => (
            <SplideSlide key={hotel?.itemTitle}>
              <NewHighlightCard highlightItems={hotel} className="rounded-b-none" />
            </SplideSlide>
          ))}
        </Splide>
      )}
    </Wrapper>
  );
};

export default HotelHighlight;
