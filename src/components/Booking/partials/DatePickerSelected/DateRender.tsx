import React from 'react';
import { Dayjs } from 'dayjs';
import clsx from 'clsx';

export enum RateLevelType {
  low = 'low',
  normal = 'normal',
  high = 'high',
}
interface DaterenderProps {
  currentDate: Dayjs;
  today?: Dayjs;
  rateLevel?: RateLevelType | any;
  showPrice: boolean;
  price?: number | any;
  currency?: string | any;
}

const DateRender = ({
  currentDate,
  today,
  rateLevel,
  showPrice,
  price,
  currency,
}: DaterenderProps) => {
  return (
    <div className={clsx('ant-picker-cell-inner')}>
      <p className={clsx('text-[1rem]')}>{currentDate.date()}</p>
      {showPrice && (
        <div className="flex items-center justify-center">
          <div
            className={clsx('w-[70%] h-[2px] mt-[1px] rounded-full', {
              '!bg-DateHigh': rateLevel?.includes(RateLevelType.high),
              '!bg-DateNormal': rateLevel?.includes(RateLevelType.normal),
              '!bg-DateLow': rateLevel?.includes(RateLevelType.low),
            })}
          ></div>
        </div>
      )}
    </div>
  );
};

export default DateRender;
