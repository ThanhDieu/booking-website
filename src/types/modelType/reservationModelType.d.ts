
export enum ChannelCode {
  DIRECT = 'Direct',
}


export interface ServiceType {
    serviceId: string;
    count: number;
  }
  
  export interface PrimaryGuestType {
    title: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
  }

  export interface AdditionalGuest extends Omit<PrimaryGuestType, "email"> {

  }
  
  export interface ReservationsType {
    bundlePriceId: string;
    arrival: number;
    departure: number;
    adults: number;
    childrenAges: number[];
    primaryGuest: PrimaryGuestType;
    additionalGuests: AdditionalGuest[];
    channelCode: ChannelCode.Direct;
    services: ServiceType[];
    guaranteeType: string;
  };

  export interface ReservationPayloadType {
    bookingId: string;
    reservationIds: string[];
}