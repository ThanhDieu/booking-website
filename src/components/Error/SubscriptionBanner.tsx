import { Checkbox, Form, Input, Modal } from 'antd';
import ButtonShare from '../global/ButtonShare';
import { useState } from 'react';

const SubscriptionBanner = () => {
  const [policy, setPolicy] = useState<boolean>(false);
  const [checkRequired, setCheckRequired] = useState<boolean>(false);

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
    <div className="w-full bg-PrimaryBlue py-10 px-4">
      <div className="flex flex-col lg:flex-row justify-center gap-4 lg:gap-32">
        <div className="flex flex-col text-PrimaryWhite justify-center">
          <h3 className=" font-normal text-2xl">Get the latest offers and exclusive benefits</h3>
          <p className=" text-sm">Subscribe to the Sonnenhotels newsletter now</p>
        </div>
        <div>
          <Form>
            <div className="flex gap-6">
              <Input placeholder="Email address" size="large" className="w-[355px]" />
              <ButtonShare
                className="h-full !bg-PrimaryWhite !text-PrimaryBlue hover:opacity-60 !px-12"
                content="Send"
                onClick={showModal}
              />
              <Modal
                className=" overflow-y-auto"
                title="Coming soon"
                centered
                open={modal2Open}
                onOk={handleOk}
                onCancel={handleCancel}
              >
                <p>Feature under development</p>
              </Modal>
            </div>

            <Checkbox
              className="mt-2"
              onClick={() => setPolicy((current) => !current)}
              checked={policy}
              style={{ lineHeight: '32px' }}
            >
              <p className="text-PrimaryWhite leading-5">
                I have read the data protection regulations and expressly accept them.
              </p>
            </Checkbox>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionBanner;
