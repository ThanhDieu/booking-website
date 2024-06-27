import { NextSheetWidthLayout } from '@/types/layoutType';
import React from 'react';
import { GetStaticPropsContext } from 'next';
import MainLayout from '@/layouts/MainLayout';
import CreateBooking from '@/components/CreateBooking/CreateBooking';


const PaymentPage: NextSheetWidthLayout = () => {
  return <CreateBooking />;
};


PaymentPage.Layout = MainLayout;

export default PaymentPage;

export const getStaticProps = async (context: GetStaticPropsContext) => {
  return {
    props: {},
    revalidate: 60,
  };
};
