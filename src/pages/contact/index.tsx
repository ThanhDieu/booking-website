import { NextSheetWidthLayout } from '@/types/layoutType';
import React, { useEffect, useState } from 'react';
import { GetStaticPropsContext } from 'next';
import MainLayout from '@/layouts/MainLayout';
import ContactPage from '@/components/Contact';
import strapiRequester from '@/clientApi/requester/strapiRequester';
import { useTranslation } from '@m0-0a/next-intl';
import { changeLanguague } from '@/util/translations';

const Contact: NextSheetWidthLayout = (props: any) => {
  const { data, contactKey } = props;

  // const [contactData, setContactData] = useState<any>(props.data);
  const { t } = useTranslation();
  // const translatedAttributes = t('contactPage');

  // useEffect(() => {
  //   if (props?.data) {
  //     const original = JSON.parse(JSON.stringify(props?.data));
  //     changeLanguague(original, translatedAttributes);
  //     setContactData(original);
  //   }
  // }, [props, translatedAttributes]);
  return <ContactPage data={data} contactKey={contactKey} />;
};

Contact.Layout = MainLayout;

export default Contact;

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const res = await strapiRequester.fetchPages();
  const contactProps = res.data.data
    .filter((ele: typeof res.data.data) => ele.attributes.slug === 'contact')
    ?.map((i: any) => i.attributes)[0];
  const contactKey = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API}/api/settings/1?populate=deep`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
        'Content-Type': 'application/json',
      },
    }
  )
    .then((res) => res.json())
    .catch(() => {
      //
    });
  const eeee = contactKey.data.attributes.entries;
  return {
    props: {
      data: contactProps,
      contactKey: eeee,
    },
    revalidate: 60,
  };
};
