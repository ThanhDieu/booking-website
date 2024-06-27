/** voucher type */
export interface VoucherBEPayloadType {
  voucherId: string;
  code: string;
  status: string;
  voucherData: {
    value: number;
    currency: string;
    hotel: string;
    date: number;
    email: string;
    validity: string;
  };
}
