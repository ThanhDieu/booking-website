import { useRouter } from 'next/router';
import { SmallCard, SmallCardListModel } from '.';
import Image from 'next/image';
import { Splide, SplideProps, SplideSlide } from '@splidejs/react-splide';
import { SlideOption } from '@/components/HomePage/partials/HolidaySection/HolidayPackages';
import { EmptyImage } from '@/constants/imageUrl';
import getImagePath from '@/util/getImagePath';
import { pathPage } from '@/constants';

interface SmallCardListViewProps {
  model: SmallCardListModel;
}

const SplideCard = (props: { card: SmallCard }) => {
  const router = useRouter();
  const handleNavigate = () => {
    if (router.asPath !== href) {
      router.replace(`${href}#${pathPage.viewHotels}`);
    }
  };

  const { href, imageUrl, title, active } = props.card;
  return (
    <div
      style={{ border: active ? '5px solid' : 'none' }}
      className="!border-PrimaryBlue rounded-[12px] p-1"
      onClick={handleNavigate}
    >
      <div className="relative rounded-lg h-[270px] overflow-hidden scalePackages">
        <Image
          alt={'gallery'}
          className="w-full !h-full object-cover cursor-pointer "
          width={0}
          height={0}
          src={imageUrl ? getImagePath(imageUrl) : EmptyImage}
        />
        <div className="absolute bottom-0 bg-gradient-to-t from-PrimaryBlack w-full h-1/2 flex items-end justify-center pb-4 hoverOverlay">
          <p className="text-PrimaryWhite text-xl leading-[26px] font-medium !font-[Lora] text-center cursor-pointer">
            {title}
          </p>
        </div>
      </div>
    </div>
  );
};

const View = (props: SmallCardListViewProps) => {
  const {
    model: { cards },
  } = props;

  const router = useRouter();

  const SlideOption: SplideProps = {
    options: {
      rewind: false,
      gap: '1rem',
      perPage: 3,
      perMove: 1,
      pagination: false,
      lazyLoad: true,
      drag: 'free',
      breakpoints: {
        768: {
          perPage: 2,
          arrows: false,
          pagination: true,
        },
      },
    },
  };

  return (
    <Splide aria-label="holiday slide" {...SlideOption}>
      {cards?.map((card) => (
        <SplideSlide key={card.href} className="cursor-pointer">
          <SplideCard card={{ ...card, active: router.asPath.includes(card.href) }} />
        </SplideSlide>
      ))}
    </Splide>
  );
};

export default View;
