import { useState } from 'react';
import RadioInput, { RadioInputViewProps } from '@/components/shared/RadioInput';
import { RecipientFormViewProps } from '@/components/shared/RecipientFormItems';
import { BookerInfoFormViewProps } from '@/components/shared/BookerInfoFormItems';
import RecipientFormItems from '@/components/shared/RecipientFormItems';
import BookerInfoFormItems from '@/components/shared/BookerInfoFormItems';
import { ChangeProps } from '@/components/shared/RecipientFormItems/types';
import SSL from '@/components/CreateBooking/partials/SSL';
import { methodData } from '@/constants/paymentMethodData';
import PaymentMethod from '@/components/shared/PaymentMethods';
import { Form, FormInstance } from 'antd';
import BookerAddressFormItems, {
  BookerAddressFormViewProps,
} from '@/components/shared/BookerAddressFormItems';
import ButtonShare from '@/components/global/ButtonShare';
import { useIbeTranslation } from '@/hooks';

interface ViewProps {
  model: {
    buyForData: RadioInputViewProps;
    shippingMethodData: RadioInputViewProps;
    recipientFormData: RecipientFormViewProps;
    bookerFormData: BookerInfoFormViewProps;
    addressFormData: BookerAddressFormViewProps;
  };
  setBuyForData: (value: string) => void;
  setShippingMethodData: (value: string) => void;
  formInstance: FormInstance;
  handleRecipientFormChange: (change: ChangeProps) => void;
  handleBookingFormChange: (change: ChangeProps) => void;
  handleAddressFormChange: (change: ChangeProps) => void;
  handleNextButton: () => void;
  handlePreviousButton: () => void;
}

const View = (props: ViewProps) => {
  const {
    model: { buyForData, shippingMethodData, recipientFormData, bookerFormData, addressFormData },
    setBuyForData,
    setShippingMethodData,
    handleRecipientFormChange,
    handleBookingFormChange,
    handleAddressFormChange,
    handleNextButton,
    handlePreviousButton,
    formInstance,
  } = props;

  const [isCheckedPolicy, setIsCheckedPolicy] = useState(true);

  return (
    <>
      <div className="lg:col-span-6 col-span-9 gap-y-8 bg-primary-switch p-6 rounded-md">
        <SSL />
        <div className="bg-primary-switch w-full rounded-lg">
          <RadioInput data={buyForData} setSelectedValue={setBuyForData} />
          <RadioInput data={shippingMethodData} setSelectedValue={setShippingMethodData} />
          <Form form={formInstance} scrollToFirstError>
            <RecipientFormItems
              data={recipientFormData}
              handleFieldChange={handleRecipientFormChange}
            />
            <BookerInfoFormItems
              data={bookerFormData}
              handleFieldChange={handleBookingFormChange}
            />
            <BookerAddressFormItems
              data={addressFormData}
              handleFieldChange={handleAddressFormChange}
            />
            <PaymentMethod
              data={{ methods: methodData, isCheckedPolicy }}
              setIsCheckedPolicy={setIsCheckedPolicy}
              handleSelectPayment={(value: string) => {}}
            />
          </Form>

          <div className="flex w-full justify-between mt-8">
            <ButtonShare
              onClick={handlePreviousButton}
              size="medium"
              content={useIbeTranslation('bookingSteps.step3.buttonText.previous')}
            />
            <ButtonShare
              style="dark"
              size="medium"
              htmlType="submit"
              onClick={handleNextButton}
              content={useIbeTranslation('bookingSteps.step3.buttonText.next')}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default View;
