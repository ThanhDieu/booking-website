import { EmptyImage } from '@/constants/imageUrl';
import { AlpsIcon, IqCheckIcon, RatingStarIcon } from '@/library';
import { useAppSelector } from '@/store/hooks';
import { ThemeType } from '@/store/slice/themeSlice';
import { ImageDataType } from '@/types/propertyType.ts/propertyType';
import clsx from 'clsx';
import Image from 'next/image';
import Skeleton from 'react-loading-skeleton';
import styles from '../../Hotel.module.scss';
import { pathPage } from '@/constants';
import getImagePath from '@/util/getImagePath';

export interface IProps {
  name: string;
  ratings?: number;
  reviews?: number;
  isFetchingReviews?: boolean;
  hideReviews?: boolean;
  media?: ImageDataType[];
}

const TitleBarSection = ({
  name,
  ratings,
  reviews,
  isFetchingReviews,
  hideReviews = false,
  media,
}: IProps) => {
  const { selected } = useAppSelector((state) => state.themeSlice);
  const blackIcon = (media && media[0]?.attributes.url) || EmptyImage;
  const whiteIcon = (media && media[1]?.attributes.url) || EmptyImage;

  return (
    <div id={pathPage.viewHotels} className="py-4 lg:pt-4  bg-secondary-switch text-primary-switch">
      <div className="container flex justify-between">
        <div className="flex">
          <div className="mr-[20px]">
            {!media ? (
              <AlpsIcon />
            ) : (
              <Image
                unoptimized
                width={75}
                height={75}
                src={selected === ThemeType.default ? getImagePath(blackIcon) : getImagePath(whiteIcon)}
                alt=""
              />
            )}
          </div>
          <div className="flex flex-col justify-center">
            <div className="py-2.5">
              <h2 className={clsx(styles.title, 'font-[lora]')}>{name}</h2>
            </div>
            {!hideReviews && (
              <div className="flex">
                {[...Array(Math.round(ratings || 0))]?.map((len, idx) => {
                  return <RatingStarIcon key={idx} />;
                })}
              </div>
            )}
          </div>
        </div>

        {!hideReviews && (
          <div className="hidden md:flex mt-1">
            <div className="mt-9 mr-4">
              <IqCheckIcon />
            </div>
            {isFetchingReviews ? (
              <Skeleton containerClassName="w-16" height={32} count={2} />
            ) : (
              <div className="flex flex-col py-2.5 mt-2">
                <div>
                  <p className={clsx(styles.rating, 'text-SecondaryBlack dark:text-SecondaryGrey')}>
                    <span className="text-primary-switch">{ratings}</span> / 5
                  </p>
                </div>
                <div className={clsx(styles.reviews)}>{reviews} reviews</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TitleBarSection;
