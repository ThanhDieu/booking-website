export interface PaidListType  {
    foliosId: string;
    balance: {
      amount: string;
      currency: string;
    };
  }

export interface PaymentLinkListType {
    foliosId: string;
    paymentId: string;
    getLink: string;
}