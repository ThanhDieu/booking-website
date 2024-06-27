import { FormInstance } from 'antd';
import View from "./View";
import { BUY_FOR, buyForOptions, shippingMethodOptions } from "./constant";
import { RecipientFormViewProps } from "@/components/shared/RecipientFormItems";
import { BookerInfoFormViewProps } from "@/components/shared/BookerInfoFormItems";
import { ChangeProps } from "@/components/shared/RecipientFormItems/types";
import { BookerAddressFormViewProps } from '@/components/shared/BookerAddressFormItems';

export interface StepTwoProps {
  data: {
    buyFor: string,
    shippingMethod: string,
    recipient: RecipientFormViewProps,
    booker: BookerInfoFormViewProps,
    address: BookerAddressFormViewProps
  },
  formInstance: FormInstance,
  handleRecipientFormChange: (change: ChangeProps) => void;
  handleBookingFormChange: (change: ChangeProps) => void;
  handleAddressFormChange: (change: ChangeProps) => void;
  handleBuyForChange: (change: string) => void;
  handleShippingChange: (change: string) => void;
  handleNextButton: () => void;
  handlePreviousButton: () => void;
}

const StepTwo = (props: StepTwoProps) => {
  const { buyFor, shippingMethod } = props.data;
  const { handleRecipientFormChange, handleBookingFormChange, handleAddressFormChange, handleBuyForChange, handleShippingChange, handleNextButton, handlePreviousButton } = props;

  const buyForData = {
    name: "buyFor",
    title: "To whom",
    subTitle: "",
    options: buyForOptions,
    selectedValue: buyFor
  }

  const shippingMethodData = {
    name: "shippingMethod",
    title: "Shipping Method",
    subTitle: "Discover diverse shipping methods designed to accommodate your specific delivery requirements.",
    options: shippingMethodOptions,
    selectedValue: shippingMethod
  }

  const model = {
    buyForData,
    shippingMethodData,
    recipientFormData: props.data.recipient,
    bookerFormData: props.data.booker,
    addressFormData: props.data.address
  }

  model.recipientFormData.showEmail = (buyFor === BUY_FOR.recipient);

  return <View
    model={model}
    formInstance={props.formInstance}
    setBuyForData={handleBuyForChange}
    setShippingMethodData={handleShippingChange}
    handleRecipientFormChange={handleRecipientFormChange}
    handleBookingFormChange={handleBookingFormChange}
    handleAddressFormChange={handleAddressFormChange}
    handleNextButton={handleNextButton}
    handlePreviousButton={handlePreviousButton}
  />
}

export default StepTwo;
