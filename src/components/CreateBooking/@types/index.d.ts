import { title } from 'process';
export default interface PaymentLayoutProps {}
export interface Step3Props {}

export enum FormType {
  Booker = 'booker',
  Guest = 'guest',
}
export interface BookerInfo {
  title: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  email?: string;
  birthday?: string;
}
export interface BookerProps {
  formType?: FormType.Booker | FormType.Guest;
  keyName?: string | number;
  defaultVal?: boolean;
  onChecked?: (checked: boolean) => void;
}
export interface BookerAddressProps {}

export interface GuestArriveProps {
  title?: string;
  subTitle?: string;
  dataContent?: React.ReactNode;
  onClick?: () => void;
}
export interface InfoContainerProps {}
export interface PaymentMethodProps {
  onChange?: (value: string) => void;
  child?: React.ReactNode;
  message?: React.ReactNode;
}

export interface SelectLocationProps {
  onChange: (value: string) => void;
  className?: string;
  width?: number;
}
export interface LocationOption {
  value: string;
  label: string;
}
export interface SSLProps {}
export interface VoucherProps {}
