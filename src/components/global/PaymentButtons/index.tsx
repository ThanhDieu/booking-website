import React from 'react';
import ButtonShare from '../ButtonShare';
import { useIbeTranslation } from '@/hooks';
import { useRouter } from 'next/router';

export type PaymentButtonsProps = {
  onClick?: () => void;
  disabled?: boolean;
};

const PaymentButtons = ({ onClick, disabled }: PaymentButtonsProps) => {
  const router = useRouter();
  const step3 = useIbeTranslation('bookingSteps.step3');

  return (
    <div className="flex justify-between">
      <ButtonShare
        onClick={() => router.back()}
        size="medium"
        content={step3?.buttonText?.previous}
      />
      <ButtonShare
        style="dark"
        size="medium"
        htmlType="submit"
        onClick={onClick}
        content={step3?.buttonText?.next}
        spin={disabled}
        disable={disabled}
      />
    </div>
  );
};

export default PaymentButtons;
