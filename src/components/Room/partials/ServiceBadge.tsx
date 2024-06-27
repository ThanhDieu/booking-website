import { HTMLAttributes } from 'react';
import styles from '../Room.module.scss';
import clsx from 'clsx';

const ServiceBadge = (props: HTMLAttributes<HTMLDivElement>) => {
  return <div {...props} className={clsx(styles['service-badge'], props.className)}></div>;
};

export default ServiceBadge;
