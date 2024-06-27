import strapiRequester from '@/clientApi/requester/strapiRequester';
import Gallery from '@/components/global/Gallery/Gallery';
import SearchMenu from '@/components/global/SearchMenu';
import { pathPage, pathsBooking } from '@/constants';
import { EmptyImage } from '@/constants/imageUrl';
import { useAuth } from '@/context/auth/authContext';
import { SearchMobileIcon } from '@/library';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  setCouponTag,
  setMedia,
  thunkFetchLocation,
  thunkGetAllBundle,
} from '@/store/slice/commonSlice';
import {
  asyncThunkFetchProfile,
  thunkFetchActivitiesHistory,
  thunkFetchHistoryBooking,
} from '@/store/slice/userSlice';
import { LayoutProps } from '@/types/layoutType';
import getImagePath from '@/util/getImagePath';
import { changeLanguague } from '@/util/translations';
import { useLocale, useTranslation } from '@m0-0a/next-intl';
import { Drawer } from 'antd';
import clsx from 'clsx';
import xPathList from 'i18n/xTranslationList.json';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import Footer from './Footer';
import Header, { TTopicMenu } from './Header';
import { deepFieldObjStarpi } from '@/util/object';
import { resetOfferSlice } from '@/store/slice/offerSlice';
// import { defaultDateFetchAll } from '@/constants/bundleConst';

const MainLayout = ({ children }: LayoutProps) => {
  const { profile } = useAppSelector((state) => state.userSlice);
  const { bundleList } = useAppSelector((state) => state.commonSlice);
  const [topicMenu, setTopicMenu] = useState<TTopicMenu[]>([]);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isHotelPage = router.asPath.includes(`/${pathPage.hotel}/`);
  const isHomePage = router.asPath === pathPage.home|| /^(\/#(?!contact\/#|account\/#|booking-history\/#))/i.test(router.asPath);
  const isAboutPage = router.asPath.includes(`/${pathPage.about}/`);
  const isErrorPage = router.asPath.includes(pathPage.errors);
  const isAccountPage = router.asPath.includes(`/${pathPage.account}`);
  const isContactPage = router.asPath.includes(`/${pathPage.contact}`);
  const isTopicPage = router.asPath.includes(`/${pathPage.topic}/`);

  const [mainMenu, setMainMenu] = useState<any>({});

  // search menu mobile
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) {
      document.body.style.overflow = '';
    } else {
      document.body.style.overflow = 'hidden';
    }
  }, [open]);
  const onClose = () => {
    setOpen(false);
  };
  const { t } = useTranslation();
  const translatedAttributes = t('frontPage');
  const { locale } = useLocale();
  const { user } = useAuth();

  useEffect(() => {
    /** dispatch fetch location country */
    dispatch(thunkFetchLocation());
    /** fetch all bundle */
    if (!bundleList || bundleList?.length == 0) {
      dispatch(thunkGetAllBundle({}));
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
            dispatch(setCouponTag(response.data.data.attributes.hero?.tag));
          }
        }
      } catch (err) { }
    };
    handleFetchMainMenu();

    // fetch topic menu
    (async () => {
      try {
        const property = await strapiRequester.fetchTopicProperty(locale);
        if (property.status === 200) {
          const propertyFormat: TTopicMenu[] = property.data.data.map((ele: typeof property.data.data) => {
            const topic = deepFieldObjStarpi(ele?.attributes?.topic)
            const activity = deepFieldObjStarpi(topic?.activity)
            return {
              slug: activity?.slug || ele.attributes?.topic?.data?.attributes?.slug,
              propertyId: ele.attributes?.property?.data?.attributes?.code,
              title: ele.attributes?.topic?.data?.attributes?.title,
            }
          });
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
      } catch (err) { }
    })();
  }, [locale]);

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

  useEffect(() => {
    if (!router.asPath.includes(pathPage.offer)) {
      dispatch(resetOfferSlice());
    }
  }, [router?.asPath, dispatch]);

  return (
    <div ref={layoutRef}>
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
      <div
        className={clsx(isErrorPage || isContactPage || isAccountPage || (isAboutPage && 'hidden'))}
      >
        <div
          className={clsx(
            'lg:hidden fixed top-[90px] z-40 bg-primary-switch w p-4 rounded-md flex',
            open ? '' : ''
          )}
          onClick={() => setOpen(!open)}
        >
          <SearchMobileIcon />
        </div>
        {open ? (
          <Drawer placement={'left'} onClose={onClose} open={open}>
            <SearchMenu setOpen={setOpen} />
          </Drawer>
        ) : (
          <div className="lg:flex hidden">
            <SearchMenu />
          </div>
        )}
      </div>
      <div
        className={clsx(
          isHomePage || isHotelPage || isAccountPage || isAboutPage || isTopicPage || isContactPage
            ? ''
            : `pt-48 bg-secondary-switch`
        )}
      >
        <>
          {children}
        </>
      </div>
      <Gallery gallery={mainMenu.mainMenu && mainMenu?.mainMenu[0].gallery} className={clsx(isHotelPage ? 'hidden' : '')}/>
      <Footer footerMenu={mainMenu.footerMenu} />
    </div>
  );
};

export default MainLayout;
