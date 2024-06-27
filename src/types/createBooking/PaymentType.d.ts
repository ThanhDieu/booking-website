

export interface PaymentLinkType {
  amount: {
    amount: number;
    currency: string;
  };
  expiresAt: string;
  countryCode: string;
  description?: string;
  payerEmail?: string;
}

export interface PaymentDataSliceType {
  foliosId: string;
  balance: number;
}

/** country code type */
export type CountryCodeType = {
  countryCode: string;
  countryName: string;
} 

