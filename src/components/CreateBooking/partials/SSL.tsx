import Image from 'next/image';
import React from 'react';
import { SSLProps } from '../@types';
import { useIbeTranslation } from '@/hooks';

const SSL = ({ }: SSLProps) => {
  const secureBookingAlert = useIbeTranslation('bookingSteps.step3.secureBookingAlert');

  return (
    <div className="bg-primary-switch p-6 rounded-xl flex xl:flex-row flex-col gap-4">
      <Image
        className="w-20 h-20"
        src={require('../../../../public/images/payment/SSLPayment.png')}
        alt=""
        height={0}
        width={0}
      />
      <div>
        <h2 className="text-2xl font-[lora] font-normal pb-2">{secureBookingAlert?.title}</h2>
        <p className="text-sm ">{secureBookingAlert?.subtitle}</p>
        <p className="text-xs  font-light">{secureBookingAlert?.description}</p>
      </div>
    </div>
  );
};

export default SSL;
