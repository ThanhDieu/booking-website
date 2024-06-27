import clsx from 'clsx';
import React from 'react';
import styles from './ContentWithNumberCard.module.scss';

export type ContentWithNumberCardProps = {
  cardTitle?: string;
  cardSubtitle?: string;
  cardContent?: string;
};

const ContentWithNumberCard = ({
  cardTitle,
  cardSubtitle,
  cardContent,
}: ContentWithNumberCardProps) => {
  return (
    <div className="flex flex-col gap-y-4 justify-start">
      <p
        className={clsx(
          'pb-2 font-[Lora] blue-text-switch text-5xl leading-[60px] ',
          styles.borderB
        )}
      >
        {cardTitle}
      </p>
      <p>{cardSubtitle}</p>
      <p>{cardContent}</p>
    </div>
  );
};

export default ContentWithNumberCard;
