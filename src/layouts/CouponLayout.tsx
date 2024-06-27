/* eslint-disable react-hooks/exhaustive-deps */
import { CouponLayoutProps } from '@/types/layoutType';
import React, { useEffect, useState, useMemo } from 'react';
import Header from './Header';
import strapiRequester from '@/clientApi/requester/strapiRequester';
import Footer from './Footer';
import {
  asyncThunkFetchProfile,
  thunkFetchHistoryBooking,
  thunkFetchActivitiesHistory,
} from '@/store/slice/userSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { thunkFetchLocation } from '@/store/slice/commonSlice';
import { TTopicMenu } from './Header';

import { EmptyImage } from '@/constants/imageUrl';
import getImagePath from '@/util/getImagePath';
import { useLocale } from '@m0-0a/next-intl';
import { useAuth } from '@/context/auth/authContext';

const CouponLayout = ({ children }: CouponLayoutProps) => {
  const { locale } = useLocale();
  const { profile } = useAppSelector((state) => state.userSlice);
  const [mainMenuData, setMainMenuData] = useState<any>([]);
  const [topicMenu, setTopicMenu] = useState<TTopicMenu[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(thunkFetchLocation());
  }, []);

  const { user } = useAuth();
  useEffect(() => {
    if (user && user.sessionToken) {
      /** dispatch fetch booking history */
      dispatch(thunkFetchHistoryBooking());
      dispatch(thunkFetchActivitiesHistory());
      if (!profile) {
        dispatch(asyncThunkFetchProfile());
      }
    }
  }, [user]);

  useEffect(() => {
    const handleFetchMainMenu = async () => {
      try {
        const response = await strapiRequester.fetchMainMenu(locale);

        if (response.status === 200) {
          setMainMenuData(response.data.data.attributes);
        }
      } catch (err) {}
    };
    handleFetchMainMenu();
    // fetch topic menu
    (async () => {
      try {
        const property = await strapiRequester.fetchTopicProperty(locale);
        if (property.status === 200) {
          const propertyFormat: TTopicMenu[] = property.data.data.map(
            (ele: typeof property.data.data) => ({
              slug: ele.attributes?.topic?.data?.attributes?.slug,
              propertyId: ele.attributes?.property?.data?.attributes?.code,
              title: ele.attributes?.topic?.data?.attributes?.title,
            })
          );
          // intialize new set
          const slugSet = new Set();
          // filter slug
          const uniquePropertyFormat = propertyFormat.filter((item: TTopicMenu) => {
            if (!slugSet.has(item.slug)) {
              slugSet.add(item.slug);
              return true;
            }
            return false;
          });
          setTopicMenu(uniquePropertyFormat);
        }
      } catch (err) {}
    })();
  }, [locale]);

  const mainMenu = useMemo<any>(() => mainMenuData, [mainMenuData]);

  return (
    <>
      <Header
        topicMenu={topicMenu}
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
        url={mainMenu.mainMenu && mainMenu?.mainMenu[0]?.menu_button?.link}
        btnText={mainMenu.mainMenu && mainMenu?.mainMenu[0]?.menu_button?.title}
        userIcon={
          mainMenu.mainMenu
            ? getImagePath(mainMenu?.mainMenu[0]?.icon_mobile_open?.data?.attributes?.url)
            : EmptyImage
        }
        userEmail={profile && profile.email}
        userFirstName={profile && profile.firstName}
        userLastName={profile && profile.lastName}
        userAvatar={profile && profile.avatar}
      />
      {/* <Wrapper> */}
      <div className="pt-[86px]">{children}</div>
      {/* </Wrapper> */}
      <Footer footerMenu={mainMenu?.footerMenu} />
    </>
  );
};

export default CouponLayout;
