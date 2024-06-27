import { DropboxOutlined } from '@ant-design/icons';
import React from 'react';
import styles from './LoadingItem.module.scss';
import clsx from 'clsx';
type LoadingItemProps = {
  className?: string;
};

const LoadingItem = ({className}: LoadingItemProps) => {
  return (
    <div className={className}>
      <div className={styles.cards}>
        <div className={clsx(styles.card_image, styles.loading)} />
        <div className={clsx(styles.card_title, styles.loading)} />
        <div className={clsx(styles.card_description, styles.loading)} />
        <div className={clsx(styles.tags, styles.loading)} />
        <div className={clsx(styles.tags, styles.loading)} />
        <div className={clsx(styles.tags, styles.loading)} />
        <div className='flex items-center'>
          <div className={clsx(styles.avatar, styles.loading)} />
          <div className='w-2/4'>
          <div className={clsx(styles.name, styles.loading)} />
          <div className={clsx(styles.rank, styles.loading)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingItem;
