import { NextSheetWidthLayout } from '@/types/layoutType';
import React, { useEffect, useState } from 'react';
import { GetStaticPropsContext } from 'next';
import MainLayout from '@/layouts/MainLayout';
import AboutPage from '@/components/AboutUs';
import strapiRequester from '@/clientApi/requester/strapiRequester';
import { useTranslation } from '@m0-0a/next-intl';
import { changeLanguague } from '@/util/translations';

const About: NextSheetWidthLayout = (data: any) => {
  const [attributes, setAttributes] = useState(data?.data.attributes);
  const { t } = useTranslation();
  const translatedData = t('aboutPage');
  useEffect(() => {
    if (data.data.attributes) {
      const original = JSON.parse(JSON.stringify(data?.data.attributes));
      changeLanguague(original, translatedData);
      setAttributes(original);
    }
  }, [data, translatedData]);

  return <AboutPage attributes={attributes} />;
};

About.Layout = MainLayout;

export default About;

export const getStaticProps = async (context: GetStaticPropsContext) => {
  try {
    const { data } = await strapiRequester.fetchAboutPage();

    return {
      props: { data },
      revalidate: 60,
    };
  } catch (error) {
    return {
      props: { data: {} },
      revalidate: 60,
    };
  }
};
