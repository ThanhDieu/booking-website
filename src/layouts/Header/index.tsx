import clsx from 'clsx';
import { useEffect, useState } from 'react';
import Brand from './Brand';
import NavLinks from './NavLinks';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import ButtonShare from '@/components/global/ButtonShare';
import { Modal, Select } from 'antd';
import { useRouter } from 'next/router';
import SignInForm from '@/components/SignInForm/SignInForm';
import Image from 'next/image';
import Link from 'next/link';
import AccountDropdown from './AccountDropdown';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
const { Option } = Select;
import { useLocale } from '@m0-0a/next-intl';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { EmptyImage } from '@/constants/imageUrl';
import { MenuDropDownIcon, MoonIcon, SunIcon } from '@/library';
import { ThemeType, selectTheme } from '@/store/slice/themeSlice';
import { usePlausible } from 'next-plausible';
import { PlausibleEvents } from '@/types/plausible';

export interface IconAttribute {
  attributes: { url: string };
  id?: number;
}
export interface IconSingleProps {
  data: IconAttribute;
}
export interface IconArrayProps {
  data: IconAttribute[];
}
import { useAuth } from '@/context/auth/authContext';

export type TTopicMenu = {
  slug: string;
  title: string;
  propertyId: string;
};
export interface HeaderProps {
  topHeader: TopHeaderProps;
  menu: {
    title: string;
    link: string;
  }[];
  whiteLogo: string;
  blackLogo: string;
  btnText?: string;
  url?: string;
  userIcon: string;
  userFirstName?: string;
  userLastName?: string;
  userEmail?: string;
  userAvatar?: string;
  topicMenu?: TTopicMenu[];
}

export interface TopHeaderProps {
  propertyId?: string;
  emailHotel?: string;
  defaultPhoneNumber?: string;
  hotelName?: string;
  phoneNumber?: string;
  languageIcon: IconSingleProps;
  languageList: { languageCode: string; languageName: string }[];
  userInterface?: {
    bookingIcon?: IconArrayProps;
    logoutIcon?: IconArrayProps;
    profileIcon?: IconArrayProps;
  };
}

export default function Header({
  topHeader,
  menu,
  whiteLogo,
  blackLogo,
  btnText,
  url,
  userIcon,
  userFirstName,
  userLastName,
  userEmail,
  userAvatar,
  topicMenu,
}: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [fixed, setFixed] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);
  const [openMyModal, setOpenMyModal] = useState(false);
  const { locale, setLocale } = useLocale();
  const { profile, loading } = useAppSelector((state) => state.userSlice);
  const { isLoading } = useAuth();

  const [handleLoading, setHandleLoading] = useState(true);
  // merging redux and auth provider state, need to clean up this later
  useEffect(() => {
    if (loading === 'pending' || isLoading === true) {
      setHandleLoading(true);
    } else {
      setHandleLoading(false);
    }
  }, [loading, isLoading]);

  const dispatch = useAppDispatch();
  const { selected } = useAppSelector((state) => state.themeSlice);
  const handleOpenMyModal = () => {
    setOpen(false)
    setOpenMyModal(!openMyModal);
  };

  const handleOnBlur = () => setOpenMyModal(false);

  const showModal = () => {
    setOpen(false);
    setModal2Open(true);
    plausible("click", {
      props: {
        id: `open_login_modal`
      }
    })
  };

  const handleOk = () => {
    setModal2Open(false);
  };

  const handleCancel = () => {
    setModal2Open(false);
  };
  const handleChange = (value: string) => {
    setLocale(value);
    localStorage.setItem('deafault_locale', value);
    plausible("click", {
      props: {
        id: `select_language_${value}`
      }
    })
    setOpen(false)
  };

  useEffect(() => {
    function handleCloseProfile() {
      setOpenMyModal(false);
      setOpen(false)
    }
    window.addEventListener('scroll', () =>
      window.scrollY > 0 ? setFixed(true) : setFixed(false)
    );
    window.addEventListener('scroll', handleCloseProfile);

    return () => {
      window.removeEventListener('scroll', handleCloseProfile, true);
    };
  }, []);
  const plausible = usePlausible<PlausibleEvents>();

  return (
    <header className="relative">
      <div
        className={clsx(
          `bg-primary-switch absolute z-50 w-full top-0 flex items-center duration-500 ease-in-out`,
          open ? 'shadow-none' : null,
          fixed && 'hidden'
        )}
      >
        <div className="px-8 py-4 w-full h-full gap-4 flex items-center justify-between">
          <div className="z-40 lg:w-72 flex flex-col justify-start items-start">
            {blackLogo ? (
              <Brand
                image={
                  selected === ThemeType.default ? blackLogo || EmptyImage : whiteLogo || EmptyImage
                }
              />
            ) : (
              <Skeleton containerClassName="w-full" height={54} />
            )}
            <div className="lg:flex flex-row xl:gap-4 gap-2 hidden ">
              <Link
                className="text-primary-switch hover:text-PrimaryBlue text-[12px] leading-[14px] font-medium"
                href={`tel:${topHeader?.defaultPhoneNumber}`}
              >
                {topHeader?.defaultPhoneNumber}
              </Link>
              <Link
                className="text-primary-switch hover:text-PrimaryBlue text-[12px] leading-[14px] font-medium"
                href={`mailto:${topHeader?.emailHotel}`}
              >
                {topHeader?.emailHotel}
              </Link>
            </div>
          </div>
          <ul className="lg:flex hidden items-center justify-center xl:gap-12 lg:gap-10 h-full w-1/2">
            {menu ? (
              <NavLinks topic={topicMenu} menu={menu} setOpen={setOpen}/>
            ) : (
              <Skeleton containerClassName="w-3/4" height={40} />
            )}
          </ul>
          <div className="w-72 flex flex-row items-center justify-end gap-4">
            {topHeader?.languageList ? (
              <>
                {!profile && !handleLoading && (
                  <ButtonShare
                    style={'outline'}
                    onClick={showModal}
                    size="medium"
                    content={btnText}
                  />
                )}
                <div className="lg:flex hidden gap-2 items-center">
                  <Select
                    suffixIcon={<MenuDropDownIcon />}
                    bordered={false}
                    defaultValue={locale}
                    onChange={handleChange}
                    placement={'bottomRight'}
                    popupClassName={'!w-28'}
                  >
                    {topHeader?.languageList?.map((language) => (
                      <Option key={language.languageCode} value={language.languageCode}>
                        {language.languageName}
                      </Option>
                    ))}
                  </Select>
                </div>
              </>
            ) : (
              <Skeleton containerClassName="w-1/4" height={54} />
            )}
            <div
              className="cursor-pointer flex items-center "
              onClick={() => {
                plausible("click", {
                  props: {
                    id: `select_theme_${selected}`
                  }
                })
                dispatch(
                  selectTheme(selected === ThemeType.default ? ThemeType.dark : ThemeType.default)
                )
              }}
            >
              {selected === ThemeType.default ? <MoonIcon /> : <SunIcon />}
            </div>

            {/***** Account here *****/}
            {profile && (
              <div className="relative w-10 h-10">
                <button
                  onClick={handleOpenMyModal}
                  className="border-none bg-TransParent cursor-pointer w-full h-full"
                >
                  <Image
                    src={userAvatar || ''}
                    className="w-full h-full rounded-[50%]"
                    alt={''}
                    width={0}
                    height={0}
                  />
                </button>
                {openMyModal && (
                  <AccountDropdown
                    avatar={userAvatar}
                    firstName={userFirstName}
                    lastName={userLastName}
                    email={userEmail}
                    onClick={handleOnBlur}
                    topHeader={topHeader}
                  />
                )}
              </div>
            )}

            {/* open moble nav */}
            <div className="flex gap-4 lg:hidden">
              <div className="my-auto" onClick={() => setOpen(!open)}>
                {open ? (
                  <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                )}
              </div>
            </div>
          </div>

          {/* Mobile nav */}
          <div
            className={clsx(
              `lg:hidden absolute left-0 overflow-hidden w-full duration-500`,
              open ? 'h-[100vh] visible bg-primary-switch top-16' : 'h-[0px] invisible top-16'
            )}
          >
            <div className="overflow-auto h-[calc(100vh_-_-4rem)]">
              <ul className="container max-[767px]:max-w-full flex flex-col lg:flex-row gap-4 lg:gap-0 pt-8 lg:pt-0">
                <Link
                  className="text-primary-switch hover:text-HoverBlue lg:text-xl text-base leading-[24px] font-medium"
                  href={`tel:${topHeader?.defaultPhoneNumber}`}
                >
                  {topHeader?.defaultPhoneNumber}
                </Link>
                <Link
                  className="text-primary-switch hover:text-HoverBlue lg:text-xl text-base leading-[24px] font-medium"
                  href={`mailto:${topHeader?.emailHotel}`}
                >
                  {topHeader?.emailHotel}
                </Link>
                <NavLinks menu={menu} topic={topicMenu} setOpen={setOpen}/>
                <div className="py-5">
                  {topHeader?.languageList ? (
                    <>
                      <div className="flex gap-2 items-center">
                        <Select
                          autoFocus={false}
                          suffixIcon={<MenuDropDownIcon />}
                          bordered={false}
                          className={'bg-primary-switch rounded'}
                          defaultValue={locale}
                          onChange={handleChange}
                          placement={'bottomRight'}
                          popupClassName={'!w-28'}
                        >
                          {topHeader?.languageList?.map((language) => {
                            return (
                              <Option key={language.languageCode} value={language.languageCode}>
                                {language.languageName}
                              </Option>
                            );
                          })}
                        </Select>
                      </div>
                    </>
                  ) : (
                    <Skeleton containerClassName="w-full" height={54} />
                  )}
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Modal
        centered
        open={modal2Open && !profile}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={400}
      >
        <SignInForm />
      </Modal>
    </header>
  );
}
