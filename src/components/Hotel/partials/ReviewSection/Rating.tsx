import clsx from 'clsx';
import styles from '../../Hotel.module.scss';
import { IqCheckIcon, RatingStarIcon } from '@/library';
import Image from 'next/image';

interface IProps {
  ratings: number;
  reviews: number;
}

function Rating(props: IProps) {
  const { ratings, reviews } = props;

  return (
    <div className="flex flex-col">
      <div className="flex justify-end flex-col lg:flex-row gap-4">
        {/* static content */}
        <span className={clsx(styles.featureItem, 'leading-0 ml-auto')}>{reviews} reviews</span>
        <h3 className={clsx(styles.rating, 'ml-auto')}>
          <span>{ratings}</span> / 5
        </h3>
      </div>
      <div className="flex flex-wrap gap-4">
        <Image
          className="w-16 h-5"
          src={require('public/images/property/iq-check.png')}
          alt={'...'}
          width={0}
          height={0}
        />
        <div>
          {[...Array(Math.round(ratings))]?.map((len, index) => (
            <RatingStarIcon key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Rating;
