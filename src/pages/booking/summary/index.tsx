import MainLayout from '@/layouts/MainLayout';
import { NextSheetWidthLayout } from '@/types/layoutType';
import React, { Fragment } from 'react';
import ConfirmationPageProps from '@/types/ComfirmationPage';
import { GetStaticPropsContext } from 'next';
import Confirmation from '@/components/Confirmation';

const ConfirmationPage: NextSheetWidthLayout = (props: ConfirmationPageProps) => {
  return (
    <div>
      <Confirmation />
    </div>
  );
};

ConfirmationPage.Layout = MainLayout;

export default ConfirmationPage;

export const getStaticProps = async (context: GetStaticPropsContext) => {
  return {
    props: {},
    revalidate: 60,
  };
};
