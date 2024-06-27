import Headlines from '@/components/global/Headlines';
import { Wrapper } from '@/components/global/Wrapper';
import { HolidaysSection } from '@/types/homePage';
import React from 'react';
import HolidayPackages from './HolidayPackages';
import ViewSlide from './ViewSlide';

const HolidaySection = ({ title, subtitle, activitiesPackage, homeBundles }: HolidaysSection) => {
  return (
    <div className="bg-primary-switch">
      <Wrapper id={'section1'}>
        <Headlines title={title} subtitle={subtitle} />
        <HolidayPackages activitiesPackage={activitiesPackage} />
        {homeBundles?.length ? <ViewSlide homeBundles={homeBundles} /> : ''}
      </Wrapper>
    </div>
  );
};

export default HolidaySection;
