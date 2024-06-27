import { BuyVoucherProps } from '@/pages/vouchers/[voucherId]';
import VoucherList from '../partials/VoucherList';
import Steps from '@/components/shared/Steps';
import BookingInvoice from '@/components/shared/BookingInvoice';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import StepFour from './StepFour';
import { ChangeProps } from '@/components/shared/RecipientFormItems/types';
import { Wrapper } from '@/components/global/Wrapper';

interface ViewProps {
  model: BuyVoucherProps;
  onClickNextStep: (activeStep: number) => void;
  onClickPreviousStep: (activeStep: number) => void;
  handleRecipientFormChange: (change: ChangeProps) => void;
  handleBookingFormChange: (change: ChangeProps) => void;
  handleAddressFormChange: (change: ChangeProps) => void;
  handleBuyForChange: (change: string) => void;
  handleShippingChange: (change: string) => void;
}

const View = (props: ViewProps) => {
  const {
    model: {
      voucher,
      vouchers,
      buySteps,
      recipient,
      booker,
      address,
      formInstance,
      buyFor,
      shippingMethod,
    },
    onClickNextStep,
    onClickPreviousStep,
    handleRecipientFormChange,
    handleBookingFormChange,
    handleAddressFormChange,
    handleBuyForChange,
    handleShippingChange,
  } = props;

  const handleOnClickNextStep = () => {
    onClickNextStep(buySteps.activeStep);
  };

  const handleOnClickPreviousStep = () => {
    onClickPreviousStep(buySteps.activeStep);
  };
  
  return (
    <div className="grid grid-cols-1 min-h-[490px]">
      <Steps data={buySteps} />
      <Wrapper>
        <div className="grid grid-cols-9 gap-8 rounded-xl">
          {buySteps.activeStep === 1 && <StepOne data={{ voucher }} />}
          {buySteps.activeStep === 2 && (
            <StepTwo
              data={{ recipient, booker, address, buyFor, shippingMethod }}
              formInstance={formInstance}
              handleBuyForChange={handleBuyForChange}
              handleShippingChange={handleShippingChange}
              handleRecipientFormChange={handleRecipientFormChange}
              handleBookingFormChange={handleBookingFormChange}
              handleAddressFormChange={handleAddressFormChange}
              handleNextButton={handleOnClickNextStep}
              handlePreviousButton={handleOnClickPreviousStep}
            />
          )}
          {buySteps.activeStep === 3 && (
            <StepThree
              data={{
                buyFor,
                shippingMethod,
                bookerInfo: booker,
                bookerAddress: address,
                voucher,
              }}
              handleNextButton={handleOnClickNextStep}
              handlePreviousButton={handleOnClickPreviousStep}
            />
          )}
          {buySteps.activeStep === 4 && (
            <StepFour data={{ voucher, booker: booker.fields, address: address.fields }} />
          )}

          {(buySteps.activeStep === 1 || buySteps.activeStep === 2) && (
            <div className="lg:col-span-3 col-span-9 lg:pl-12 relative">
              <BookingInvoice
                className="bg-primary-switch"
                id="booking-voucher"
                header="Your Booking"
                total={voucher.value.toString()}
                voucher={voucher.title}
                buttonText="Process to next step"
                onClick={handleOnClickNextStep}
              />
            </div>
          )}
        </div>

        {buySteps.activeStep === 1 && <VoucherList data={{ vouchers }} />}
      </Wrapper>
    </div>
  );
};

export default View;
