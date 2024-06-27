import React from 'react';
import { Splide, SplideSlide, SplideProps } from '@splidejs/react-splide';
import HistoryCard, { HistoryCardType } from './HistoryCard';
import RenderSectionHeader from '../SectionHeader';
import styles from '../../Hotel.module.scss';
import clsx from 'clsx';
import { Wrapper } from '@/components/global/Wrapper';

interface HistorySectionProps {
  title: string;
  icon: string;
  text: string;
  entries: HistoryCardType[];
}

const SlideOption: SplideProps = {
  options: {
    rewind: false,
    perPage: 4,
    gap: '1.5rem',
    perMove: 1,
    pagination: false,
    lazyLoad: true,
    drag: 'free',
    breakpoints: {
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

const HistorySection = ({ title, icon, text, entries = [] }: HistorySectionProps) => {
  return (
      <Wrapper id="history" className={clsx(styles.scrollMarginTop, 'holiday')}>
        <RenderSectionHeader title={title} desc={text} icon={icon} />
        <div className="holiday pt-6">
          <Splide aria-label="holiday slide" {...SlideOption}>
            {entries?.map((item) => (
              <SplideSlide key={item.id} className="cursor-grab">
                <HistoryCard {...item} />
              </SplideSlide>
            ))}
          </Splide>
        </div>
      </Wrapper>
  );
};

export default HistorySection;
