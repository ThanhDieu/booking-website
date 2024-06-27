/* eslint-disable react-hooks/exhaustive-deps */
import requesterAxios from '@/clientApi/requester';
import strapiPropertiesService from '@/clientApi/requester/strapiServices/properties';
import strapiTopicsService from '@/clientApi/requester/strapiServices/topics';
import { contactData } from '@/components/Hotel/partials/AboutSection';
import { defaultParamsSearch } from '@/constants/bundleConst';
import MainLayout from '@/layouts/MainLayout';
import { BundleService } from '@/service/bundleService';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setSearchValue } from '@/store/slice/bundleSearchSlice';
import { ImageDataType, MediaLink } from '@/types/propertyType.ts/propertyType';
import { deepFieldObjStarpi } from '@/util/object';
import { searchParamsFc } from '@/util/searchParams';
import { useLocale } from '@m0-0a/next-intl';
import { GetStaticPaths, GetStaticPathsContext, GetStaticProps, GetStaticPropsContext } from 'next';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import View from '../../../components/TopicProperty/View';

interface Topic {
  title: string;
  subTitle: string;
  titleIcon: {
    data: ImageDataType[];
  };
  hero: any;
  menu: {
    link: {
      link: string;
      title: string;
    }[];
    buttonText: string;
  };
  hotelsSection: MediaLink;
  highlightSection: MediaLink;
  bundleSection: MediaLink;
  countryCode?: string;
}

export interface TopicPropertyModel {
  slug: string;
  hotelId: string;
  topicData: {
    attributes: Topic;
  }[];
  topicPropertyList: {
    data: {
      attributes: any;
    }
  }[]
  topicPropertyData: {
    attributes: any;
  }[];
  propertyContact: {
    ratings: number,
    contactInfo: contactData[]
  };
  topicHighlightData: {
    attributes: any;
  }[];
  topicHostData: {
    attributes: any;
  }[];
  bundleList?: any[];
  activityId: string;
}

interface TopicPropertyProps {
  data: TopicPropertyModel;
}

const TopicPropertyPage = (props: TopicPropertyProps) => {
  const searchParams = useSearchParams();
  const { locale } = useLocale();
  const dispatch = useAppDispatch();
  const [bundleList, setBundleList] = useState<any[]>([]);
  const countryCode = props.data?.topicPropertyData && props.data?.topicPropertyData[0]?.attributes?.property?.data?.attributes?.location?.countryCode || "DE";
  const { searchValue } = useAppSelector((state) => state.bundleSlice);

  useEffect(() => {
    if (countryCode) {
      // const viewHotelId = router?.asPath?.includes(`#${pathPage.viewHotels}`)
      const params = searchParamsFc(searchParams, {
        ...defaultParamsSearch,
        countryCode,
        propertyId: props?.data?.hotelId,
        mainActivity: props?.data?.activityId
      });
      dispatch(setSearchValue(params))
      // router.replace(`/${pathPage.topic}/${props.data.slug}/${props.data.hotelId}?${querySearchParams(params)}${viewHotelId ? `#${pathPage.viewHotels}` : ''}`);
    }

  }, [props?.data?.hotelId, props?.data?.activityId, countryCode]);


  const fetchBundleData = useCallback(async () => {
    if (searchValue?.propertyId && searchValue?.mainActivity) {
      try {
        const params = searchParamsFc(searchParams, searchValue)
        const res = await BundleService.searchBundles({ ...params, timezone: Intl.DateTimeFormat().resolvedOptions().timeZone });

        if (res?.data?.length && res.data[0]?.isNearby === false) {
          setBundleList(res.data[0].data);

        }
      } catch (err) { }
    }
  }, [searchValue?.propertyId, searchValue?.mainActivity]);

  useEffect(() => {
    setBundleList([]);
    fetchBundleData();
  }, [searchValue?.propertyId, searchValue?.mainActivity]);

  // translate the content base on strapi

  const [translatedTopicData, setTranslatedTopicData] = useState(props?.data?.topicData);
  const [translatedTopicPropertyData, setTranslatedTopicPropertyData] = useState(props?.data?.topicPropertyData);
  const [translatedTopicHighlightData, setTranslatedTopicHighlightData] = useState(props?.data?.topicHighlightData);
  const [translatedTopicHostData, setTranslatedTopicHostData] = useState(props?.data?.topicHostData);

  useEffect(() => {
    const slug = props?.data?.slug
    const hotelId = props?.data?.hotelId
    if (locale) {
      strapiTopicsService.getTopics(slug, locale).then((res) => {
        if (res?.data?.length) {
          setTranslatedTopicData(res.data);
        }
      }).catch(() => { });

      strapiTopicsService.getTopicProperties(slug, locale).then((res) => {
        if (res?.data?.length) {
          const topicPropertyData = res?.data?.filter((property: any) => property.attributes?.property?.data?.attributes?.code === hotelId);
          if (topicPropertyData.length) {
            setTranslatedTopicPropertyData(topicPropertyData);
          }
        }
      }).catch(() => { });

      strapiTopicsService.getTopicHighlights(slug, hotelId, locale).then((res) => {
        if (res?.data?.length) {
          setTranslatedTopicHighlightData(res.data);
        }
      }).catch(() => { });

      strapiTopicsService.getTopicHosts(slug, hotelId, locale).then((res) => {
        if (res?.data?.length) {
          setTranslatedTopicHostData(res.data);
        }
      }).catch(() => { });

    }
  }, [locale, props?.data?.slug, props?.data?.hotelId]);
  return <View
    model={{
      topicData: translatedTopicData,
      topicPropertyData: translatedTopicPropertyData,
      topicHighlightData: translatedTopicHighlightData,
      topicHostData: translatedTopicHostData,
      slug: props?.data?.slug,
      hotelId: props?.data?.hotelId,
      topicPropertyList: props?.data?.topicPropertyList,
      propertyContact: props?.data?.propertyContact,
      activityId: props?.data?.activityId,
      bundleList
    }} />;
};

TopicPropertyPage.Layout = MainLayout;

export default TopicPropertyPage;

export const getStaticPaths: GetStaticPaths = async (context: GetStaticPathsContext) => {
  const res = await strapiTopicsService.getTopicProperties();
  let topicProperty: Array<any> = [];

  res?.data?.forEach((item: any) => {
    const topicData = deepFieldObjStarpi(item?.attributes?.topic)
    const topicActivityData = deepFieldObjStarpi(topicData?.activity);
    const propertyData = deepFieldObjStarpi(item?.attributes?.property);

    if (topicActivityData?.slug && propertyData?.code) {
      const path = {
        params: {
          slug: topicActivityData?.slug,
          hotelId: propertyData?.code
        }
      };
      topicProperty.push(path);
    }
  });
  return {
    paths: topicProperty,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {

  const slug = context?.params?.slug;
  const hotelId = context?.params?.hotelId;
  const topicData = (await strapiTopicsService.getTopics(slug as string))?.data;
  const topicPropertyList = (await strapiTopicsService.getTopicProperties(slug as string))?.data;
  const topicHighlightData = (await strapiTopicsService.getTopicHighlights(slug as string, hotelId as string))?.data;
  const topicHostData = (await strapiTopicsService.getTopicHosts(slug as string, hotelId as string))?.data;

  const activities = (await requesterAxios.getActivities())?.data[0].data;
  const { activityId } = activities && activities.find((activity: any) => activity.code === slug) || {};

  // hotel contact info is available in property-page
  let contactInfo = [];
  const propertyPageData = (await strapiPropertiesService.getPropertyPages(hotelId as string))?.data;
  const propertyAbout = propertyPageData && propertyPageData[0]?.attributes?.about;
  if (propertyAbout?.contactInfo) {
    contactInfo = propertyAbout.contactInfo;
  }

  try {
    return {
      props: {
        data: {
          slug,
          activityId,
          hotelId,
          topicData,
          topicPropertyList: topicPropertyList.map((property: any) => property.attributes?.property),
          topicPropertyData: topicPropertyList?.filter((property: any) => property.attributes?.property?.data?.attributes?.code === hotelId),
          propertyContact: {
            ratings: 4,
            contactInfo
          },
          topicHighlightData,
          topicHostData,
        },
      },
    };
  } catch (err) {
    return {
      notFound: true,
    };
  }
};
