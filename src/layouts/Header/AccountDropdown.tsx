import clsx from 'clsx';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from './Header.module.scss';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { userLogout } from '@/store/slice/userSlice';
import getImagePath from '@/util/getImagePath';
import { useIbeTranslation } from '@/hooks';
import { TopHeaderProps } from '.';
import { EmptyImage } from '@/constants/imageUrl';
import { ThemeType } from '@/store/slice/themeSlice';

type AccountDropdownProps = {
  avatar?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  onClick: () => void;
  topHeader: TopHeaderProps;
};

const AccountDropdown = ({
  avatar,
  firstName,
  lastName,
  email,
  onClick,
  topHeader,
}: AccountDropdownProps) => {
  const { selected } = useAppSelector((state) => state.themeSlice);
  const accountPage = useIbeTranslation('accountPage');

  const dispatch = useAppDispatch();

  const router = useRouter();
  const handlePushRouter = (routerPath: string) => {
    router.asPath.replace(router.asPath, routerPath);
    router.push(routerPath);
  };

  const bookingIcon = topHeader?.userInterface?.bookingIcon?.data?.map((i) => i.attributes?.url);
  const logoutIcon = topHeader?.userInterface?.logoutIcon?.data?.map((i) => i.attributes?.url);
  const profileIcon = topHeader?.userInterface?.profileIcon?.data?.map((i) => i.attributes?.url);

  return (
    <div
      onClick={onClick}
      className={clsx('bg-secondary-switch rounded-lg w-fit ', styles.accountDropdown)}
    >
      <div className={clsx('flex flex-row gap-2 p-4 text-primary-switch', styles.accountBorder)}>
        <Image
          src={avatar || ''}
          className="w-10 h-10 rounded-[50%]"
          alt={''}
          width={0}
          height={0}
        />
        <div className="flex flex-col">
          <p className={styles.accountTitle}>
            {firstName} {lastName}
          </p>
          <p className={clsx(styles.smallText, 'text-secondary-switch')}>{email}</p>
        </div>
      </div>
      <div className="flex flex-col p-4 gap-y-4">
        <div
          onClick={() => handlePushRouter('/account')}
          className="flex flex-row gap-2 cursor-pointer w-function"
        >
          <Image
            src={
              profileIcon?.length
                ? getImagePath(
                    selected === ThemeType.default
                      ? profileIcon[0]
                      : profileIcon[1] || profileIcon[0]
                  )
                : EmptyImage
            }
            className="w-5 h-5 rounded-md"
            alt={''}
            width={0}
            height={0}
          />
          <p className={styles.accountText}>{accountPage?.login?.profile}</p>
        </div>
        <div
          onClick={() => handlePushRouter('/account/booking-history')}
          className="flex flex-row gap-2 cursor-pointer w-function"
        >
          <Image
            src={
              bookingIcon?.length
                ? getImagePath(
                    selected === ThemeType.default
                      ? bookingIcon[0]
                      : bookingIcon[1] || bookingIcon[0]
                  )
                : EmptyImage
            }
            className="w-5 h-5 rounded-md"
            alt={''}
            width={0}
            height={0}
          />
          <p className={styles.accountText}>{accountPage?.login?.yourBooking}</p>
        </div>
        <div
          onClick={() => {
            dispatch(userLogout(undefined));
          }}
          className="flex flex-row gap-2 cursor-pointer w-function"
        >
          <Image
            src={
              logoutIcon?.length
                ? getImagePath(
                    selected === ThemeType.default ? logoutIcon[0] : logoutIcon[1] || logoutIcon[0]
                  )
                : EmptyImage
            }
            className="w-5 h-5 rounded-md"
            alt={''}
            width={0}
            height={0}
          />
          <p>{accountPage?.login?.signOut}</p>
        </div>
      </div>
    </div>
  );
};

export default AccountDropdown;
