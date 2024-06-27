import Headlines from '@/components/global/Headlines';
import { EmptyImage } from '@/constants/imageUrl';
import usePopupState from '@/hooks/usePopupMap';
import { RatingStarIcon } from '@/library';
import { HighlightHotels, HighlightItems } from '@/types/homePage';
import getImagePath from '@/util/getImagePath';
import { Typography } from 'antd';
import Image from 'next/image';
const { Title, Text } = Typography;
export interface SortHotelProps {
  highlightHotels: HighlightHotels;
  getCurrentCard: (highlightItems: HighlightItems) => void;
}

interface SortHotelCardProps {
  highlightItems: HighlightItems;
  onClick: () => void;
}
const SortHotelCard = ({ highlightItems, onClick }: SortHotelCardProps) => {
  const renderImageList = highlightItems?.imageList?.data
    ? highlightItems?.imageList?.data?.map((images, idx) =>
        images?.attributes?.formats?.medium?.url
          ? getImagePath(images?.attributes?.formats?.medium?.url)
          : images?.attributes?.url
          ? getImagePath(images?.attributes?.url)
          : EmptyImage
      )
    : [];

  return (
    <div
      onClick={onClick}
      className="flex justify-between py-4 first:pt-0 border-b-LightGrey border-b border-0 border-solid cursor-pointer "
    >
      <div className="overflow-hidden rounded-lg">
        <Image
          width={0}
          height={0}
          alt={''}
          src={renderImageList[0]}
          className="h-[100px] w-[100px] rounded-lg object-cover scaleImage overflow-hidden"
        />
      </div>
      <div className="flex flex-col gap-y-1 w-[220px]">
        <p>
          {[...Array(highlightItems?.itemRating)]?.map((len, index) => (
            <RatingStarIcon key={index} />
          ))}
        </p>
        <p className="text-[20px] font-normal font-[Lora]">{highlightItems?.itemTitle}</p>
        <p className="text-MidGrey">{highlightItems?.itemSubtitle}</p>
      </div>
      <div className="bg-PrimaryBlack p-2 w-[50px] h-[50px] rounded-lg">
        <Image width={0} height={0} alt={''} src={EmptyImage} className="h-8 w-8" />
      </div>
    </div>
  );
};

const SortHotel = ({ getCurrentCard, highlightHotels }: SortHotelProps) => {
  return (
    <div className="lg:w-1/2 py-12 pl-12 bg-PrimaryWhite rounded-l-xl">
      <Headlines
        title={highlightHotels?.mapHotelTitle}
        subtitle={highlightHotels?.mapHotelSubtitle}
        className="text-left pr-6"
      />
      <div className="h-[512px] w-[430px] overflow-y-scroll pr-6">
        {highlightHotels?.highlightItems?.map((item, idx) => (
          <SortHotelCard
            highlightItems={item}
            key={item.itemTitle}
            onClick={() => {
              getCurrentCard(item);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default SortHotel;
