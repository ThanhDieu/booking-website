import { NextSheetWidthLayout } from '@/types/layoutType';
import React from 'react';
import { GetStaticPropsContext } from 'next';
import MainLayout from '@/layouts/MainLayout';
import YourBooking from '@/components/Account/partials/Booking';
import { Wrapper } from '@/components';

const BookingHistory: NextSheetWidthLayout = () => {
  return (
    <div className="pt-[72px]">
      <Wrapper>
        <YourBooking />
      </Wrapper>
    </div>
  );
};

BookingHistory.Layout = MainLayout;

export default BookingHistory;

export const getStaticProps = async (context: GetStaticPropsContext) => {
  return {
    props: {},
    revalidate: 60,
  };
};
