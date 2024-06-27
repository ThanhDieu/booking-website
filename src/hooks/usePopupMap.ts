import { useState } from 'react';

export default function usePopupState() {
  const [openPopup, setOpenPopup] = useState(undefined);

  const handleMapClick = (e: any) => {
    setOpenPopup(undefined); // Close any open popups on map click
  };

  const handleMarkerClick = (markerIndex: any) => {
    setOpenPopup(markerIndex);
  };

  return { openPopup, handleMarkerClick, handleMapClick };
}
