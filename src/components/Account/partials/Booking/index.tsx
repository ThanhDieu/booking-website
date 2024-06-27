/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import styles from './../../Account.module.scss';
import clsx from 'clsx';
import BookingHistory from './BookingHistory';
import ActivityHistory from './ActivityHistory';
import { useAppDispatch } from '@/store/hooks';
import { useIbeTranslation } from '@/hooks';
import { thunkFetchActivitiesHistory, thunkFetchHistoryBooking } from '@/store/slice/userSlice';
import withAuth from '@/Hoc/withAuth/withAuth';

type YourBookingProps = {};

enum YourBookingStatus {
  BOOKING = 'booking',
  ACTIVITIES = 'activities',
}

const YourBooking = ({}: YourBookingProps) => {
  const [selected, setSelected] = useState<string>(YourBookingStatus.BOOKING);
  const handleSelect = (tabPaneId: string) => setSelected(tabPaneId);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(thunkFetchHistoryBooking());
    dispatch(thunkFetchActivitiesHistory());
  }, []);

  const accountPage = useIbeTranslation('accountPage');

  return (
    <div className="grid grid-cols-12 gap-6 pt-24">
      <div className={clsx('col-span-12 text-primary-switch', styles.textHeader)}>Your booking</div>
      {/* title */}
      <div className="lg:col-span-3 col-span-12 text-primary-switch">
        <div className="h-auto p-6 rounded-2xl bg-primary-switch">
          <div className="pl-2 grid gap-y-6">
            <p
              onClick={() => handleSelect(YourBookingStatus.BOOKING)}
              className={clsx(
                styles.tabPane,
                selected === 'booking' ? `PrimaryBlue ${styles.active}` : 'text-primary-switch'
              )}
            >
              {accountPage?.yourBookingPage?.tabTitleBooking}
            </p>
            <p
              className={clsx(
                styles.tabPane,
                selected === 'activities' ? `PrimaryBlue ${styles.active}` : 'text-primary-switch'
              )}
              onClick={() => handleSelect(YourBookingStatus.ACTIVITIES)}
            >
              {accountPage?.yourBookingPage?.tabTitleActivities}
            </p>
          </div>
        </div>
      </div>

      {/* cotent item */}
      <div className="lg:col-span-9 col-span-12 h-full bg-primary-switch p-6 rounded-2xl">
        {selected === YourBookingStatus.BOOKING && <BookingHistory />}
        {selected === YourBookingStatus.ACTIVITIES && <ActivityHistory />}
      </div>
    </div>
  );
};

export default withAuth(YourBooking);
