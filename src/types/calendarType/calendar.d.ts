import { RateLevelType } from "@/components/Booking/partials/DatePickerSelected/DateRender";



export interface ClientDateType {
  amount: number;
  currency: CurrencyType;
  date: number;
  rateLevel: RateLevelType;
}

export interface CalendarParamsType {
  fromDate?: string;
  propertyId?: string;
  countryCode?: string;
}


export interface GuestRoomsType {
  room: number;
  adult: number;
  children: number;
  childrenAgeBelow?: number[];
}

export interface LocationSearchType {
  countryCode: string;
  propertyId: string;
}


