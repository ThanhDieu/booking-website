/* eslint-disable react-hooks/exhaustive-deps */
import { ErrorLayoutProps } from '@/types/layoutType';
import React, { useEffect, useRef, useState } from 'react';
import Header from './Header';
import strapiRequester from '@/clientApi/requester/strapiRequester';
import Footer from './Footer';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { EmptyImage } from '@/constants/imageUrl';
import getImagePath from '@/util/getImagePath';
import clsx from 'clsx';
import {
  asyncThunkFetchProfile,
  thunkFetchActivitiesHistory,
  thunkFetchHistoryBooking,
} from '@/store/slice/userSlice';
import moment from 'moment';
import { changeLanguague } from '@/util/translations';
import { setMedia, thunkFetchLocation, thunkGetAllBundle } from '@/store/slice/commonSlice';
import { useRouter } from 'next/router';
import { useLocale, useTranslation } from '@m0-0a/next-intl';
import xPathList from 'i18n/xTranslationList.json';

const ErrorLayout = ({ children }: ErrorLayoutProps) => {
  const { profile } = useAppSelector((state) => state.userSlice);
  const { bundleList } = useAppSelector((state) => state.commonSlice);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isHotelPage = router.asPath.includes('/hotel/');
  const isHomePage = router.asPath === '/' || /^(\/#(?!contact\/#|account\/#|booking-history\/#))/i.test(router.asPath);
  const isAboutPage = router.asPath.includes('/about/');
  const isErrorPage = router.asPath.includes('errors');
  const isAccountPage = router.asPath.includes('/account');
  const isContactPage = router.asPath.includes('/contact');
  const [mainMenu, setMainMenu] = useState<any>({});
  const { t } = useTranslation();
  const translatedAttributes = t('frontPage');
  const { locale, setLocale } = useLocale();
  useEffect(() => {
    const checkToken = localStorage.getItem('access-token');
    if (checkToken) {
      if (checkToken == 'undefined') {
        localStorage.removeItem('access-token');
      }
      const checkTokenExpires = localStorage.getItem('token-expires-in');
      if (checkTokenExpires == 'undefined') {
        localStorage.removeItem('token-expires-in');
      }
    }

    /** dispatch fetch location country */
    dispatch(thunkFetchLocation());
    /** fetch all bundle */
    if (!bundleList || bundleList?.length == 0) {
      dispatch(thunkGetAllBundle({}));
    }

    const exprires_time = localStorage.getItem('token-expires-in');

    if (Number(exprires_time) < moment().unix()) {
      localStorage.removeItem('access-token');
      localStorage.removeItem('token-expires-in');
    } else {
      const token = localStorage.getItem('access-token');
      if (token) {
        /** dispatch fetch booking history */
        dispatch(thunkFetchHistoryBooking());
        dispatch(thunkFetchActivitiesHistory());
        if (!profile) {
          dispatch(asyncThunkFetchProfile());
        }
      }
    }

    const handleFetchMainMenu = async () => {
      try {
        const response = await strapiRequester.fetchMainMenu(locale);
        if (response.status === 200) {
          // setMainMenu(response.data.data.attributes);
          if (response.data.data.attributes) {
            const origin = JSON.parse(JSON.stringify(response.data.data.attributes));
            changeLanguague(origin, translatedAttributes);
            setMainMenu(origin);
            dispatch(setMedia(response.data.data.attributes.hero?.media));
          }
        }
      } catch (err) {}
    };
    handleFetchMainMenu();
  }, [locale]);

  const layoutRef = useRef(null);

  /** apply translation hot fix. ie. translate by x-path, data is from cms*/
  useEffect(() => {
    if (layoutRef.current) {
      xPathList.forEach((xPath: string) => {
        const xpathResult = document.evaluate(
          xPath,
          layoutRef.current || document,
          null,
          XPathResult.FIRST_ORDERED_NODE_TYPE
        ).singleNodeValue;
        if (xpathResult) {
          xpathResult.textContent = t(xPath);
        }
      });
    }
  }, [router?.asPath, t]);
  return (
    <div ref={layoutRef}>
      <Header
        blackLogo={
          mainMenu.mainMenu
            ? getImagePath(mainMenu?.mainMenu[0]?.icon_black?.data?.attributes?.url)
            : EmptyImage
        }
        whiteLogo={
          mainMenu.mainMenu
            ? getImagePath(mainMenu?.mainMenu[0]?.icon_white?.data?.attributes?.url)
            : EmptyImage
        }
        topHeader={mainMenu?.supHeader}
        menu={mainMenu.mainMenu && mainMenu?.mainMenu[0]?.entries}
        url={mainMenu.mainMenu && mainMenu?.mainMenu[0]?.menu_button.link}
        btnText={mainMenu.mainMenu && mainMenu?.mainMenu[0]?.menu_button.title}
        userIcon={
          mainMenu.mainMenu
            ? getImagePath(mainMenu?.mainMenu[0]?.icon_mobile_open.data.attributes.url)
            : EmptyImage
        }
        userEmail={profile && profile.email}
        userFirstName={profile && profile.firstName}
        userLastName={profile && profile.lastName}
        userAvatar={profile && profile.avatar}
      />

      <div className="pt-28">{children}</div>

      <Footer footerMenu={mainMenu.footerMenu} />
    </div>
  );
};

export default ErrorLayout;
