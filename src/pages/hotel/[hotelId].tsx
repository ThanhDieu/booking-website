/* eslint-disable react-hooks/exhaustive-deps */
import strapiPropertiesService from '@/clientApi/requester/strapiServices/properties';
import HotelFeature from '@/components/Hotel';
import { defaultParamsSearch } from '@/constants/bundleConst';
import MainLayout from '@/layouts/MainLayout';
import { BundleService } from '@/service/bundleService';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setSearchValue } from '@/store/slice/bundleSearchSlice';
import { BundleType } from '@/types/bundle/bundleType';
import { NextSheetWidthLayout } from '@/types/layoutType';
import { searchParamsFc } from '@/util/searchParams';
import { changeLanguague } from '@/util/translations';
import { useTranslation } from '@m0-0a/next-intl';
import { GetStaticPaths, GetStaticPathsContext, GetStaticProps, GetStaticPropsContext } from 'next';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const HotelDetailPage: NextSheetWidthLayout = (props: any) => {
  const [data, setData] = useState(props.data);
  const [fetchBundleData, setFetchBundleData] = useState<BundleType[]>([]);
  const searchParams = useSearchParams();
  // const [countryCode, setCountryCode] = useState<string>('');
  const { t } = useTranslation();
  const translatedData = t(props.hotelId || '');
  const dispatch = useAppDispatch();
  const countryCode = data?.attributes?.property
    && data?.attributes?.property?.data?.attributes?.location?.countryCode || "DE";

  useEffect(() => {
    if (props.data && translatedData) {
      const original = JSON.parse(JSON.stringify(props.data));
      changeLanguague(original, translatedData);
      setData(original);
    }
  }, [props.data, translatedData]);

  useEffect(() => {
    if (countryCode) {
      const params = searchParamsFc(searchParams, {
        ...defaultParamsSearch,
        countryCode,
        propertyId: props.hotelId,
      });
      dispatch(setSearchValue(params))
      // router.replace(`/${pathPage.hotel}/${props.hotelId}?${querySearchParams(params)}`);
    }
  }, [countryCode, props.hotelId]);
  //** Start get bundles by propertyId in hotelpage **//
  useEffect(() => {
    (async () => {
      try {
        const res = await BundleService.searchBundles({
          ...defaultParamsSearch,
          isHotelPage: true,
          propertyId: props.hotelId,
        });
        if (res?.data?.length > 0 && !res.data[0].isNearby) {
          setFetchBundleData(res.data[0].data);
        } else {
          setFetchBundleData([]);
        }
      } catch (err) { }
    })();
  }, [props.hotelId]);
  //** End get bundles by propertyId in hotelpage **//

  return (
    <>
      <HotelFeature data={data} bundleData={fetchBundleData} />
    </>
  );
};

HotelDetailPage.Layout = MainLayout;

export default HotelDetailPage;

export const getStaticPaths: GetStaticPaths = async (context: GetStaticPathsContext) => {
  const res = await strapiPropertiesService.getProperties();

  const paths = res.data?.map((ele: any) => ({ params: { hotelId: ele.attributes.code } }));

  let availableHotel: Array<any> = [];

  async function getAvailableHotel() {
    for (const path of paths) {
      const { data } = await strapiPropertiesService.getPropertyPages(path.params.hotelId as string, undefined, 'true');
      if (data.length) {
        availableHotel.push(path);
      }
    }
  }
  await getAvailableHotel();

  return {
    paths: availableHotel,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
  const hotelId = context?.params?.hotelId;
  const { data } = await strapiPropertiesService.getPropertyPages(hotelId as string);
  const iqCheckIds = {};
  const iqCheckData = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API}/api/settings?filters${encodeURIComponent(
      '[name][$eq]'
    )}=iqcheck&populate=deep`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
        'Content-Type': 'application/json',
      },
    }
  ).then((res) => res.json()).catch(() => {
    //
  });

  iqCheckData?.data?.length &&
    iqCheckData?.data[0].attributes?.entries?.forEach((entry: { name: string; value: string }) => {
      // @ts-ignore
      iqCheckIds[entry.name] = entry.value;
    });

  let updatedData = data[0];
  if (hotelId) {
    // @ts-ignore
    updatedData = { ...updatedData, iqCheckId: iqCheckIds[String(hotelId)] || '' };
  }

  try {
    return {
      props: { data: updatedData, hotelId },
    };
  } catch (err) {
    return {
      props: { data: [] },
    };
  }
};
