import { useLayoutEffect, useRef } from 'react';
import { RatingStarIcon } from '@/library';
import styles from '../../Hotel.module.scss';
import clsx from 'clsx';
import RenderSectionHeader from '../SectionHeader';
import Rating from './Rating';
import ButtonShare from '@/components/global/ButtonShare';
import { useState } from 'react';
import { FeedbackProps } from '../..';
import { usePlausible } from 'next-plausible';
import { PlausibleEvents } from '@/types/plausible';
import { Wrapper } from '@/components/global/Wrapper';

interface IProps {
  title: string;
  icon: string;
  overallRating: number;
  total: number;
  reviewCards: FeedbackProps[];
  showmoreText?: string;
  showLessText?: string;
  hotelId?: string;
}

const Review = (props: FeedbackProps) => {
  const { score, comment, departure, showmoreText, showlessText } = props;

  const ref = useRef<HTMLParagraphElement>(null);
  const [showMore, setShowMore] = useState(false);
  const [showLink, setShowLink] = useState(false);

  useLayoutEffect(() => {
    if (ref.current && ref.current.clientHeight + 1 < ref.current.scrollHeight) {
      setShowLink(true);
    }
  }, [ref]);

  const onClickMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="flex flex-col justify-between rounded-xl py-[23px] px-[23px] bg-primary-switch">
      <div>
        {[...Array(Math.round(score))]?.map((ele, i) => (
          <RatingStarIcon key={i} />
        ))}
        <p
          ref={ref}
          className={
            showMore
              ? clsx(styles.textSmall, 'overflow-auto max-h-[60px]', styles.fullComment)
              : clsx(styles.textSmall, 'overflow-auto max-h-[60px]', styles.comment)
          }
        >
          {comment}
        </p>
        {showLink && (
          <span className="text-md cursor-pointer text-PrimaryBlue" onClick={onClickMore}>
            {showMore ? showlessText || 'show less' : showmoreText || 'show more'}
          </span>
        )}
      </div>
      <span className={clsx(styles.roomCapacity, 'mt-3 text-MidGrey')}>{departure}</span>
    </div>
  );
};

export const ReviewSection = ({ title, icon, reviewCards, total, overallRating, showLessText, showmoreText, hotelId }: IProps) => {
  let [noOfElements, setNoOfElements] = useState(4);
  const plausible = usePlausible<PlausibleEvents>();

  const NoOfElementsDisplayed = reviewCards.slice(0, noOfElements);
  const maxNoOfElements = reviewCards?.length;
  const isMaximun = NoOfElementsDisplayed?.length < maxNoOfElements;

  const handleLoadMore = () => {
    plausible("click", {
      props: {
        id: String(`load_more_reviews_${hotelId}`)
      }
    })
    if (isMaximun) {
      setNoOfElements(noOfElements + 2);
    } else {
      setNoOfElements((noOfElements = 4));
    }
  };

  return reviewCards?.length ? (
      <Wrapper id="reviews" className={styles.scrollMarginTop}>
        <div className={'flex justify-between'}>
          <RenderSectionHeader title={title} icon={icon} />
          <div>
            <Rating reviews={total} ratings={overallRating} />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex basis-1/2 lg:w-[2000px] flex-col gap-6">
            {NoOfElementsDisplayed?.map(
              (item, index) => index % 2 === 1 && <Review key={item.id} {...item} showlessText={showLessText} showmoreText={showmoreText} />
            )}
          </div>

          <div className="flex basis-1/2 flex-col gap-6">
            {NoOfElementsDisplayed?.map(
              (item, index) => index % 2 === 0 && <Review key={item.id} {...item} showlessText={showLessText} showmoreText={showmoreText} />
            )}
          </div>
        </div>
        <div className="pt-10 flex justify-center">
          <ButtonShare
            onClick={() => handleLoadMore()}
            style={'outline'}
            content={isMaximun ? showmoreText || 'load more reviews' : showLessText || 'show less'}
            size={'large'}
          />
        </div>
      </Wrapper>
  ) : null;
};
