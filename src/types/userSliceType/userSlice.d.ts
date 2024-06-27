import dayjs, { Dayjs } from 'dayjs';

export interface ProfilePayloadType {
  readonly userId: string;
  avatar: string;
  email: string;
  enabled: boolean;
  firstName: string;
  lastName: string;
  type: string;
  username: string;
}

export interface ProfileUpdatePayload extends Partial<ProfilePayloadType> {
  title?: string;
  gender?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  addressLine1?: string;
  country?: string;
  countryCode?: string;
  location?: string;
  postalCode?: string;
}

/** booking history type **/
export interface ReservationHistoryType {
  reservationId: string;
  bundle: {
    id: string;
    name: string;
    media: string;
    periods: { end: number, start: number }[],
    minimumStay: number
  };
  unitGroup: {
    id: string;
    name: string;
    media: string;
  };
  balance: {
    amount: number;
    currency: string;
  };
  property: {
    id: string;
    name: string;
    city: string;
    country: string;
    countryCode: string,
    disabled?: boolean
  };
  totalGrossAmount: {
    amount: number;
    currency: number;
  };
  adults: number;
  children: number[];
  arrival: number;
  departure: number;
  createdAt: number;
}
export interface BookingHistoryType {
  bookingId: string;
  reservations: ReservationHistoryType[];
}

/** user post activities history type */
export interface UserPostActivitiesType {
  adults: number;
  arrival: number;
  departure: number;
  childs: number;
  bundleId: string;
  propertyId: string;
  bundleUpgradeId: string;
}
