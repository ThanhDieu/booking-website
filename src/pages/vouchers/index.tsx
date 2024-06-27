import React, { useEffect, useState } from 'react';
import { GetStaticPropsContext } from 'next';
import CouponLayout from '@/layouts/CouponLayout';
import strapiRequester from '@/clientApi/requester/strapiRequester';
import { ImageType } from '@/types/base';
import { VoucherProps } from '@/components/Vouchers/partials/Voucher';
import View from '@/components/Vouchers/Home/View';
import { SEO } from '@/components/global/SEO/type';
import { useLocale } from '@m0-0a/next-intl';

interface HeroBannerProps {
  description: string;
  title: string;
  subTitle: string;
  image: ImageType;
}

export interface VouchersPageProps {
  heroBanner: HeroBannerProps;
  vouchers: VoucherProps[];
  seo: SEO
}

const CouponsPage = (props: { data: VouchersPageProps }) => {
  const locale = useLocale()
  const [voucherTranslate, setVoucherTranslate] = useState(props?.data);
  useEffect(() => {
    if (locale) {
      (async () => {
        try{
          const res = await strapiRequester.fetchVoucherPage(locale?.locale);
          if(res?.status === 200) {
            const {attributes} = res?.data?.data;
            const dataFormat = {
              heroBanner: attributes?.heroBanner,
              vouchers: attributes?.vouchers,
              seo: attributes?.seo}
            setVoucherTranslate(dataFormat)
          }
        } catch (error) {
        //  ?emty
        }
      })()
    }
  }, [locale?.locale]);

  return <View model={voucherTranslate|| props.data} />;
};

CouponsPage.Layout = CouponLayout;

export default CouponsPage;

export const getStaticProps = async (context: GetStaticPropsContext) => {
  try{
    const { data } = await strapiRequester.fetchVoucherPage();
    const { heroBanner, vouchers, seo } = data?.data?.attributes || {};
    return {
      props: {
        data: {
          heroBanner,
          vouchers,
          seo
        },
      },
      revalidate: 60,
    };
  } catch (error) {
    return{
      props: {
        data: {},
      },
      revalidate: 60,
    }
  }
};
