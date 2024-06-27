import ImageSlider from '@/components/global/ImagesSlider';
import { EmptyImage } from '@/constants/imageUrl';
import getImagePath from '@/util/getImagePath';
import { Splide, SplideProps, SplideSlide } from '@splidejs/react-splide';
import RoomFooter from './RoomFooter';
import { RoomCardType } from './roomCardType';

interface IProps {
  cardContent: RoomCardType[];
}

const RenderRoomSlideCard = (rooms: RoomCardType) => {
  const { gallery } = rooms;
  const renderRoomImages = gallery?.file?.data?.length
    ? gallery?.file?.data.map((images) => {
        return images?.attributes
          ? getImagePath(images?.attributes?.formats?.medium?.url || images?.attributes?.url)
          : EmptyImage;
      })
    : [];
  return (
    <div className="overflow-hidden rounded-2xl h-full">
      <ImageSlider images={renderRoomImages} className="w-full h-[320px] lg:h-[400px]" />
      <RoomFooter {...rooms} />
    </div>
  );
};

const slideOption: SplideProps = {
  options: {
    rewind: true,
    perPage: 2,
    gap: '3.125rem',
    perMove: 1,
    pagination: false,
    lazyLoad: true,
    drag: 'free',
    breakpoints: {
      1024: {
        perPage: 2,
        gap: '1rem',
      },
      768: {
        perPage: 1,
        gap: '1rem',
        arrows: false,
      },
      640: {
        perPage: 1,
        gap: '1rem',
        arrows: false,
      },
    },
  },
};

const RoomsSlider = ({ cardContent }: IProps) => {
  return (
    <div className="rooms holiday">
      <Splide aria-label="holiday slide" {...slideOption}>
        {cardContent?.map((splide, index) => (
          <SplideSlide key={index} className="cursor-grab">
            <RenderRoomSlideCard {...splide} />
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

export default RoomsSlider;
