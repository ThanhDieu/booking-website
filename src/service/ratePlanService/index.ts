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
export interface RatePlanServiceOptions {
  axios?: AxiosInstance;
  /** only in axios interceptor config*/
  loading: boolean;
  showError: boolean;
}

// Add default options
export const ratePlanServiceOptions: RatePlanServiceOptions = {};

// Instance selector
export function axios(configs: IRequestConfig, resolve: (p: any) => void, reject: (p: any) => void): Promise<any> {
  if (ratePlanServiceOptions.axios) {
    return ratePlanServiceOptions.axios
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
    loading: ratePlanServiceOptions.loading,
    showError: ratePlanServiceOptions.showError,
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

export class RatePlanService {
  /**
   * Get rate plans
   */
  static getRatePlans(
    params: {
      /** propertyId */
      propertyId: string;
      /** unitGroupId */
      unitGroupId?: string;
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
      let url = '/admin/rateplans';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        propertyId: params['propertyId'],
        unitGroupId: params['unitGroupId'],
        perPage: params['perPage'],
        currentPage: params['currentPage'],
        sorts: params['sorts']
      };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get rate plan by id
   */
  static getRatePlanById(
    params: {
      /** id */
      id: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = '/admin/rateplans/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
}

export class CancellationPolicyService {
  /**
   * Get cancellation policy
   */
  static getCancellationPolicy(
    params: {
      /** propertyId */
      propertyId?: string;
      /** isGlobal */
      isGlobal?: boolean;
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
      let url = '/admin/rateplans/cancellation-policies';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        propertyId: params['propertyId'],
        isGlobal: params['isGlobal'],
        perPage: params['perPage'],
        currentPage: params['currentPage'],
        sorts: params['sorts']
      };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Create cancellation policy
   */
  static createCancellationPolicy(
    params: {
      /** CreateCancellationPolicy */
      createCancellationPolicy: backend_CreateCancellationPolicy;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = '/admin/rateplans/cancellation-policies';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params['createCancellationPolicy'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get cancellation policy by id
   */
  static getCancellationPolicyById(
    params: {
      /** id */
      id: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = '/admin/rateplans/cancellation-policies/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
}

export class RateService {
  /**
   * Get Rate by day
   */
  static getRateByDay(
    params: {
      /** ratePlanId */
      ratePlanId?: string;
      /** from */
      from?: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = '/admin/rateplans/rate-by-day';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { ratePlanId: params['ratePlanId'], from: params['from'] };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get Rates
   */
  static getRates(
    params: {
      /** ratePlanIds */
      ratePlanIds?: string[];
      /** propertyId */
      propertyId: string;
      /** from */
      from?: string;
      /** to */
      to?: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = '/admin/rateplans/rates';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        ratePlanIds: params['ratePlanIds'],
        propertyId: params['propertyId'],
        from: params['from'],
        to: params['to']
      };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get Rate Calendar
   */
  static getRateCalendar(
    params: {
      /** fromDate */
      fromDate?: number;
      /** propertyId */
      propertyId?: string;
      /** countryCode */
      countryCode?: string;
      /** timeZone */
      timeZone?: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = '/rateplans/rates/calendar';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        fromDate: params['fromDate'],
        propertyId: params['propertyId'],
        countryCode: params['countryCode'],
        timeZone: params['timeZone']
      };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
}

export class ServiceService {
  /**
   * Get admin services
   */
  static getAdminService(
    params: {
      /** propertyId */
      propertyId?: string;
      /** tagIds */
      tagIds?: string[];
      /** serviceType */
      serviceType?: string;
      /** name */
      name?: string;
      /** disabled */
      disabled?: boolean;
      /** expands */
      expands?: string[];
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
      let url = '/admin/rateplans/services';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        propertyId: params['propertyId'],
        tagIds: params['tagIds']?.toString(),
        serviceType: params['serviceType'],
        name: params['name'],
        disabled: params['disabled'],
        expands: params['expands'],
        perPage: params['perPage'],
        currentPage: params['currentPage'],
        sorts: params['sorts']
      };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get service by id
   */
  static getServiceById(
    params: {
      /** id */
      id: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = '/admin/rateplans/services/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Update service
   */
  static updateService(
    params: {
      /** id */
      id: string;
      /** UpdateService */
      updateService: backend_UpdateService;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = '/admin/rateplans/services/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = params['updateService'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get services
   */
  static getService(
    params: {
      /** propertyId */
      propertyId?: string;
      /** tagIds */
      tagIds?: string;
      /** serviceType */
      serviceType?: string;
      /** name */
      name?: string;
      /** disabled */
      disabled?: boolean;
      /** expands */
      expands?: string[];
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
      let url = '/rateplans/services';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        propertyId: params['propertyId'],
        tagIds: params['tagIds'],
        serviceType: params['serviceType'],
        name: params['name'],
        disabled: params['disabled'],
        expands: params['expands'],
        perPage: params['perPage'],
        currentPage: params['currentPage'],
        sorts: params['sorts']
      };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Create service
   */
  static createService(
    params: {
      /** CreateService */
      createService: backend_CreateService;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = '/rateplans/services';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params['createService'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Delete service
   */
  static deleteService(
    params: {
      /** id */
      id: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = '/rateplans/services/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
}

export class NoShowPolicyService {
  /**
   * Get no-show policy
   */
  static getNoShowPolicy(
    params: {
      /** propertyId */
      propertyId?: string;
      /** isGlobal */
      isGlobal?: boolean;
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
      let url = '/rateplans/no-show-policies';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        propertyId: params['propertyId'],
        isGlobal: params['isGlobal'],
        perPage: params['perPage'],
        currentPage: params['currentPage'],
        sorts: params['sorts']
      };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Create no-show policy
   */
  static createNoShowPolicy(
    params: {
      /** CreateNoShowPolicy */
      createNoShowPolicy: backend_CreateNoShowPolicy;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = '/rateplans/no-show-policies';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params['createNoShowPolicy'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get no-show policy by id
   */
  static getNoShowPolicyById(
    params: {
      /** id */
      id: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = '/rateplans/no-show-policies/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
}

export interface backend_CreateCancellationPolicy {
  /**  */
  description?: string;

  /**  */
  isGlobal?: boolean;

  /**  */
  propertyId?: string;

  /**  */
  reference?: string;

  /**  */
  title?: string;
}

export interface backend_CreateNoShowPolicy {
  /**  */
  description?: string;

  /**  */
  isGlobal?: boolean;

  /**  */
  propertyId?: string;

  /**  */
  reference?: string;

  /**  */
  title?: string;
}

export interface backend_CreateService {
  /**  */
  code: string;

  /**  */
  disabled?: boolean;

  /**  */
  media?: string[];

  /**  */
  popular?: boolean;

  /**  */
  propertyId: string;

  /**  */
  tagIds?: string[];
}

export interface backend_UpdateService {
  /**  */
  disabled?: boolean;

  /**  */
  media?: string[];

  /**  */
  popular?: boolean;

  /**  */
  tagIds?: string[];
}
