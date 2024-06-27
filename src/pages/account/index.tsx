import { NextSheetWidthLayout } from '@/types/layoutType';
import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import Profile from '@/components/Account/partials/Profile';
import { Wrapper } from '@/components';
import { useAppSelector } from '@/store/hooks';

const AccountPage: NextSheetWidthLayout = () => {
  const { profile } = useAppSelector((state) => state.userSlice);

  return (
    <div className="pt-[72px]">
      <Wrapper className=" min-h-[335px]">
        <Profile profile={profile} />
      </Wrapper>
    </div>
  );
};

AccountPage.Layout = MainLayout;

export const getStaticProps = async () => {
  return {
    props: {},
    revalidate: 60,
  };
};
export default AccountPage;
