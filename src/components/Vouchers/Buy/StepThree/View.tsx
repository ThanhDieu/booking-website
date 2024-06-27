import { useIbeTranslation } from '@/hooks';
import BookingSummary from '@/components/shared/BookingSummary/View';
import { BookerInfoFormViewProps } from '@/components/shared/BookerInfoFormItems';
import { BookerAddressFormViewProps } from '@/components/shared/BookerAddressFormItems';
import { BookingSummaryItem } from '@/components/shared/BookingSummary';
import ButtonShare from '@/components/global/ButtonShare';
import { useState } from 'react';

interface ViewProps {
  model: {
    bookerInfo: BookerInfoFormViewProps;
    bookerAddress: BookerAddressFormViewProps;
    items: BookingSummaryItem[];
    propertyLogo: string;
    totalPrice: string;
    previousButtonText: string;
    nextButtonText: string;
    paymentLink: string;
  };
  handleNextButton: () => void;
  handlePreviousButton: () => void;
}

const View = (props: ViewProps) => {
  const [clickedPayment, setClickedPayment] = useState(false);
  const paymentText = useIbeTranslation('bookingSteps.step4.buttonText.next');
  return (
    <div className="col-span-12">
      <div className="flex flex-wrap gap-4 items-baseline justify-between mb-8">
        <h2 className="text-2xl font-[lora] font-normal">
          {useIbeTranslation('bookingSteps.step4.title')}
        </h2>
        {/* static content */}
        <ButtonShare 
          disable={!props.model.paymentLink} 
          spin={!props.model.paymentLink || clickedPayment} 
          onClick={() => {
            setClickedPayment(true);
            window.open(props.model.paymentLink, '_blank')
          }}
          content={props.model.paymentLink ? paymentText : ""} 
          size="medium" 
          style="dark"
        />
      </div>
      <BookingSummary
        model={props.model}
        handleNextButton={props.handleNextButton}
        handlePreviousButton={props.handlePreviousButton}
      />
    </div>
  );
};

export default View;
