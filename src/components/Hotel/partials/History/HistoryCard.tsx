import { EmptyImage } from '@/constants/imageUrl';
import { ImageType } from '@/types/propertyType.ts/propertyType';
import getImagePath from '@/util/getImagePath';
import clsx from 'clsx';
import Image from 'next/image';
import styles from './../../Hotel.module.scss';

export interface HistoryCardType {
  id: number;
  title: string;
  subtitle: string;
  media: ImageType;
  year: number;
}

const HistoryCard = ({ title, subtitle, media, year }: HistoryCardType) => {
  const imgSrc = media?.data?.attributes?.url;
  return (
    <div className="relative">
      <div className="flex items-start justify-around gap-2 flex-col p-4">
        <div className="flex gap-2 col-span-2 flex-col w-full">
          <Image
            className="rounded-[50%] mx-auto w-[100px] h-[100px]"
            src={imgSrc ? getImagePath(imgSrc) : EmptyImage}
            width={0}
            height={0}
            alt=""
          />
          <div className={clsx('text-center pb-8', styles.historyCard)}>
            <p className={clsx('text-[20px] leading-[26px] text-center', styles.textTitleClamp)}>
              {title}
            </p>
            <p className={clsx(styles.textDesc)}>{subtitle}</p>
          </div>
        </div>
      </div>
      <div className="w-[78px] bg-secondary-switch flex flex-col items-center justify-center absolute z-10 bottom-0 left-1/2 -translate-x-1/2">
        <p>{year}</p>
        <div className="relative">
          <Image className="w-3 h-3" alt={''} width={0} height={0} src="/icons/dotIcon.png" />
        </div>
      </div>
    </div>
  );
};

export default HistoryCard;
