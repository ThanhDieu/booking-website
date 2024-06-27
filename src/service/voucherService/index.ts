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
export interface voucherServiceOptions {
  axios?: AxiosInstance;
  /** only in axios interceptor config*/
  loading: boolean;
  showError: boolean;
}

// Add default options
export const voucherServiceOptions: voucherServiceOptions = {};

// Instance selector
export function axios(configs: IRequestConfig, resolve: (p: any) => void, reject: (p: any) => void): Promise<any> {
  if (voucherServiceOptions.axios) {
    return voucherServiceOptions.axios
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
    loading: voucherServiceOptions.loading,
    showError: voucherServiceOptions.showError,
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

export class AdminVoucherService {
  /**
   * Get Vouchers
   */
  static getAdminVouchers(
    params: {
      /** status */
      status?: string;
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
      let url = 'admin/vouchers';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        status: params['status'],
        perPage: params['perPage'],
        currentPage: params['currentPage'],
        sorts: params['sorts']
      };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Create Voucher
   */
  static createAdminVoucher(
    params: {
      /** createVoucher */
      createVoucher: backend_CreateVoucher;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = 'admin/vouchers';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params['createVoucher'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Check Voucher
   */
  static checkAdminVoucher(
    params: {
      /** code */
      code: string;
      /** propertyId */
      propertyId: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = 'admin/vouchers/check';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { code: params['code'], propertyId: params['propertyId'] };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
}

export class IbeVoucherService {
  /**
   * Get Vouchers
   */
  static getIbeVouchers(
    params: {
      /** status */
      status?: string;
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
      let url = 'vouchers';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        status: params['status'],
        perPage: params['perPage'],
        currentPage: params['currentPage'],
        sorts: params['sorts']
      };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Create Voucher
   */
  static createIbeVoucher(
    params: {
      /** createVoucher */
      createVoucher: backend_CreateVoucher;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = 'vouchers';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params['createVoucher'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Check Voucher
   */
  static checkIbeVoucher(
    params: {
      /** code */
      code: string;
      /** propertyId */
      propertyId: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = 'vouchers/check';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { code: params['code'], propertyId: params['propertyId'] };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
}

export interface backend_CreateVoucher {
  /**  */
  currency: string;

  /**  */
  email: string;

  /**  */
  hotel: string;

  /**  */
  name: string;

  /**  */
  ref: string;

  /**  */
  value: number;
}
