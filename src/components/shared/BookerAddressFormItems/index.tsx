import { ChangeProps } from "./types";
import View from "./View";

export interface BookerAddressProps {
  street?: string,
  postalCode?: string,
  region?: string,
  city?: string,
  note?: string
}

export interface BookerAddressFormViewProps {
  fields: BookerAddressProps,
  title?: string,
}

export interface BookerAddressFormProps {
  data: BookerAddressFormViewProps,
  handleFieldChange: (change: ChangeProps) => void
}

const BookerAddressForm = (props: BookerAddressFormProps) => {
  return (
    <View
      model={props.data}
      onFieldChange={props.handleFieldChange}
    />
  )
}

export default BookerAddressForm;
