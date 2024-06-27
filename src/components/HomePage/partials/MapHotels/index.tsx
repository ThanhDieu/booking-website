import { useState } from 'react';
// import SortHotel from './SortHotel';
import usePopupState from '@/hooks/usePopupMap';
import { HighlightItems, HotelHighlightProps } from '@/types/homePage';
import dynamic from 'next/dynamic';
import NewHighlightCard from './NewHighlightCard';
const NewMapHotel = dynamic(() => import('./NewMapHotel'), { ssr: false });
const SortHotel = dynamic(() => import('./SortHotel'), { ssr: false });

const MapHotels = ({ highlightHotels }: HotelHighlightProps) => {
  const [currentCard, setCurrentCard] = useState<HighlightItems>(
    highlightHotels?.highlightItems[0]
  );

  const { openPopup, handleMarkerClick } = usePopupState();

  const getCurrentCard = (highlightItems: HighlightItems) => {
    setCurrentCard(highlightItems);
    handleMarkerClick(highlightItems);
  };

  return (
    <div className="hidden lg:block relative z-10" id="section2">
      <div className="h-[90vh] overflow-hidden">
        <NewMapHotel
          highlightHotels={highlightHotels}
          openPopup={openPopup}
          handleMarkerClick={getCurrentCard}
        />
      </div>
      <div className="left-16 absolute top-16 z-[9999] pr-6">
        {currentCard && (
          <div className="flex gap-6 lg:flex-row lg:max-w-[982px] bg-PrimaryWhite rounded-l-lg">
            <SortHotel highlightHotels={highlightHotels} getCurrentCard={getCurrentCard} />
            <div className="rounded-r-lg">
              <NewHighlightCard
                highlightItems={currentCard}
                className="rounded-none rounded-tr-lg"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapHotels;
