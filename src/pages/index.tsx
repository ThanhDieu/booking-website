/* eslint-disable react-hooks/exhaustive-deps */
import requesterAxios from '@/clientApi/requester';
import strapiRequester from '@/clientApi/requester/strapiRequester';
import Home from '@/components/HomePage';
import SEOComponent from '@/components/global/SEO';
import MainLayout from '@/layouts/MainLayout';
import { BundleService } from '@/service/bundleService';
import { ActivityService } from '@/service/inventoryService';
import { useAppDispatch } from '@/store/hooks';
import { resetBookingSlice } from '@/store/slice/bookingSlice';
import { resetInvoiceSlice } from '@/store/slice/invoceSlice';
import { resetPaidSlice } from '@/store/slice/paidSlice';
import { BundleType } from '@/types/bundle/bundleType';
import { NextSheetWidthLayout } from '@/types/layoutType';
import { changeLanguague } from '@/util/translations';
import { useTranslation } from '@m0-0a/next-intl';
import { useEffect, useState } from 'react';

const HomePage: NextSheetWidthLayout = (data: any) => {
  const [attributes, setAttributes] = useState(data?.data.attributes);
  const [activities, setActivities] = useState(data?.activities);
  const [homeBundles, setHomeBundles] = useState<BundleType[]>([]);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const translatedAttributes = t('frontPage');
  useEffect(() => {
    dispatch(resetPaidSlice());
    dispatch(resetInvoiceSlice());
    dispatch(resetBookingSlice());

    (async () => {
      try {
        const res = await ActivityService.getAllActivities();
        setActivities(res.data[0].data)
      } catch (err) {
        
      }
    })()

  }, []);



  useEffect(() => {
    if (data?.data.attributes) {
      const original = JSON.parse(JSON.stringify(data?.data.attributes));
      changeLanguague(original, translatedAttributes);
      setAttributes(original);
    }
  }, [data, translatedAttributes]);

  useEffect(() => {
    (async () => {
      try {
        const res = await BundleService.loadBundles({ isHomePage: true });
        setHomeBundles(res?.data);
      } catch (err) { }
    })();
  }, []);

  return (
    <>
      <SEOComponent data={{seo: attributes.seo}} />
      <Home activitiesPackage={activities} attributes={attributes} homeBundles={homeBundles} />
    </>
  );
};

HomePage.Layout = MainLayout;

export default HomePage;

export const getStaticProps = async () => {
  try {
    const { data } = await strapiRequester.fetchFrontPage();
    const activities = await requesterAxios.getActivities();
    return {
      props: { data, activities: activities?.data[0].data },
      revalidate: 60,
    };
  } catch (error) {
    return {
      props: { data: {} },
      revalidate: 60,
    };
  }
};
