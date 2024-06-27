import React from 'react';
import styles from '../DatePickerSelected/DatePicker.module.scss';
import { Switch } from 'antd';
import clsx from 'clsx';
import { useIbeTranslation } from '@/hooks';

interface DateFooterProps {
  onChange?: (checked: boolean) => void;
  calendarDescription?: string;
  priorityDescription?: {
    high: string;
    normal: string;
    low: string;
  };
}
const DateFooter = ({ onChange, calendarDescription, priorityDescription }: DateFooterProps) => {
  const searchMenu = useIbeTranslation('searchMenu');
  return (
    <div className={clsx('flex justify-between md:items-center items-baseline', styles.dateBottom)}>
      <Switch defaultChecked onChange={onChange} />
      <div className={styles.dateBottomItem}>
        <span className={clsx(styles.itemLow, 'capitalize')}>
          {priorityDescription?.low || searchMenu?.calendar?.calendarLow}
        </span>
        <span className={clsx(styles.itemAverage, 'capitalize')}>
          {priorityDescription?.normal || searchMenu?.calendar?.calendarNormal}
        </span>
        <span className={clsx(styles.itemHigh, 'capitalize')}>
          {priorityDescription?.high || searchMenu?.calendar?.calendarHigh}
        </span>
        <span className="text-primary-switch capitalize">
          {calendarDescription || searchMenu?.calendar?.calendarDescription}
        </span>
      </div>
    </div>
  );
};

export default DateFooter;
