import { NextSheetWidthLayout } from '@/types/layoutType';
import React, { useEffect } from 'react';
import { GetStaticPropsContext } from 'next';
import MainLayout from '@/layouts/MainLayout';
import ThankYouPage from '@/components/ThankYouPage';
import { useAppDispatch } from '@/store/hooks';
import { resetPaidSlice } from '@/store/slice/paidSlice';
import { resetFoliosSlice } from '@/store/slice/foliosSlice';
import { resetInvoiceSlice } from '@/store/slice/invoceSlice';
import { resetBookingSlice } from '@/store/slice/bookingSlice';

const ThankYou: NextSheetWidthLayout = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(resetPaidSlice());
    dispatch(resetFoliosSlice());
    // dispatch(resetInvoiceSlice());
  }, [])

  return (
    <div className="py-12">
      <ThankYouPage />
    </div>
  );
};

ThankYou.Layout = MainLayout;

export default ThankYou;

export const getStaticProps = async (context: GetStaticPropsContext) => {
  return {
    props: {},
    revalidate: 60,
  };
};
