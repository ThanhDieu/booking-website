
import BaseType from "../base";
import { ServiceAddonsType } from "../invoceSliceType/invoceSliceType";
import { VoucherBEPayloadType } from "../voucherSliceType/voucherSliceType";

interface Invoice extends BaseType {
  header: string;
  voucher?: string;
  rooms?: string | number | string[];
  addonsBase?: ServiceAddonsType[];
  addons?: ServiceAddonsType[];
  disable?: boolean;
  buttonText?: string;
  total: string;
  voucherData?: VoucherBEPayloadType[];
  subTotal?: string;
  onClick?: () => void;
  onDispatch?: (service: ServiceAddonsType) => void;
  className?: string;
  onClear?: (value?: string) => void;
  offerDetail?: any
}

export default Invoice;
