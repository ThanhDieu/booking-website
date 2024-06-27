/* eslint-disable react-hooks/exhaustive-deps */
import ReasultOfSearch from '@/components/ResultItem/ResultOfSearch';
import MainLayout from '@/layouts/MainLayout';
import { useAppDispatch } from '@/store/hooks';
import { resetInvoiceSlice } from '@/store/slice/invoceSlice';
import { NextSheetWidthLayout } from '@/types/layoutType';
import { useEffect } from 'react';

const ResultPage: NextSheetWidthLayout = ({ data }: any) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetInvoiceSlice());
  },[])
  return (
    <div>
      <ReasultOfSearch />
    </div>
  );
};

ResultPage.Layout = MainLayout;

export default ResultPage;
