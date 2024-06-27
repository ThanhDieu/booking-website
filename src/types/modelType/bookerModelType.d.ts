import { ReservationsType } from "./reservationModelType";

export enum GenderType {
  MALE = 'Male',
  FEMALE = 'Female',
  OTHER = 'Other',
}


/** booker interface type */
export interface BookerModelType {
  title: string;
  gender: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  note?:string;
  address: {
    addressLine1: string;
    postalCode: string;
    city: string;
    countryCode: string;
  };
};

export type AdditionalGuestType = Omit<BookerModelType, "address" | "email" | "gender" | "note">;


export interface BookingType {
  booker: BookerModelType;
  vouchers?: string[];
  bookerComment: string;
  reservations: ReservationsType[];
  offerId?: string;
  vouchers?: string[];
}
