import { FoliosPayloadType } from "@/types/foliosSliceType/foliosSlice";

export type PaymentLinkType = {
    foliosId: string;
    paymentLink: string;
}

export type PaymentItemProps = {
    bookingId?: string;
    data?: FoliosPayloadType;
    onClick?: () => void;
  };
  