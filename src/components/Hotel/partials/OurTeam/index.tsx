import React from 'react';
import OurTeamCard, { OurTeamCardProps } from './OurTeamCard';
import { Splide, SplideSlide, SplideProps } from '@splidejs/react-splide';
import RenderSectionHeader from '../SectionHeader';
import clsx from 'clsx';
import styles from '../../Hotel.module.scss';
import { Wrapper } from '@/components/global/Wrapper';

const mergeFc = (data: any) => {
  const formatData: any = [];
  data
    ?.reduce((accumulator: any, currentValue: any, currentIndex: any, array: any) => {
      if (currentIndex % 2 === 0) {
        accumulator.push(array.slice(currentIndex, currentIndex + 2));
      }
      return accumulator;
    }, [])
    .forEach((p: any) => formatData.push([p[0], p[1]]));
  return formatData;
};
interface IProps {
  title: string;
  icon: string;
  memberCards: OurTeamCardProps[];
}

const SlideOption: SplideProps = {
  options: {
    rewind: false,
    perPage: 3,
    gap: '3rem',
    perMove: 1,
    pagination: false,
    lazyLoad: true,
    drag: 'free',
    breakpoints: {
      1280: {
        perPage: 2,
        gap: '1rem',
        arrows: false,
      },
      1024: {
        perPage: 1,
        gap: '1rem',
        arrows: false,
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
      425: {
        perPage: 1,
        gap: '1rem',
        arrows: false,
      },
    },
  },
};

const OurTeamSlider = ({ title, icon, memberCards }: IProps) => {
  const formattedDataCard = mergeFc(memberCards);
  return (
      <Wrapper id="hosts" className={clsx(styles.scrollMarginTop,'holiday')}>
        {title ? <RenderSectionHeader title={title} icon={icon} /> : <div></div>}
        {memberCards && memberCards.length ? (
          <Splide aria-label="member slide" {...SlideOption}>
            {formattedDataCard?.map((member: any[], idx: number) => (
              <SplideSlide key={member[0].id} className="cursor-grab">
                <div className="flex flex-col gap-y-4 lg:gap-y-8 w-fit" key={member[0].id}>
                  {member[0] && (
                    <OurTeamCard key={member[0].id} {...member[0]} />)}
                  {member[1] && (
                    <OurTeamCard key={member[1]?.length > 0 && member[1].id} {...member[1]} />
                  )}
                </div>
              </SplideSlide>
            ))}
          </Splide>
        ) : (
          <div className='hidden'></div>
        )}
      </Wrapper>
  );
};

export default OurTeamSlider;
