import { ChevronDownIcon } from '@/library';
import clsx from 'clsx';
import { useState } from 'react';
import { RoomCardProps } from '../@types';
import styles from '../Room.module.scss';

const RoomCard = ({ media, overview, detail, bundleDetailText }: RoomCardProps) => {
  const [showDetail, setShowDetail] = useState<boolean>(false);

  const handleToggleShowDetail = () => setShowDetail(!showDetail);

  return (
    <div className={clsx(styles['room-container'], 'bg-primary-switch')}>
      <div className={styles['room-header']}>
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-8">
          <div className={clsx(styles['room-media'], 'overflow-hidden rounded-lg')}>{media}</div>
          <div className={styles['room-overview']}>{overview}</div>
        </div>
        {detail && (
          <div
            className={clsx(
              styles['detail-btn'],
              showDetail && styles['open'],
              'mt-6 !border-SecondaryGrey dark:!border-SecondaryBlack'
            )}
            onClick={handleToggleShowDetail}
            role="button"
          >
            {showDetail
              ? `${bundleDetailText?.bundleDetail?.buttonText?.minimize || 'Minimize details'}`
              : `${bundleDetailText?.bundleDetail?.buttonText?.full || 'Show full details'}`}
            <ChevronDownIcon
              width={16}
              height={16}
              className={clsx('ml-2', {
                '-rotate-180': showDetail,
              })}
            />
          </div>
        )}
      </div>
      <div className={clsx(styles['room-content'], showDetail && styles['open'])}>{detail}</div>
    </div>
  );
};

export default RoomCard;
