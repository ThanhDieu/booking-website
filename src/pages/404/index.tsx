import { NextSheetWidthLayout } from '@/types/layoutType';
import React from 'react';
import { GetStaticPropsContext } from 'next';
import Error from '@/components/Error/Error';
import ErrorLayout from '@/layouts/ErrorLayout';
import SubscriptionBanner from '@/components/Error/SubscriptionBanner';

const ErrorPage: NextSheetWidthLayout = () => {
  return (
    <>
      <Error />
      <SubscriptionBanner />
    </>
  );
};

ErrorPage.Layout = ErrorLayout;

export default ErrorPage;

export const getStaticProps = async (context: GetStaticPropsContext) => {
  return {
    props: {},
    revalidate: 60,
  };
};
