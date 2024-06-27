/** slice type */
export interface SearchValueType {
  countryCode?: string;
  propertyId?: string;
  arrival?: number;
  departure?: number;
  adults: number;
  rooms: number;
  children: number;
  childrenAgeBelow?: number[] | any;
  landscape?: string;
  activities?: string[];
  mainActivity?: string;
  specialBundle?: string;
  periods?: Array<periodType>;
  maxStay?: number;
  minStay?: number;
  maxPersons?: number;
  maxRooms?: number;
  isHomePage?: boolean;
  isHotelpage?: boolean;
  daysOfWeek?: string[];
  timezone?: string;
  bundleId?: string;
  unitGroupId?: string;
  offerId?: string;
}

/** fetcher data type */
export interface FetchBundleType {
  dataSearch: SearchValueType;
  currentPage?: number;
  landscape?: string;
  activities?: string[];
  specials?: string[];
  controller?: AbortSignal;
}

/** filter search data type */
export interface FilterSearchType {
  landscape: string;
  activities: string[];
  specialBundle: string[];
}

/** bundle detail type **/
export interface SearValueDetailType {
  id: string;
  adults: number;
  rooms: number;
  arrival?: number;
  departure?: number;
  children: number[];
  timezone?: string;
}

/******************  STRAPI CONTENT TYPE  ********************* */
export interface StrapiResultPageType {
  readonly id: number;
  attributes: {
    dataNotification: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    filterName: {
      readonly id: number;
      priceRange: string;
      landscape: string;
      activities: string;
      specialOffer: string;
      priceContent: {
        min: string;
        max: string;
      };
    };
  };
}
