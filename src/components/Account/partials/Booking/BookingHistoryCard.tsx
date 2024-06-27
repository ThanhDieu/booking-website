import ButtonShare, { ButtonStyle } from '@/components/global/ButtonShare';
import Currency from '@/components/global/CurrencyComponent';
import { pathPage } from '@/constants';
import { defaultParamsSearch } from '@/constants/bundleConst';
import { EmptyImage } from '@/constants/imageUrl';
import { useIbeTranslation } from '@/hooks';
import { BedIcon, LocationIcon } from '@/library';
import { BookingHistoryType, ReservationHistoryType } from '@/types/userSliceType/userSlice';
import { timeInPeriodsDefault } from '@/util/bundle';
import getImagePath from '@/util/getImagePath';
import { querySearchParams } from '@/util/searchParams';
import clsx from 'clsx';
import moment from 'moment';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import styles from './../../Account.module.scss';

type BookingHistoryCardProps = {
  historyInfomation: BookingHistoryType;
};

const BookingHistoryCard = ({ historyInfomation }: BookingHistoryCardProps) => {
  const router = useRouter();
  const accountPage = useIbeTranslation('accountPage');

  const handleBundleDetail = (reservation: ReservationHistoryType) => {
    const defaultTime = timeInPeriodsDefault(
      reservation?.bundle?.periods,
      reservation?.bundle?.minimumStay ?? 1
    );
    router.push({
      pathname: `/${pathPage.result}/${reservation?.bundle?.id}`,
      query: querySearchParams({
        ...defaultParamsSearch,
        propertyId: reservation?.property?.id || '',
        countryCode: reservation?.property?.countryCode || '',
        adults: reservation?.adults ?? 1,
        arrival: defaultTime?.start || undefined,
        departure: defaultTime?.end || undefined,
      }),
    });
  };

  return (
    <div>
      {historyInfomation?.reservations?.map(
        (reservation: ReservationHistoryType, index: React.Key) => {
          return (
            <div
              key={reservation.reservationId}
              className="grid grid-cols-12 gap-4 p-4 bg-secondary-switch rounded-2xl"
            >
              {/* hotel */}
              <div className="col-span-12 flex justify-between items-center">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-1">
                    <LocationIcon />
                    <span className="text-[12px]  font-normal">{reservation?.property?.name}</span>
                  </div>
                  {!reservation?.property?.disabled && <ButtonShare
                    onClick={() => router.push(`/${pathPage.hotel}/${reservation?.property?.id}`)}
                    size="small"
                    className="font-medium text-[10px]"
                    content={accountPage?.yourBookingPage?.bookingHistory?.hotelButton}
                  />}
                </div>
                <div>
                  <span className="text-[12px] text-MidGrey mr-2">
                    {moment.unix(reservation?.createdAt).fromNow()}
                  </span>
                </div>
              </div>
              {/* image */}
              <div className="xl:col-span-2 md:col-span-3 col-span-4 relative h-28 overflow-hidden">
                {/* image return form BE is a list of string WARNING! */}
                <Image
                  src={
                    reservation?.bundle?.media && reservation?.bundle?.media?.length
                      ? getImagePath(reservation?.bundle?.media[0])
                      : EmptyImage
                  }
                  className="w-full h-full rounded-md"
                  alt={''}
                  width={0}
                  height={0}
                />
              </div>
              {/* content */}
              <div className="xl:col-span-8 md:col-span-7 col-span-8 flex flex-col gap-y-2">
                {/* information */}
                <p className={styles.baseText}>{reservation?.bundle?.name}</p>
                {/* unit group */}
                <div className="flex flex-row gap-1 pb-4">
                  <BedIcon className="w-4 h-4" />
                  <p className={styles.textExSmall}>{reservation?.unitGroup?.name}</p>
                </div>
                {/* time booking */}
                <div className="flex gap-8 justify-start align-top">
                  <div className="flex flex-col gap-y-1">
                    <span className="text-[10px] leading-3">
                      {accountPage?.yourBookingPage?.bookingHistory?.duration}
                    </span>
                    <p className={styles.textExSmall}>
                      {moment.unix(reservation?.arrival).format('DD.MM.YYYY')} -{' '}
                      {moment.unix(reservation?.departure).format('DD.MM.YYYY')}
                    </p>
                  </div>
                  {/* guest */}
                  <div className="flex gap-8 justify-start align-top">
                    <div className="flex flex-col gap-y-1">
                      <span className="text-[10px] leading-3">
                        {accountPage?.yourBookingPage?.bookingHistory?.guest}
                      </span>
                      <p className={styles.textExSmall}>
                        {reservation?.adults} {accountPage?.yourBookingPage?.bookingHistory?.adults}
                        , {reservation?.children || '0'}{' '}
                        {accountPage?.yourBookingPage?.bookingHistory?.childs}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* action */}
              <div className="xl:col-span-2 md:col-span-2 col-span-12 text-right flex flex-col items-stretch justify-around">
                <div className="flex flex-col  gap-y-1 ">
                  <Currency
                    price={Math.abs(reservation?.totalGrossAmount?.amount)}
                    fontSize={'text-[20px]'}
                    fontWeight={'font-medium'}
                    leading={'leading-[26px]'}
                  />
                  <div
                    className={clsx(
                      styles.textSmall,
                      'flex gap-2 justify-end items-center text-secondary-switch'
                    )}
                  >
                    {accountPage?.yourBookingPage?.bookingHistory?.balance}
                    <Currency
                      price={
                        reservation?.totalGrossAmount?.amount -
                        Math.abs(reservation?.balance?.amount)
                      }
                      fontSize={'text-[14px]'}
                      leading={'leading-[18px]'}
                    />
                  </div>
                </div>
                {!reservation?.property?.disabled && <div className="flex justify-end gap-4 mt-2">
                  <ButtonShare
                    onClick={() => handleBundleDetail(reservation)}
                    size="small"
                    style={ButtonStyle.DARK}
                    content={`${accountPage?.yourBookingPage?.bookingHistory?.bookAgain}`}
                  />
                </div>}
              </div>
            </div>
          );
        }
      )}
    </div>
  );
};

export default BookingHistoryCard;
