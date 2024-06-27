import { EmptyImage } from '@/constants/imageUrl';
import { HighlightHotels, HighlightItems } from '@/types/homePage';
import getImagePath from '@/util/getImagePath';
import Leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer as LeafletMap, Marker, Popup, TileLayer, ZoomControl } from 'react-leaflet';

const MultipleMarkers = (
  highlightHotels: HighlightItems[],
  openPopup?: HighlightItems,
  handleMarkerClick?: (value: HighlightItems) => void
) => {
  return highlightHotels?.map((hotel, index) => {
    const icon = Leaflet.icon({
      // iconSize: [32, 32],
      iconAnchor: [10, 41],
      popupAnchor: [2, -40],
      iconUrl: EmptyImage,
      shadowUrl: '',
      className:
        (openPopup &&
          hotel?.latitude === openPopup.latitude &&
          hotel?.longitude === openPopup.longitude) ||
        (!openPopup && index === 0)
          ? 'bg-PrimaryBlue !z-[9999] w-[50px] h-[50px] rounded-lg'
          : 'bg-PrimaryBlack p-8 rounded-lg',
    });
    return (
      <Marker
        key={index}
        position={[hotel.latitude || 0, hotel.longitude || 0]}
        icon={icon}
        eventHandlers={{
          click: (e) => {
            handleMarkerClick && handleMarkerClick(hotel);
          },
        }}
      >
        {
          <Popup>
            <p className="font-[Lora] text-xl font-normal leading-5 text-PrimaryBlack !m-0">
              {hotel.itemTitle}
            </p>
            <p className="text-xs leading-4 text-SecondaryBlack font-[Inter] !m-0">
              {hotel.itemSubtitle}
            </p>
          </Popup>
        }
        {/* <Tooltip>{hotel.itemDescription}</Tooltip> */}
      </Marker>
    );
  });
};

interface NewHighlightProps {
  openPopup?: HighlightItems;
  highlightHotels: HighlightHotels;
  handleMarkerClick?: (value: HighlightItems) => void;
}

const NewMapHotel = ({ highlightHotels, openPopup, handleMarkerClick }: NewHighlightProps) => {
  return (
    <LeafletMap
      scrollWheelZoom={false}
      zoomControl={false}
      center={[50.85335829943789, 5.7578824715736445]}
      zoom={7}
      className="h-[100vh]"
    >
      <ZoomControl position="topright" />
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {highlightHotels?.highlightItems?.length &&
        MultipleMarkers(highlightHotels.highlightItems, openPopup, handleMarkerClick)}
    </LeafletMap>
  );
};

export default NewMapHotel;
