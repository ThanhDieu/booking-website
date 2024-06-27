import { BookerAddressFormViewProps } from "../BookerAddressFormItems";
import { BookerInfoFormViewProps } from "../BookerInfoFormItems";
import View from "./View";

export interface BookingItemProps {
  title: string,
  qty: number,
  amount: string,
  description?: string[]
}

export interface BookingSummaryItem {
  heading: string,
  items: BookingItemProps[],
}

export interface BookingSummaryModel {
  bookerInfo: BookerInfoFormViewProps,
  bookerAddress: BookerAddressFormViewProps,
  propertyLogo: string,
  items: BookingSummaryItem[],
  sum?: string,
  discount?: string,
  totalPrice: string,
  nextButtonText: string,
  previousButtonText: string,
}

interface BookingSummaryProps {
  data: BookingSummaryModel,
  handleNextButton: () => void,
  handlePreviousButton: () => void,
}

const BookingSummary = (props: BookingSummaryProps) => {
  const {
    handleNextButton,
    handlePreviousButton
  } = props;

  return <View model={props.data} handleNextButton={handleNextButton} handlePreviousButton={handlePreviousButton} />;
}

export default BookingSummary;
