import { Button } from 'antd';
import React, { useState } from 'react';
const Heading = () => {
  const [modal2Open, setModal2Open] = useState(false);

  const showModal = () => {
    setModal2Open(true);
  };

  const handleOk = () => {
    setModal2Open(false);
  };

  const handleCancel = () => {
    setModal2Open(false);
  };

  return (
    <div className="flex justify-between">
      <h2 className="font-[lora]">Booking comfirmation</h2>
      <Button
        onClick={showModal}
        size="large"
        className="bg-PrimaryBlack text-PrimaryWhite w-1/6 h-full"
      >
        Process to payment
      </Button>
    </div>
  );
};

export default Heading;
