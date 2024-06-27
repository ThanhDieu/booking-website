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
export interface FinanceServiceOptions {
  axios?: AxiosInstance;
  /** only in axios interceptor config*/
  loading: boolean;
  showError: boolean;
}

// Add default options
export const financeServiceOptions: FinanceServiceOptions = {};

// Instance selector
export function axios(configs: IRequestConfig, resolve: (p: any) => void, reject: (p: any) => void): Promise<any> {
  if (financeServiceOptions.axios) {
    return financeServiceOptions.axios
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
    loading: financeServiceOptions.loading,
    showError: financeServiceOptions.showError,
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

export class CreateAdyenPaymentLinkService {
  /**
   * Create Adyen PaymentLink
   */
  static createAdyenPaymentLink(
    params: {
      /** createPaymentLink */
      createPaymentLink: backend_CreatePaymentLink;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = '/finance/adyen/payments/by-link';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params['createPaymentLink'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
}

export class FolioActionsService {
  /**
   * Adds a charge for any good or service, and directly posts it. Can be used to charge items that are not part of the reservation,but should appear on the invoice.
   */
  static addCharge(
    params: {
      /** folioId */
      folioId: string;
      /** AddCharge */
      addCharge: backend_AddCharge;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = '/finance/v1/folio-actions/{folioId}/charges';
      url = url.replace('{folioId}', params['folioId'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params['addCharge'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
}

export class FinanceService {
  /**
   * Get a list of all folios
   */
  static getFolios(
    params: {
      /** reservationId */
      reservationId?: string;
      /** bookingId */
      bookingId?: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = '/finance/v1/folios';
      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { bookingId: params['bookingId'] };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * create a new folio.
   */
  static createAFolios(
    params: {
      /** Folio */
      folio: backend_Folio;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = '/finance/v1/folios';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params['folio'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get one folios
   */
  static getOneFolios(
    params: {
      /** id */
      id: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = '/finance/v1/folios/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get payments
   */
  static getPayments(
    params: {
      /** id */
      id: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = '/finance/v1/folios/{id}/payments';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Payment by cash
   */
  static paymentByCash(
    params: {
      /** id */
      id: string;
      /** PaymentByCash */
      paymentByCash: backend_PaymentByCash;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = '/finance/v1/folios/{id}/payments';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params['paymentByCash'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Payment by link
   */
  static paymentByLink(
    params: {
      /** id */
      id: string;
      /** PaymentByLink */
      paymentByLink: backend_PaymentByLink;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = '/finance/v1/folios/{id}/payments/by-link';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params['paymentByLink'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
}

export interface backend_AddCharge {
  /**  */
  amount?: backend_Amount;

  /**  */
  name?: string;

  /**  */
  quantity?: number;

  /**  */
  receipt?: string;

  /**  */
  serviceType?: string;

  /**  */
  vatType?: string;
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

export interface backend_Amount {
  /**  */
  amount?: number;

  /**  */
  currency?: string;
}

export interface backend_CreatePaymentLink {
  /**  */
  amount?: backend_Amount;

  /**  */
  reference?: string;
}

export interface backend_Debitor {
  /**  */
  address?: backend_Address;

  /**  */
  first_name?: string;

  /**  */
  name?: string;

  /**  */
  reference?: string;

  /**  */
  title?: string;

  /**  */
  type?: string;
}

export interface backend_Folio {
  /**  */
  debitor?: backend_Debitor;

  /**  */
  property_id?: string;

  /**  */
  type?: string;
}

export interface backend_PaymentByCash {
  /**  */
  amount?: backend_Amount;

  /**  */
  method?: string;

  /**  */
  receipt?: string;
}

export interface backend_PaymentByLink {
  /**  */
  amount?: backend_Amount;

  /**  */
  countryCode?: string;

  /**  */
  description?: string;

  /**  */
  expiresAt?: string;

  /**  */
  payerEmail?: string;
}
