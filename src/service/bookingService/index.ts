/** Generate by swagger-axios-codegen */
// @ts-nocheck
/* eslint-disable */

/** Generate by swagger-axios-codegen */
/* eslint-disable */
// @ts-nocheck
import axiosStatic, { AxiosInstance, AxiosRequestConfig } from 'axios';

export interface IRequestOptions extends AxiosRequestConfig {
  /** only in axios interceptor config*/
  loading?: boolean;
  showError?: boolean;
}

export interface IRequestConfig {
  method?: any;
  headers?: any;
  url?: any;
  data?: any;
  params?: any;
}

// Add options interface
export interface BookingsServiceOptions {
  axios?: AxiosInstance;
  /** only in axios interceptor config*/
  loading: boolean;
  showError: boolean;
}

// Add default options
export const bookingsServiceOptions: BookingsServiceOptions = {};

// Instance selector
export function axios(configs: IRequestConfig, resolve: (p: any) => void, reject: (p: any) => void): Promise<any> {
  if (bookingsServiceOptions.axios) {
    return bookingsServiceOptions.axios
      .request(configs)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  } else {
    throw new Error('please inject yourself instance like axios  ');
  }
}

export function getConfigs(method: string, contentType: string, url: string, options: any): IRequestConfig {
  const configs: IRequestConfig = {
    loading: bookingsServiceOptions.loading,
    showError: bookingsServiceOptions.showError,
    ...options,
    method,
    url
  };
  configs.headers = {
    ...options.headers,
    'Content-Type': contentType
  };
  return configs;
}

export const basePath = '';

export interface IList<T> extends Array<T> {}
export interface List<T> extends Array<T> {}
export interface IDictionary<TValue> {
  [key: string]: TValue;
}
export interface Dictionary<TValue> extends IDictionary<TValue> {}

export interface IListResult<T> {
  items?: T[];
}

export class ListResultDto<T> implements IListResult<T> {
  items?: T[];
}

export interface IPagedResult<T> extends IListResult<T> {
  totalCount?: number;
  items?: T[];
}

export class PagedResultDto<T = any> implements IPagedResult<T> {
  totalCount?: number;
  items?: T[];
}

// customer definition
// empty

export class AdminActivityBookingService {
  /**
   * Get all activities bookings
   */
  static getAllActivitiesBookings(
    params: {
      /** perPage */
      perPage?: number;
      /** currentPage */
      currentPage?: number;
      /** sorts */
      sorts?: string[];
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = '/bookings/activities';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { perPage: params['perPage'], currentPage: params['currentPage'], sorts: params['sorts'] };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Create activity booking
   */
  static createActivityBooking(
    params: {
      /** CreateActivityBooking */
      createActivityBooking: backend_CreateActivityBooking;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = '/bookings/activities';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params['createActivityBooking'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Delete activity booking
   */
  static deleteActivityBooking(
    params: {
      /** id */
      id: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = '/bookings/activities/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
}

export class BookerService {
  /**
   * Get all bookers
   */
  static getAllBookers(
    params: {
      /** search */
      search?: string;
      /** perPage */
      perPage?: number;
      /** currentPage */
      currentPage?: number;
      /** sorts */
      sorts?: string[];
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = '/admin/bookings/bookers';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        search: params['search'],
        perPage: params['perPage'],
        currentPage: params['currentPage'],
        sorts: params['sorts']
      };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
}

export class BookingService {
  /**
   * Create booking
   */
  static createBooking(
    params: {
      /** CreateBooking */
      createBooking: backend_CreateBooking;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = '/bookings';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params['createBooking'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get bookings history
   */
  static getBookingsHistory(
    params: {
      /** perPage */
      perPage?: number;
      /** currentPage */
      currentPage?: number;
      /** sorts */
      sorts?: string[];
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = '/bookings/history';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { perPage: params['perPage'], currentPage: params['currentPage'], sorts: params['sorts'] };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get bookings with lastName and bookingId
   */
  static getBookingsLastNameBookingId(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = '/bookings/search';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
}

export class PaymentService {
  /**
   * Get payment currencies
   */
  static getPaymentCurrencies(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = '/bookings/payments/currencies';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get payment location
   */
  static getPaymentLocation(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = '/bookings/payments/locations';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
}

export interface backend_AddReservations {
  /**  */
  reservations?: backend_CreateReservation[];
}

export interface backend_AddService {
  /**  */
  amount?: backend_Amount;

  /**  */
  count?: number;

  /**  */
  'dates.omitempty'?: backend_ServiceDate[];

  /**  */
  serviceId: string;
}

export interface backend_Address {
  /**  */
  addressLine1?: string;

  /**  */
  addressLine2?: string;

  /**  */
  city?: string;

  /**  */
  country?: string;

  /**  */
  countryCode?: string;

  /**  */
  location?: string;

  /**  */
  postalCode?: string;
}

export interface backend_AmendReservation {
  /**  */
  adults?: number;

  /**  */
  arrival?: number;

  /**  */
  departure?: number;

  /**  */
  timeSlices?: backend_TimeSlice[];
}

export interface backend_Amount {
  /**  */
  amount?: number;

  /**  */
  currency?: string;
}

export interface backend_BookingService {
  /**  */
  count?: number;

  /**  */
  serviceId?: string;
}

export interface backend_Company {
  /**  */
  name?: string;

  /**  */
  taxId?: string;
}

export interface backend_CreateActivityBooking {
  /**  */
  adults: number;

  /**  */
  arrival: number;

  /**  */
  bundleId?: string;

  /**  */
  bundleUpgradeId: string;

  /**  */
  childs?: number;

  /**  */
  departure: number;

  /**  */
  propertyId: string;
}

export interface backend_CreateBooker {
  /**  */
  address?: backend_Address;

  /**  */
  birthDate?: string;

  /**  */
  birthPlace?: string;

  /**  */
  comment?: string;

  /**  */
  company?: backend_Company;

  /**  */
  email?: string;

  /**  */
  firstName?: string;

  /**  */
  gender?: string;

  /**  */
  identificationIssueDate?: string;

  /**  */
  identificationNumber?: string;

  /**  */
  identificationType?: string;

  /**  */
  lastName: string;

  /**  */
  middleInitial?: string;

  /**  */
  nationalityCountryCode?: string;

  /**  */
  phone?: string;

  /**  */
  preferredLanguage?: string;

  /**  */
  title?: string;

  /**  */
  travelPurpose?: string;
}

export interface backend_CreateBooking {
  /**  */
  booker: backend_CreateBooker;

  /**  */
  bookerComment?: string;

  /**  */
  reservations: backend_CreateReservation[];
}

export interface backend_CreateReservation {
  /**  */
  additionalGuests?: backend_CreateBooker[];

  /**  */
  adults?: number;

  /**  */
  arrival: number;

  /**  */
  bundlePriceId: string;

  /**  */
  channelCode: string;

  /**  */
  childrenAges?: number[];

  /**  */
  departure: number;

  /**  */
  guaranteeType?: string;

  /**  */
  primaryGuest?: backend_CreateBooker;

  /**  */
  services?: backend_BookingService[];

  /**  */
  travelPurpose?: string;
}

export interface backend_ServiceDate {
  /**  */
  amount?: backend_Amount;

  /**  */
  count?: number;

  /**  */
  serviceDate?: string;
}

export interface backend_TimeSlice {
  /**  */
  ratePlanId?: string;

  /**  */
  totalAmount?: backend_TotalAmount;
}

export interface backend_TotalAmount {
  /**  */
  amount?: number;

  /**  */
  currency?: string;
}
