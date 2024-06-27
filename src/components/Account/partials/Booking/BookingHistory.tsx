import clsx from 'clsx';
import React from 'react';

type BookingHistoryProps = {};
import styles from './../../Account.module.scss';
import BookingHistoryCard from './BookingHistoryCard';
import { useAppSelector } from '@/store/hooks';
import { BookingHistoryType, ReservationHistoryType } from '@/types/userSliceType/userSlice';
import moment from 'moment';
import { useIbeTranslation } from '@/hooks';

const BookingHistory = ({}: BookingHistoryProps) => {
  const { bookingHistory } = useAppSelector((state) => state.userSlice);

  const accountPage = useIbeTranslation('accountPage');
  return (
    <div className="bg-primary-switch">
      {bookingHistory?.history ? (
        <div>
          {/* map the booking in the future */}
          {bookingHistory?.history?.some((ele) =>
            ele?.reservations?.some(
              (dep) =>
                moment(new Date()).format('DD.MM.YYYY') <=
                moment.unix(dep?.departure).format('DD.MM.YYYY')
            )
          ) && (
            <>
              <p
                className={clsx(
                  'pb-2',
                  styles.baseTransition,
                  styles.borderBottom,
                  styles.baseText
                )}
              >
                {accountPage?.yourBookingPage?.bookingHistory?.upComing}
              </p>
              <div className="pt-4 pb-8 flex flex-col gap-y-4">
                {bookingHistory?.history?.map((history: BookingHistoryType, index: number) => {
                  const departure = history?.reservations?.map(
                    (res: ReservationHistoryType) => res.departure
                  );
                  const currentDay = new Date();

                  if (
                    moment(currentDay).format('DD.MM.YYYY') <=
                    moment.unix(departure[0]).format('DD.MM.YYYY')
                  ) {
                    return <BookingHistoryCard key={index} historyInfomation={history} />;
                  }
                })}
              </div>
            </>
          )}
          {/* map the booking in the past */}
          {bookingHistory?.history?.some((ele) =>
            ele?.reservations?.some(
              (dep) =>
                moment(new Date()).format('DD.MM.YYYY') >
                moment.unix(dep?.departure).format('DD.MM.YYYY')
            )
          ) && (
            <>
              <p className={clsx('pb-2', styles.borderBottom, styles.baseText)}>
                {accountPage?.yourBookingPage?.bookingHistory?.history}
              </p>
              <div className="pt-4 flex flex-col gap-y-4">
                {bookingHistory.history?.map((history: BookingHistoryType, index: number) => {
                  const departure = history?.reservations?.map(
                    (res: ReservationHistoryType) => res?.departure
                  );
                  const currentDay = new Date();

                  if (
                    moment(currentDay).format('DD.MM.YYYY') >
                    moment.unix(departure[0]).format('DD.MM.YYYY')
                  ) {
                    return <BookingHistoryCard key={index} historyInfomation={history} />;
                  }
                })}
              </div>
            </>
          )}
        </div>
      ) : (
        <p className="text-lg text-primary-switch">
          {accountPage?.yourBookingPage?.bookingHistory?.emptyHistory}
        </p>
      )}
    </div>
  );
};

export default BookingHistory;
