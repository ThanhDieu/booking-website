import clsx from 'clsx';
import React from 'react';
import styles from './../../Account.module.scss';
import { useAppSelector } from '@/store/hooks';
import ActivityHistoryCard from './ActivityHistoryCard';
import { useIbeTranslation } from '@/hooks';
type ActivityHistoryProps = {};

const ActivityHistory = ({}: ActivityHistoryProps) => {
  const { activitiesHistory } = useAppSelector((state) => state.userSlice);

  const accountPage = useIbeTranslation('accountPage');
  return (
    <div>
      {activitiesHistory?.activities ? (
        <>
          <p className={clsx('pb-2', styles.borderBottom, styles.baseText)}>
            {accountPage?.yourBookingPage?.bookingHistory?.recent}
          </p>
          <div className="pt-4 pb-8 flex flex-col gap-y-4">
            {activitiesHistory?.activities?.map((ele: any, index: number) => {
              return <ActivityHistoryCard key={index} activityInfomation={ele} />;
            })}
          </div>
        </>
      ) : (
        <h4 className="text-lg text-primary-switch">
          {accountPage?.yourBookingPage?.bookingHistory?.emptyActivities}
        </h4>
      )}
      {/* <p className={clsx('pb-2', styles.borderBottom, styles.baseText)}>This month</p>
      <div className="pt-4 flex flex-col gap-y-4">
      </div> */}
    </div>
  );
};

export default ActivityHistory;
