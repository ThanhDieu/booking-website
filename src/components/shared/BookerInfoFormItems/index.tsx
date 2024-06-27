import { ChangeProps } from './types';
import View from './View';

export interface BookerInfoProps {
  title?: string;
  firstName?: string;
  lastName: string;
  phone?: string;
  email: string;
}

export interface BookerInfoFormViewProps {
  fields: BookerInfoProps;
  title?: string;
}

export interface BookerInfoFormProps {
  data: BookerInfoFormViewProps;
  handleFieldChange: (change: ChangeProps) => void;
}

const BookerInfoFormItems = (props: BookerInfoFormProps) => {
  return <View model={props.data} onFieldChange={props.handleFieldChange} />;
};

export default BookerInfoFormItems;
