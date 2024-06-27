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
export interface ServiceOptions {
  axios?: AxiosInstance;
  /** only in axios interceptor config*/
  loading: boolean;
  showError: boolean;
}

// Add default options
export const serviceOptions: ServiceOptions = {};

// Instance selector
export function axios(
  configs: IRequestConfig,
  resolve: (p: any) => void,
  reject: (p: any) => void
): Promise<any> {
  if (serviceOptions.axios) {
    return serviceOptions.axios
      .request(configs)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  } else {
    throw new Error('please inject yourself instance like axios  ');
  }
}

export function getConfigs(
  method: string,
  contentType: string,
  url: string,
  options: any
): IRequestConfig {
  const configs: IRequestConfig = {
    loading: serviceOptions.loading,
    showError: serviceOptions.showError,
    ...options,
    method,
    url,
  };
  configs.headers = {
    ...options.headers,
    'Content-Type': contentType,
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

export class AboutPageService {
  /**
   *
   */
  static getAboutPage(
    params: {
      /** Sort by attributes ascending (asc) or descending (desc) */
      sort?: string;
      /** Return page/pageSize (default: true) */
      paginationWithCount?: boolean;
      /** Page number (default: 0) */
      paginationPage?: number;
      /** Page size (default: 25) */
      paginationPageSize?: number;
      /** Offset value (default: 0) */
      paginationStart?: number;
      /** Number of entities to return (default: 25) */
      paginationLimit?: number;
      /** Fields to return (ex: title,author) */
      fields?: string;
      /** Relations to return */
      populate?: string;
      /** Filters to apply */
      filters?: object;
      /** Locale to apply */
      locale?: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<AboutPageResponse> {
    return new Promise((resolve, reject) => {
      let url = '/about-page?populate=deep';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        sort: params['sort'],
        paginationWithCount: params['paginationWithCount'],
        paginationPage: params['paginationPage'],
        paginationPageSize: params['paginationPageSize'],
        paginationStart: params['paginationStart'],
        paginationLimit: params['paginationLimit'],
        fields: params['fields'],
        populate: params['populate'],
        filters: params['filters'],
        locale: params['locale'],
      };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static putAboutPage(
    params: {
      /** requestBody */
      body?: AboutPageRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<AboutPageResponse> {
    return new Promise((resolve, reject) => {
      let url = '/about-page?populate=deep';

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static deleteAboutPage(options: IRequestOptions = {}): Promise<number> {
    return new Promise((resolve, reject) => {
      let url = '/about-page?populate=deep';

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static postAboutPageLocalizations(
    params: {
      /** requestBody */
      body?: AboutPageLocalizationRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<AboutPageLocalizationResponse> {
    return new Promise((resolve, reject) => {
      let url = '/about-page/localizations?populate=deep';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
}

export class BundleDetailPageService {
  /**
   *
   */
  static getBundleDetailPage(
    params: {
      /** Sort by attributes ascending (asc) or descending (desc) */
      sort?: string;
      /** Return page/pageSize (default: true) */
      paginationWithCount?: boolean;
      /** Page number (default: 0) */
      paginationPage?: number;
      /** Page size (default: 25) */
      paginationPageSize?: number;
      /** Offset value (default: 0) */
      paginationStart?: number;
      /** Number of entities to return (default: 25) */
      paginationLimit?: number;
      /** Fields to return (ex: title,author) */
      fields?: string;
      /** Relations to return */
      populate?: string;
      /** Filters to apply */
      filters?: object;
      /** Locale to apply */
      locale?: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<BundleDetailPageResponse> {
    return new Promise((resolve, reject) => {
      let url = '/bundle-detail-page?populate=deep';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        sort: params['sort'],
        paginationWithCount: params['paginationWithCount'],
        paginationPage: params['paginationPage'],
        paginationPageSize: params['paginationPageSize'],
        paginationStart: params['paginationStart'],
        paginationLimit: params['paginationLimit'],
        fields: params['fields'],
        populate: params['populate'],
        filters: params['filters'],
        locale: params['locale'],
      };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static putBundleDetailPage(
    params: {
      /** requestBody */
      body?: BundleDetailPageRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<BundleDetailPageResponse> {
    return new Promise((resolve, reject) => {
      let url = '/bundle-detail-page?populate=deep';

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static deleteBundleDetailPage(options: IRequestOptions = {}): Promise<number> {
    return new Promise((resolve, reject) => {
      let url = '/bundle-detail-page?populate=deep';

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static postBundleDetailPageLocalizations(
    params: {
      /** requestBody */
      body?: BundleDetailPageLocalizationRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<BundleDetailPageLocalizationResponse> {
    return new Promise((resolve, reject) => {
      let url = '/bundle-detail-page/localizations?populate=deep';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
}

export class CartService {
  /**
   *
   */
  static getCart(
    params: {
      /** Sort by attributes ascending (asc) or descending (desc) */
      sort?: string;
      /** Return page/pageSize (default: true) */
      paginationWithCount?: boolean;
      /** Page number (default: 0) */
      paginationPage?: number;
      /** Page size (default: 25) */
      paginationPageSize?: number;
      /** Offset value (default: 0) */
      paginationStart?: number;
      /** Number of entities to return (default: 25) */
      paginationLimit?: number;
      /** Fields to return (ex: title,author) */
      fields?: string;
      /** Relations to return */
      populate?: string;
      /** Filters to apply */
      filters?: object;
      /** Locale to apply */
      locale?: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<CartResponse> {
    return new Promise((resolve, reject) => {
      let url = '/cart?populate=deep';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        sort: params['sort'],
        paginationWithCount: params['paginationWithCount'],
        paginationPage: params['paginationPage'],
        paginationPageSize: params['paginationPageSize'],
        paginationStart: params['paginationStart'],
        paginationLimit: params['paginationLimit'],
        fields: params['fields'],
        populate: params['populate'],
        filters: params['filters'],
        locale: params['locale'],
      };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static putCart(
    params: {
      /** requestBody */
      body?: CartRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<CartResponse> {
    return new Promise((resolve, reject) => {
      let url = '/cart?populate=deep';

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static deleteCart(options: IRequestOptions = {}): Promise<number> {
    return new Promise((resolve, reject) => {
      let url = '/cart?populate=deep';

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static postCartLocalizations(
    params: {
      /** requestBody */
      body?: CartLocalizationRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<CartLocalizationResponse> {
    return new Promise((resolve, reject) => {
      let url = '/cart/localizations?populate=deep';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
}

export class CouponService {
  /**
   *
   */
  static getCoupon(
    params: {
      /** Sort by attributes ascending (asc) or descending (desc) */
      sort?: string;
      /** Return page/pageSize (default: true) */
      paginationWithCount?: boolean;
      /** Page number (default: 0) */
      paginationPage?: number;
      /** Page size (default: 25) */
      paginationPageSize?: number;
      /** Offset value (default: 0) */
      paginationStart?: number;
      /** Number of entities to return (default: 25) */
      paginationLimit?: number;
      /** Fields to return (ex: title,author) */
      fields?: string;
      /** Relations to return */
      populate?: string;
      /** Filters to apply */
      filters?: object;
      /** Locale to apply */
      locale?: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<CouponResponse> {
    return new Promise((resolve, reject) => {
      let url = '/coupon?populate=deep';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        sort: params['sort'],
        paginationWithCount: params['paginationWithCount'],
        paginationPage: params['paginationPage'],
        paginationPageSize: params['paginationPageSize'],
        paginationStart: params['paginationStart'],
        paginationLimit: params['paginationLimit'],
        fields: params['fields'],
        populate: params['populate'],
        filters: params['filters'],
        locale: params['locale'],
      };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static putCoupon(
    params: {
      /** requestBody */
      body?: CouponRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<CouponResponse> {
    return new Promise((resolve, reject) => {
      let url = '/coupon?populate=deep';

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static deleteCoupon(options: IRequestOptions = {}): Promise<number> {
    return new Promise((resolve, reject) => {
      let url = '/coupon?populate=deep';

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static postCouponLocalizations(
    params: {
      /** requestBody */
      body?: CouponLocalizationRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<CouponLocalizationResponse> {
    return new Promise((resolve, reject) => {
      let url = '/coupon/localizations?populate=deep';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
}

export class EventService {
  /**
   *
   */
  static getEvents(
    params: {
      /** Sort by attributes ascending (asc) or descending (desc) */
      sort?: string;
      /** Return page/pageSize (default: true) */
      paginationWithCount?: boolean;
      /** Page number (default: 0) */
      paginationPage?: number;
      /** Page size (default: 25) */
      paginationPageSize?: number;
      /** Offset value (default: 0) */
      paginationStart?: number;
      /** Number of entities to return (default: 25) */
      paginationLimit?: number;
      /** Fields to return (ex: title,author) */
      fields?: string;
      /** Relations to return */
      populate?: string;
      /** Filters to apply */
      filters?: object;
      /** Locale to apply */
      locale?: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<EventListResponse> {
    return new Promise((resolve, reject) => {
      let url = '/events?populate=deep';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        sort: params['sort'],
        paginationWithCount: params['paginationWithCount'],
        paginationPage: params['paginationPage'],
        paginationPageSize: params['paginationPageSize'],
        paginationStart: params['paginationStart'],
        paginationLimit: params['paginationLimit'],
        fields: params['fields'],
        populate: params['populate'],
        filters: params['filters'],
        locale: params['locale'],
      };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static postEvents(
    params: {
      /** requestBody */
      body?: EventRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<EventResponse> {
    return new Promise((resolve, reject) => {
      let url = '/events?populate=deep';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static getEventsId(
    params: {
      /**  */
      id: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<EventResponse> {
    return new Promise((resolve, reject) => {
      let url = '/events/{id}?populate=deep';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static putEventsId(
    params: {
      /**  */
      id: number;
      /** requestBody */
      body?: EventRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<EventResponse> {
    return new Promise((resolve, reject) => {
      let url = '/events/{id}?populate=deep';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static deleteEventsId(
    params: {
      /**  */
      id: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<number> {
    return new Promise((resolve, reject) => {
      let url = '/events/{id}?populate=deep';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
}

export class GalleryService {
  /**
   *
   */
  static getGalleries(
    params: {
      /** Sort by attributes ascending (asc) or descending (desc) */
      sort?: string;
      /** Return page/pageSize (default: true) */
      paginationWithCount?: boolean;
      /** Page number (default: 0) */
      paginationPage?: number;
      /** Page size (default: 25) */
      paginationPageSize?: number;
      /** Offset value (default: 0) */
      paginationStart?: number;
      /** Number of entities to return (default: 25) */
      paginationLimit?: number;
      /** Fields to return (ex: title,author) */
      fields?: string;
      /** Relations to return */
      populate?: string;
      /** Filters to apply */
      filters?: object;
      /** Locale to apply */
      locale?: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<GalleryListResponse> {
    return new Promise((resolve, reject) => {
      let url = '/galleries?populate=deep';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        sort: params['sort'],
        paginationWithCount: params['paginationWithCount'],
        paginationPage: params['paginationPage'],
        paginationPageSize: params['paginationPageSize'],
        paginationStart: params['paginationStart'],
        paginationLimit: params['paginationLimit'],
        fields: params['fields'],
        populate: params['populate'],
        filters: params['filters'],
        locale: params['locale'],
      };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static postGalleries(
    params: {
      /** requestBody */
      body?: GalleryRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<GalleryResponse> {
    return new Promise((resolve, reject) => {
      let url = '/galleries?populate=deep';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static getGalleriesId(
    params: {
      /**  */
      id: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<GalleryResponse> {
    return new Promise((resolve, reject) => {
      let url = '/galleries/{id}?populate=deep';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static putGalleriesId(
    params: {
      /**  */
      id: number;
      /** requestBody */
      body?: GalleryRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<GalleryResponse> {
    return new Promise((resolve, reject) => {
      let url = '/galleries/{id}?populate=deep';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static deleteGalleriesId(
    params: {
      /**  */
      id: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<number> {
    return new Promise((resolve, reject) => {
      let url = '/galleries/{id}?populate=deep';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static postGalleriesIdLocalizations(
    params: {
      /**  */
      id: number;
      /** requestBody */
      body?: GalleryLocalizationRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<GalleryLocalizationResponse> {
    return new Promise((resolve, reject) => {
      let url = '/galleries/{id}/localizations?populate=deep';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
}

export class LandingPageService {
  /**
   *
   */
  static getLandingPage(
    params: {
      /** Sort by attributes ascending (asc) or descending (desc) */
      sort?: string;
      /** Return page/pageSize (default: true) */
      paginationWithCount?: boolean;
      /** Page number (default: 0) */
      paginationPage?: number;
      /** Page size (default: 25) */
      paginationPageSize?: number;
      /** Offset value (default: 0) */
      paginationStart?: number;
      /** Number of entities to return (default: 25) */
      paginationLimit?: number;
      /** Fields to return (ex: title,author) */
      fields?: string;
      /** Relations to return */
      populate?: string;
      /** Filters to apply */
      filters?: object;
      /** Locale to apply */
      locale?: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<LandingPageResponse> {
    return new Promise((resolve, reject) => {
      let url = '/landing-page?populate=deep';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        sort: params['sort'],
        paginationWithCount: params['paginationWithCount'],
        paginationPage: params['paginationPage'],
        paginationPageSize: params['paginationPageSize'],
        paginationStart: params['paginationStart'],
        paginationLimit: params['paginationLimit'],
        fields: params['fields'],
        populate: params['populate'],
        filters: params['filters'],
        locale: params['locale'],
      };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static putLandingPage(
    params: {
      /** requestBody */
      body?: LandingPageRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<LandingPageResponse> {
    return new Promise((resolve, reject) => {
      let url = '/landing-page?populate=deep';

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static deleteLandingPage(options: IRequestOptions = {}): Promise<number> {
    return new Promise((resolve, reject) => {
      let url = '/landing-page?populate=deep';

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static postLandingPageLocalizations(
    params: {
      /** requestBody */
      body?: LandingPageLocalizationRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<LandingPageLocalizationResponse> {
    return new Promise((resolve, reject) => {
      let url = '/landing-page/localizations?populate=deep';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
}

export class LocaleTableService {
  /**
   *
   */
  static getLocaleTables(
    params: {
      /** Sort by attributes ascending (asc) or descending (desc) */
      sort?: string;
      /** Return page/pageSize (default: true) */
      paginationWithCount?: boolean;
      /** Page number (default: 0) */
      paginationPage?: number;
      /** Page size (default: 25) */
      paginationPageSize?: number;
      /** Offset value (default: 0) */
      paginationStart?: number;
      /** Number of entities to return (default: 25) */
      paginationLimit?: number;
      /** Fields to return (ex: title,author) */
      fields?: string;
      /** Relations to return */
      populate?: string;
      /** Filters to apply */
      filters?: object;
      /** Locale to apply */
      locale?: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<LocaleTableListResponse> {
    return new Promise((resolve, reject) => {
      let url = '/locale-tables?populate=deep';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        sort: params['sort'],
        paginationWithCount: params['paginationWithCount'],
        paginationPage: params['paginationPage'],
        paginationPageSize: params['paginationPageSize'],
        paginationStart: params['paginationStart'],
        paginationLimit: params['paginationLimit'],
        fields: params['fields'],
        populate: params['populate'],
        filters: params['filters'],
        locale: params['locale'],
      };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static postLocaleTables(
    params: {
      /** requestBody */
      body?: LocaleTableRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<LocaleTableResponse> {
    return new Promise((resolve, reject) => {
      let url = '/locale-tables?populate=deep';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static getLocaleTablesId(
    params: {
      /**  */
      id: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<LocaleTableResponse> {
    return new Promise((resolve, reject) => {
      let url = '/locale-tables/{id}?populate=deep';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static putLocaleTablesId(
    params: {
      /**  */
      id: number;
      /** requestBody */
      body?: LocaleTableRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<LocaleTableResponse> {
    return new Promise((resolve, reject) => {
      let url = '/locale-tables/{id}?populate=deep';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static deleteLocaleTablesId(
    params: {
      /**  */
      id: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<number> {
    return new Promise((resolve, reject) => {
      let url = '/locale-tables/{id}?populate=deep';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static postLocaleTablesIdLocalizations(
    params: {
      /**  */
      id: number;
      /** requestBody */
      body?: LocaleTableLocalizationRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<LocaleTableLocalizationResponse> {
    return new Promise((resolve, reject) => {
      let url = '/locale-tables/{id}/localizations?populate=deep';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
}

export class PageService {
  /**
   *
   */
  static getPages(
    params: {
      /** Sort by attributes ascending (asc) or descending (desc) */
      sort?: string;
      /** Return page/pageSize (default: true) */
      paginationWithCount?: boolean;
      /** Page number (default: 0) */
      paginationPage?: number;
      /** Page size (default: 25) */
      paginationPageSize?: number;
      /** Offset value (default: 0) */
      paginationStart?: number;
      /** Number of entities to return (default: 25) */
      paginationLimit?: number;
      /** Fields to return (ex: title,author) */
      fields?: string;
      /** Relations to return */
      populate?: string;
      /** Filters to apply */
      filters?: object;
      /** Locale to apply */
      locale?: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<PageListResponse> {
    return new Promise((resolve, reject) => {
      let url = '/pages?populate=deep';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        sort: params['sort'],
        paginationWithCount: params['paginationWithCount'],
        paginationPage: params['paginationPage'],
        paginationPageSize: params['paginationPageSize'],
        paginationStart: params['paginationStart'],
        paginationLimit: params['paginationLimit'],
        fields: params['fields'],
        populate: params['populate'],
        filters: params['filters'],
        locale: params['locale'],
      };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static postPages(
    params: {
      /** requestBody */
      body?: PageRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<PageResponse> {
    return new Promise((resolve, reject) => {
      let url = '/pages?populate=deep';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static getPagesId(
    params: {
      /**  */
      id: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<PageResponse> {
    return new Promise((resolve, reject) => {
      let url = '/pages/{id}?populate=deep';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static putPagesId(
    params: {
      /**  */
      id: number;
      /** requestBody */
      body?: PageRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<PageResponse> {
    return new Promise((resolve, reject) => {
      let url = '/pages/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static deletePagesId(
    params: {
      /**  */
      id: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<number> {
    return new Promise((resolve, reject) => {
      let url = '/pages/{id}?populate=deep';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
}

export class PrivacyPolicyService {
  /**
   *
   */
  static getPrivacyPolicy(
    params: {
      /** Sort by attributes ascending (asc) or descending (desc) */
      sort?: string;
      /** Return page/pageSize (default: true) */
      paginationWithCount?: boolean;
      /** Page number (default: 0) */
      paginationPage?: number;
      /** Page size (default: 25) */
      paginationPageSize?: number;
      /** Offset value (default: 0) */
      paginationStart?: number;
      /** Number of entities to return (default: 25) */
      paginationLimit?: number;
      /** Fields to return (ex: title,author) */
      fields?: string;
      /** Relations to return */
      populate?: string;
      /** Filters to apply */
      filters?: object;
      /** Locale to apply */
      locale?: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<PrivacyPolicyResponse> {
    return new Promise((resolve, reject) => {
      let url = '/privacy-policy?populate=deep';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        sort: params['sort'],
        paginationWithCount: params['paginationWithCount'],
        paginationPage: params['paginationPage'],
        paginationPageSize: params['paginationPageSize'],
        paginationStart: params['paginationStart'],
        paginationLimit: params['paginationLimit'],
        fields: params['fields'],
        populate: params['populate'],
        filters: params['filters'],
        locale: params['locale'],
      };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static putPrivacyPolicy(
    params: {
      /** requestBody */
      body?: PrivacyPolicyRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<PrivacyPolicyResponse> {
    return new Promise((resolve, reject) => {
      let url = '/privacy-policy?populate=deep';

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static deletePrivacyPolicy(options: IRequestOptions = {}): Promise<number> {
    return new Promise((resolve, reject) => {
      let url = '/privacy-policy?populate=deep';

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static postPrivacyPolicyLocalizations(
    params: {
      /** requestBody */
      body?: PrivacyPolicyLocalizationRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<PrivacyPolicyLocalizationResponse> {
    return new Promise((resolve, reject) => {
      let url = '/privacy-policy/localizations?populate=deep';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
}

export class ProcessMenuService {
  /**
   *
   */
  static getProcessMenu(
    params: {
      /** Sort by attributes ascending (asc) or descending (desc) */
      sort?: string;
      /** Return page/pageSize (default: true) */
      paginationWithCount?: boolean;
      /** Page number (default: 0) */
      paginationPage?: number;
      /** Page size (default: 25) */
      paginationPageSize?: number;
      /** Offset value (default: 0) */
      paginationStart?: number;
      /** Number of entities to return (default: 25) */
      paginationLimit?: number;
      /** Fields to return (ex: title,author) */
      fields?: string;
      /** Relations to return */
      populate?: string;
      /** Filters to apply */
      filters?: object;
      /** Locale to apply */
      locale?: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<ProcessMenuResponse> {
    return new Promise((resolve, reject) => {
      let url = '/process-menu?populate=deep';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        sort: params['sort'],
        paginationWithCount: params['paginationWithCount'],
        paginationPage: params['paginationPage'],
        paginationPageSize: params['paginationPageSize'],
        paginationStart: params['paginationStart'],
        paginationLimit: params['paginationLimit'],
        fields: params['fields'],
        populate: params['populate'],
        filters: params['filters'],
        locale: params['locale'],
      };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static putProcessMenu(
    params: {
      /** requestBody */
      body?: ProcessMenuRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<ProcessMenuResponse> {
    return new Promise((resolve, reject) => {
      let url = '/process-menu?populate=deep';

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static deleteProcessMenu(options: IRequestOptions = {}): Promise<number> {
    return new Promise((resolve, reject) => {
      let url = '/process-menu?populate=deep';

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static postProcessMenuLocalizations(
    params: {
      /** requestBody */
      body?: ProcessMenuLocalizationRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<ProcessMenuLocalizationResponse> {
    return new Promise((resolve, reject) => {
      let url = '/process-menu/localizations?populate=deep';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
}

export class PropertyService {
  /**
   *
   */
  static getProperties(
    params: {
      /** Sort by attributes ascending (asc) or descending (desc) */
      sort?: string;
      /** Return page/pageSize (default: true) */
      paginationWithCount?: boolean;
      /** Page number (default: 0) */
      paginationPage?: number;
      /** Page size (default: 25) */
      paginationPageSize?: number;
      /** Offset value (default: 0) */
      paginationStart?: number;
      /** Number of entities to return (default: 25) */
      paginationLimit?: number;
      /** Fields to return (ex: title,author) */
      fields?: string;
      /** Relations to return */
      populate?: string;
      /** Filters to apply */
      filters?: object;
      /** Locale to apply */
      locale?: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<PropertyListResponse> {
    return new Promise((resolve, reject) => {
      let url = '/properties?populate=deep';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        sort: params['sort'],
        paginationWithCount: params['paginationWithCount'],
        paginationPage: params['paginationPage'],
        paginationPageSize: params['paginationPageSize'],
        paginationStart: params['paginationStart'],
        paginationLimit: params['paginationLimit'],
        fields: params['fields'],
        populate: params['populate'],
        filters: params['filters'],
        locale: params['locale'],
      };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static postProperties(
    params: {
      /** requestBody */
      body?: PropertyRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<PropertyResponse> {
    return new Promise((resolve, reject) => {
      let url = '/properties?populate=deep';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static getPropertiesId(
    params: {
      /**  */
      id: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<PropertyResponse> {
    return new Promise((resolve, reject) => {
      let url = '/properties/{id}?populate=deep';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static putPropertiesId(
    params: {
      /**  */
      id: number;
      /** requestBody */
      body?: PropertyRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<PropertyResponse> {
    return new Promise((resolve, reject) => {
      let url = '/properties/{id}?populate=deep';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static deletePropertiesId(
    params: {
      /**  */
      id: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<number> {
    return new Promise((resolve, reject) => {
      let url = '/properties/{id}?populate=deep';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
}

export class PropertyPageService {
  /**
   *
   */
  static getPropertyPages(
    params: {
      /** Sort by attributes ascending (asc) or descending (desc) */
      sort?: string;
      /** Return page/pageSize (default: true) */
      paginationWithCount?: boolean;
      /** Page number (default: 0) */
      paginationPage?: number;
      /** Page size (default: 25) */
      paginationPageSize?: number;
      /** Offset value (default: 0) */
      paginationStart?: number;
      /** Number of entities to return (default: 25) */
      paginationLimit?: number;
      /** Fields to return (ex: title,author) */
      fields?: string;
      /** Relations to return */
      populate?: string;
      /** Filters to apply */
      filters?: object;
      /** Locale to apply */
      locale?: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<PropertyPageListResponse> {
    return new Promise((resolve, reject) => {
      let url = '/property-pages?populate=deep';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        sort: params['sort'],
        paginationWithCount: params['paginationWithCount'],
        paginationPage: params['paginationPage'],
        paginationPageSize: params['paginationPageSize'],
        paginationStart: params['paginationStart'],
        paginationLimit: params['paginationLimit'],
        fields: params['fields'],
        populate: params['populate'],
        filters: params['filters'],
        locale: params['locale'],
      };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static postPropertyPages(
    params: {
      /** requestBody */
      body?: PropertyPageRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<PropertyPageResponse> {
    return new Promise((resolve, reject) => {
      let url = '/property-pages?populate=deep';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static getPropertyPagesId(
    params: {
      /**  */
      id: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<PropertyPageResponse> {
    return new Promise((resolve, reject) => {
      let url = '/property-pages/{id}?populate=deep';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static putPropertyPagesId(
    params: {
      /**  */
      id: number;
      /** requestBody */
      body?: PropertyPageRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<PropertyPageResponse> {
    return new Promise((resolve, reject) => {
      let url = '/property-pages/{id}?populate=deep';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static deletePropertyPagesId(
    params: {
      /**  */
      id: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<number> {
    return new Promise((resolve, reject) => {
      let url = '/property-pages/{id}?populate=deep';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static postPropertyPagesIdLocalizations(
    params: {
      /**  */
      id: number;
      /** requestBody */
      body?: PropertyPageLocalizationRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<PropertyPageLocalizationResponse> {
    return new Promise((resolve, reject) => {
      let url = '/property-pages/{id}/localizations?populate=deep';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
}

export class PropertyTeamService {
  /**
   *
   */
  static getPropertyTeams(
    params: {
      /** Sort by attributes ascending (asc) or descending (desc) */
      sort?: string;
      /** Return page/pageSize (default: true) */
      paginationWithCount?: boolean;
      /** Page number (default: 0) */
      paginationPage?: number;
      /** Page size (default: 25) */
      paginationPageSize?: number;
      /** Offset value (default: 0) */
      paginationStart?: number;
      /** Number of entities to return (default: 25) */
      paginationLimit?: number;
      /** Fields to return (ex: title,author) */
      fields?: string;
      /** Relations to return */
      populate?: string;
      /** Filters to apply */
      filters?: object;
      /** Locale to apply */
      locale?: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<PropertyTeamListResponse> {
    return new Promise((resolve, reject) => {
      let url = '/property-teams?populate=deep';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        sort: params['sort'],
        paginationWithCount: params['paginationWithCount'],
        paginationPage: params['paginationPage'],
        paginationPageSize: params['paginationPageSize'],
        paginationStart: params['paginationStart'],
        paginationLimit: params['paginationLimit'],
        fields: params['fields'],
        populate: params['populate'],
        filters: params['filters'],
        locale: params['locale'],
      };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static postPropertyTeams(
    params: {
      /** requestBody */
      body?: PropertyTeamRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<PropertyTeamResponse> {
    return new Promise((resolve, reject) => {
      let url = '/property-teams?populate=deep';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static getPropertyTeamsId(
    params: {
      /**  */
      id: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<PropertyTeamResponse> {
    return new Promise((resolve, reject) => {
      let url = '/property-teams/{id}?populate=deep';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static putPropertyTeamsId(
    params: {
      /**  */
      id: number;
      /** requestBody */
      body?: PropertyTeamRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<PropertyTeamResponse> {
    return new Promise((resolve, reject) => {
      let url = '/property-teams/{id}?populate=deep';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static deletePropertyTeamsId(
    params: {
      /**  */
      id: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<number> {
    return new Promise((resolve, reject) => {
      let url = '/property-teams/{id}?populate=deep';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
}

export class ResultPageService {
  /**
   *
   */
  static getResultPage(
    params: {
      /** Sort by attributes ascending (asc) or descending (desc) */
      sort?: string;
      /** Return page/pageSize (default: true) */
      paginationWithCount?: boolean;
      /** Page number (default: 0) */
      paginationPage?: number;
      /** Page size (default: 25) */
      paginationPageSize?: number;
      /** Offset value (default: 0) */
      paginationStart?: number;
      /** Number of entities to return (default: 25) */
      paginationLimit?: number;
      /** Fields to return (ex: title,author) */
      fields?: string;
      /** Relations to return */
      populate?: string;
      /** Filters to apply */
      filters?: object;
      /** Locale to apply */
      locale?: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<ResultPageResponse> {
    return new Promise((resolve, reject) => {
      let url = '/result-page?populate=deep';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        sort: params['sort'],
        paginationWithCount: params['paginationWithCount'],
        paginationPage: params['paginationPage'],
        paginationPageSize: params['paginationPageSize'],
        paginationStart: params['paginationStart'],
        paginationLimit: params['paginationLimit'],
        fields: params['fields'],
        populate: params['populate'],
        filters: params['filters'],
        locale: params['locale'],
      };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static putResultPage(
    params: {
      /** requestBody */
      body?: ResultPageRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<ResultPageResponse> {
    return new Promise((resolve, reject) => {
      let url = '/result-page?populate=deep';

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static deleteResultPage(options: IRequestOptions = {}): Promise<number> {
    return new Promise((resolve, reject) => {
      let url = '/result-page?populate=deep';

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static postResultPageLocalizations(
    params: {
      /** requestBody */
      body?: ResultPageLocalizationRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<ResultPageLocalizationResponse> {
    return new Promise((resolve, reject) => {
      let url = '/result-page/localizations?populate=deep';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
}

export class SettingService {
  /**
   *
   */
  static getSettings(
    params: {
      /** Sort by attributes ascending (asc) or descending (desc) */
      sort?: string;
      /** Return page/pageSize (default: true) */
      paginationWithCount?: boolean;
      /** Page number (default: 0) */
      paginationPage?: number;
      /** Page size (default: 25) */
      paginationPageSize?: number;
      /** Offset value (default: 0) */
      paginationStart?: number;
      /** Number of entities to return (default: 25) */
      paginationLimit?: number;
      /** Fields to return (ex: title,author) */
      fields?: string;
      /** Relations to return */
      populate?: string;
      /** Filters to apply */
      filters?: object;
      /** Locale to apply */
      locale?: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<SettingListResponse> {
    return new Promise((resolve, reject) => {
      let url = '/settings?populate=deep';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        sort: params['sort'],
        paginationWithCount: params['paginationWithCount'],
        paginationPage: params['paginationPage'],
        paginationPageSize: params['paginationPageSize'],
        paginationStart: params['paginationStart'],
        paginationLimit: params['paginationLimit'],
        fields: params['fields'],
        populate: params['populate'],
        filters: params['filters'],
        locale: params['locale'],
      };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static postSettings(
    params: {
      /** requestBody */
      body?: SettingRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<SettingResponse> {
    return new Promise((resolve, reject) => {
      let url = '/settings?populate=deep';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static getSettingsId(
    params: {
      /**  */
      id: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<SettingResponse> {
    return new Promise((resolve, reject) => {
      let url = '/settings/{id}?populate=deep';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static putSettingsId(
    params: {
      /**  */
      id: number;
      /** requestBody */
      body?: SettingRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<SettingResponse> {
    return new Promise((resolve, reject) => {
      let url = '/settings/{id}?populate=deep';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static deleteSettingsId(
    params: {
      /**  */
      id: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<number> {
    return new Promise((resolve, reject) => {
      let url = '/settings/{id}?populate=deep';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static postSettingsIdLocalizations(
    params: {
      /**  */
      id: number;
      /** requestBody */
      body?: SettingLocalizationRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<SettingLocalizationResponse> {
    return new Promise((resolve, reject) => {
      let url = '/settings/{id}/localizations?populate=deep';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
}

export interface Error {
  /**  */
  data?: AllDataTypes;

  /**  */
  error: object;
}

export interface AboutPageLocalizationRequest {
  /**  */
  hero?: PageHeroComponent;

  /**  */
  ziczacComponent?: InventoryZiczacComponent[];

  /**  */
  sectionBanner?: AllSectionBannerTypes;

  /**  */
  ourCorporate?: InventoryCorporateComponent;

  /**  */
  ourVision?: InventoryContentTextOnlyComponent;

  /**  */
  ourValues?: InventoryContentTextOnlyComponent;

  /**  */
  locale: string;
}

export interface AboutPageRequest {
  /**  */
  data: object;
}

export interface AboutPageResponseDataObjectLocalized {
  /**  */
  id?: number;

  /**  */
  attributes?: AboutPage;
}

export interface AboutPageLocalizationResponse {
  /**  */
  data?: AboutPageResponseDataObjectLocalized;

  /**  */
  meta?: object;
}

export interface AboutPageListResponseDataItemLocalized {
  /**  */
  id?: number;

  /**  */
  attributes?: AboutPage;
}

export interface AboutPageLocalizationListResponse {
  /**  */
  data?: AboutPageListResponseDataItemLocalized[];

  /**  */
  meta?: object;
}

export interface AboutPageListResponseDataItem {
  /**  */
  id?: number;

  /**  */
  attributes?: AboutPage;
}

export interface AboutPageListResponse {
  /**  */
  data?: AboutPageListResponseDataItem[];

  /**  */
  meta?: object;
}

export interface AboutPage {
  /**  */
  hero?: PageHeroComponent;

  /**  */
  ziczacComponent?: InventoryZiczacComponent[];

  /**  */
  sectionBanner?: object;

  /**  */
  ourCorporate?: InventoryCorporateComponent;

  /**  */
  ourVision?: InventoryContentTextOnlyComponent;

  /**  */
  ourValues?: InventoryContentTextOnlyComponent;

  /**  */
  createdAt?: Date;

  /**  */
  updatedAt?: Date;

  /**  */
  createdBy?: object;

  /**  */
  updatedBy?: object;

  /**  */
  localizations?: object;

  /**  */
  locale?: string;
}

export interface AboutPageResponseDataObject {
  /**  */
  id?: number;

  /**  */
  attributes?: AboutPage;
}

export interface AboutPageResponse {
  /**  */
  data?: AboutPageResponseDataObject;

  /**  */
  meta?: object;
}

export interface PageHeroComponent {
  /**  */
  id?: number;

  /**  */
  title?: string;

  /**  */
  subtitle?: string;

  /**  */
  image?: object;
}

export interface InventoryZiczacComponent {
  /**  */
  id?: number;

  /**  */
  title?: string;

  /**  */
  subtitle?: string;

  /**  */
  text1?: string;

  /**  */
  text2?: string;

  /**  */
  isTextFirst?: boolean;

  /**  */
  image?: object;
}

export interface InventoryCorporateComponent {
  /**  */
  id?: number;

  /**  */
  title?: string;

  /**  */
  content?: object[];
}

export interface InventoryContentTextOnlyComponent {
  /**  */
  id?: number;

  /**  */
  title?: string;

  /**  */
  subtitle?: string;

  /**  */
  text1?: string;

  /**  */
  text2?: string;
}

export interface BundleDetailPageLocalizationRequest {
  /**  */
  bundleDetail?: SharedBundleDetailComponent;

  /**  */
  locale: string;
}

export interface BundleDetailPageRequest {
  /**  */
  data: object;
}

export interface BundleDetailPageResponseDataObjectLocalized {
  /**  */
  id?: number;

  /**  */
  attributes?: BundleDetailPage;
}

export interface BundleDetailPageLocalizationResponse {
  /**  */
  data?: BundleDetailPageResponseDataObjectLocalized;

  /**  */
  meta?: object;
}

export interface BundleDetailPageListResponseDataItemLocalized {
  /**  */
  id?: number;

  /**  */
  attributes?: BundleDetailPage;
}

export interface BundleDetailPageLocalizationListResponse {
  /**  */
  data?: BundleDetailPageListResponseDataItemLocalized[];

  /**  */
  meta?: object;
}

export interface BundleDetailPageListResponseDataItem {
  /**  */
  id?: number;

  /**  */
  attributes?: BundleDetailPage;
}

export interface BundleDetailPageListResponse {
  /**  */
  data?: BundleDetailPageListResponseDataItem[];

  /**  */
  meta?: object;
}

export interface BundleDetailPage {
  /**  */
  bundleDetail?: SharedBundleDetailComponent;

  /**  */
  createdAt?: Date;

  /**  */
  updatedAt?: Date;

  /**  */
  createdBy?: object;

  /**  */
  updatedBy?: object;

  /**  */
  localizations?: object;

  /**  */
  locale?: string;
}

export interface BundleDetailPageResponseDataObject {
  /**  */
  id?: number;

  /**  */
  attributes?: BundleDetailPage;
}

export interface BundleDetailPageResponse {
  /**  */
  data?: BundleDetailPageResponseDataObject;

  /**  */
  meta?: object;
}

export interface SharedBundleDetailComponent {
  /**  */
  id?: number;

  /**  */
  overwritePriceText?: string;

  /**  */
  buttonText?: any | null;

  /**  */
  chooseYourRoomText?: string;
}

export interface CartLocalizationRequest {
  /**  */
  invoice?: SharedInvoiceComponent;

  /**  */
  locale: string;
}

export interface CartRequest {
  /**  */
  data: object;
}

export interface CartResponseDataObjectLocalized {
  /**  */
  id?: number;

  /**  */
  attributes?: Cart;
}

export interface CartLocalizationResponse {
  /**  */
  data?: CartResponseDataObjectLocalized;

  /**  */
  meta?: object;
}

export interface CartListResponseDataItemLocalized {
  /**  */
  id?: number;

  /**  */
  attributes?: Cart;
}

export interface CartLocalizationListResponse {
  /**  */
  data?: CartListResponseDataItemLocalized[];

  /**  */
  meta?: object;
}

export interface CartListResponseDataItem {
  /**  */
  id?: number;

  /**  */
  attributes?: Cart;
}

export interface CartListResponse {
  /**  */
  data?: CartListResponseDataItem[];

  /**  */
  meta?: object;
}

export interface Cart {
  /**  */
  invoice?: SharedInvoiceComponent;

  /**  */
  createdAt?: Date;

  /**  */
  updatedAt?: Date;

  /**  */
  createdBy?: object;

  /**  */
  updatedBy?: object;

  /**  */
  localizations?: object;

  /**  */
  locale?: string;
}

export interface CartResponseDataObject {
  /**  */
  id?: number;

  /**  */
  attributes?: Cart;
}

export interface CartResponse {
  /**  */
  data?: CartResponseDataObject;

  /**  */
  meta?: object;
}

export interface SharedInvoiceComponent {
  /**  */
  id?: number;

  /**  */
  title?: string;

  /**  */
  list?: any | null;

  /**  */
  totalText?: string;

  /**  */
  buttonText?: string;

  /**  */
  taxText?: string;
}

export interface CouponLocalizationRequest {
  /**  */
  heroBanner?: PageHeroComponent;

  /**  */
  coupons?: SharedVoucherComponent[];

  /**  */
  locale: string;
}

export interface CouponRequest {
  /**  */
  data: object;
}

export interface CouponResponseDataObjectLocalized {
  /**  */
  id?: number;

  /**  */
  attributes?: Coupon;
}

export interface CouponLocalizationResponse {
  /**  */
  data?: CouponResponseDataObjectLocalized;

  /**  */
  meta?: object;
}

export interface CouponListResponseDataItemLocalized {
  /**  */
  id?: number;

  /**  */
  attributes?: Coupon;
}

export interface CouponLocalizationListResponse {
  /**  */
  data?: CouponListResponseDataItemLocalized[];

  /**  */
  meta?: object;
}

export interface CouponListResponseDataItem {
  /**  */
  id?: number;

  /**  */
  attributes?: Coupon;
}

export interface CouponListResponse {
  /**  */
  data?: CouponListResponseDataItem[];

  /**  */
  meta?: object;
}

export interface Coupon {
  /**  */
  heroBanner?: PageHeroComponent;

  /**  */
  coupons?: SharedVoucherComponent[];

  /**  */
  createdAt?: Date;

  /**  */
  updatedAt?: Date;

  /**  */
  createdBy?: object;

  /**  */
  updatedBy?: object;

  /**  */
  localizations?: object;

  /**  */
  locale?: string;
}

export interface CouponResponseDataObject {
  /**  */
  id?: number;

  /**  */
  attributes?: Coupon;
}

export interface CouponResponse {
  /**  */
  data?: CouponResponseDataObject;

  /**  */
  meta?: object;
}

export interface SharedVoucherComponent {
  /**  */
  id?: number;

  /**  */
  title?: string;

  /**  */
  description?: string;

  /**  */
  subTitle?: string;

  /**  */
  value?: number;

  /**  */
  currency?: EnumSharedVoucherComponentCurrency;

  /**  */
  photos?: object[];
}

export interface EventRequest {
  /**  */
  data: object;
}

export interface EventListResponseDataItem {
  /**  */
  id?: number;

  /**  */
  attributes?: Event;
}

export interface EventListResponse {
  /**  */
  data?: EventListResponseDataItem[];

  /**  */
  meta?: object;
}

export interface Event {
  /**  */
  title?: string;

  /**  */
  subtitle?: string;

  /**  */
  text?: string;

  /**  */
  date?: Date;

  /**  */
  endDate?: Date;

  /**  */
  properties?: object;

  /**  */
  location?: InventoryLocationComponent;

  /**  */
  blocks?: any | null[];

  /**  */
  image?: object;

  /**  */
  createdAt?: Date;

  /**  */
  updatedAt?: Date;

  /**  */
  publishedAt?: Date;

  /**  */
  createdBy?: object;

  /**  */
  updatedBy?: object;
}

export interface EventResponseDataObject {
  /**  */
  id?: number;

  /**  */
  attributes?: Event;
}

export interface EventResponse {
  /**  */
  data?: EventResponseDataObject;

  /**  */
  meta?: object;
}

export interface InventoryLocationComponent {
  /**  */
  id?: number;

  /**  */
  city?: string;

  /**  */
  latitude?: number;

  /**  */
  longitude?: number;

  /**  */
  country?: string;

  /**  */
  countryCode?: string;
}

export interface SharedMediaLinkComponent {
  /**  */
  id?: number;

  /**  */
  __component?: string;

  /**  */
  title?: string;

  /**  */
  subtitle?: string;

  /**  */
  media?: object;

  /**  */
  year?: number;
}

export interface SharedMediaComponent {
  /**  */
  id?: number;

  /**  */
  __component?: string;

  /**  */
  file?: object;

  /**  */
  data?: any | null;
}

export interface SharedQuoteComponent {
  /**  */
  id?: number;

  /**  */
  __component?: string;

  /**  */
  title?: string;

  /**  */
  body?: string;
}

export interface SharedRichTextComponent {
  /**  */
  id?: number;

  /**  */
  __component?: string;

  /**  */
  body?: string;
}

export interface SharedSliderComponent {
  /**  */
  id?: number;

  /**  */
  __component?: string;

  /**  */
  files?: object;
}

export interface GalleryLocalizationRequest {
  /**  */
  title: string;

  /**  */
  subtitle?: string;

  /**  */
  property?: AllPropertyTypes;

  /**  */
  gallery: any | null[];

  /**  */
  data?: any | null;

  /**  */
  locale: string;
}

export interface GalleryRequest {
  /**  */
  data: object;
}

export interface GalleryResponseDataObjectLocalized {
  /**  */
  id?: number;

  /**  */
  attributes?: Gallery;
}

export interface GalleryLocalizationResponse {
  /**  */
  data?: GalleryResponseDataObjectLocalized;

  /**  */
  meta?: object;
}

export interface GalleryListResponseDataItemLocalized {
  /**  */
  id?: number;

  /**  */
  attributes?: Gallery;
}

export interface GalleryLocalizationListResponse {
  /**  */
  data?: GalleryListResponseDataItemLocalized[];

  /**  */
  meta?: object;
}

export interface GalleryListResponseDataItem {
  /**  */
  id?: number;

  /**  */
  attributes?: Gallery;
}

export interface GalleryListResponse {
  /**  */
  data?: GalleryListResponseDataItem[];

  /**  */
  meta?: object;
}

export interface Gallery {
  /**  */
  title: string;

  /**  */
  subtitle?: string;

  /**  */
  property?: object;

  /**  */
  gallery: any | null[];

  /**  */
  data?: any | null;

  /**  */
  createdAt?: Date;

  /**  */
  updatedAt?: Date;

  /**  */
  publishedAt?: Date;

  /**  */
  createdBy?: object;

  /**  */
  updatedBy?: object;

  /**  */
  localizations?: object;

  /**  */
  locale?: string;
}

export interface GalleryResponseDataObject {
  /**  */
  id?: number;

  /**  */
  attributes?: Gallery;
}

export interface GalleryResponse {
  /**  */
  data?: GalleryResponseDataObject;

  /**  */
  meta?: object;
}

export interface LandingPageLocalizationRequest {
  /**  */
  hero?: PageHero2Component;

  /**  */
  packages?: PagePackagesComponent;

  /**  */
  seo?: SharedSeoComponent;

  /**  */
  mainMenu?: any | null[];

  /**  */
  footerMenu?: any | null[];

  /**  */
  supHeader?: SharedSupHeaderComponent;

  /**  */
  highlightHotels?: PageHighlightHotelsComponent;

  /**  */
  searchMenu: SharedSearchMenuComponent;

  /**  */
  locale: string;
}

export interface LandingPageRequest {
  /**  */
  data: object;
}

export interface LandingPageResponseDataObjectLocalized {
  /**  */
  id?: number;

  /**  */
  attributes?: LandingPage;
}

export interface LandingPageLocalizationResponse {
  /**  */
  data?: LandingPageResponseDataObjectLocalized;

  /**  */
  meta?: object;
}

export interface LandingPageListResponseDataItemLocalized {
  /**  */
  id?: number;

  /**  */
  attributes?: LandingPage;
}

export interface LandingPageLocalizationListResponse {
  /**  */
  data?: LandingPageListResponseDataItemLocalized[];

  /**  */
  meta?: object;
}

export interface LandingPageListResponseDataItem {
  /**  */
  id?: number;

  /**  */
  attributes?: LandingPage;
}

export interface LandingPageListResponse {
  /**  */
  data?: LandingPageListResponseDataItem[];

  /**  */
  meta?: object;
}

export interface LandingPage {
  /**  */
  hero?: PageHero2Component;

  /**  */
  packages?: PagePackagesComponent;

  /**  */
  seo?: SharedSeoComponent;

  /**  */
  mainMenu?: any | null[];

  /**  */
  footerMenu?: any | null[];

  /**  */
  supHeader?: SharedSupHeaderComponent;

  /**  */
  highlightHotels?: PageHighlightHotelsComponent;

  /**  */
  searchMenu: SharedSearchMenuComponent;

  /**  */
  createdAt?: Date;

  /**  */
  updatedAt?: Date;

  /**  */
  createdBy?: object;

  /**  */
  updatedBy?: object;

  /**  */
  localizations?: object;

  /**  */
  locale?: string;
}

export interface LandingPageResponseDataObject {
  /**  */
  id?: number;

  /**  */
  attributes?: LandingPage;
}

export interface LandingPageResponse {
  /**  */
  data?: LandingPageResponseDataObject;

  /**  */
  meta?: object;
}

export interface PageHero2Component {
  /**  */
  id?: number;

  /**  */
  title?: string;

  /**  */
  subtitle?: string;

  /**  */
  media?: object;

  /**  */
  tag?: object;
}

export interface PagePackagesComponent {
  /**  */
  id?: number;

  /**  */
  title?: string;

  /**  */
  subtitle?: string;

  /**  */
  landscapePackage?: object[];
}

export interface SharedSeoComponent {
  /**  */
  id?: number;

  /**  */
  metaTitle?: string;

  /**  */
  metaDescription?: string;

  /**  */
  shareImage?: object;
}

export interface SharedMenuLinkComponent {
  /**  */
  id?: number;

  /**  */
  title?: string;

  /**  */
  link?: string;

  /**  */
  icon?: object;
}

export interface SharedLinkComponent {
  /**  */
  id?: number;

  /**  */
  link?: string;

  /**  */
  title?: string;
}

export interface PageMenuComponent {
  /**  */
  id?: number;

  /**  */
  __component?: string;

  /**  */
  name?: string;

  /**  */
  title?: string;

  /**  */
  subtitle?: string;

  /**  */
  icon_white?: object;

  /**  */
  entries?: SharedMenuLinkComponent[];

  /**  */
  icon_black?: object;

  /**  */
  icon_mobile_open?: object;

  /**  */
  icon_mobile_close?: object;

  /**  */
  menu_button?: SharedLinkComponent;

  /**  */
  gallery?: object;
}

export interface SharedSupHeaderComponent {
  /**  */
  id?: number;

  /**  */
  hotelName?: string;

  /**  */
  phoneNumber?: string;

  /**  */
  languageIcon?: object;

  /**  */
  languageList?: any | null;

  /**  */
  emailHotel?: string;

  /**  */
  defaultPhoneNumber?: string;
}

export interface PageHighlightHotelsComponent {
  /**  */
  id?: number;

  /**  */
  highlightItems?: object[];

  /**  */
  mapHotelTitle?: string;

  /**  */
  mapHotelSubtitle?: string;

  /**  */
  title?: string;

  /**  */
  subtitle?: string;
}

export interface SharedSearchMenuComponent {
  /**  */
  id?: number;

  /**  */
  locationHotel?: object;

  /**  */
  calendar?: object;

  /**  */
  guestAndRooms?: object;
}

export interface LocaleTableLocalizationRequest {
  /**  */
  name: string;

  /**  */
  entries: SharedNameValuePairComponent[];

  /**  */
  locale: string;
}

export interface LocaleTableRequest {
  /**  */
  data: object;
}

export interface LocaleTableResponseDataObjectLocalized {
  /**  */
  id?: number;

  /**  */
  attributes?: LocaleTable;
}

export interface LocaleTableLocalizationResponse {
  /**  */
  data?: LocaleTableResponseDataObjectLocalized;

  /**  */
  meta?: object;
}

export interface LocaleTableListResponseDataItemLocalized {
  /**  */
  id?: number;

  /**  */
  attributes?: LocaleTable;
}

export interface LocaleTableLocalizationListResponse {
  /**  */
  data?: LocaleTableListResponseDataItemLocalized[];

  /**  */
  meta?: object;
}

export interface LocaleTableListResponseDataItem {
  /**  */
  id?: number;

  /**  */
  attributes?: LocaleTable;
}

export interface LocaleTableListResponse {
  /**  */
  data?: LocaleTableListResponseDataItem[];

  /**  */
  meta?: object;
}

export interface LocaleTable {
  /**  */
  name: string;

  /**  */
  entries: SharedNameValuePairComponent[];

  /**  */
  createdAt?: Date;

  /**  */
  updatedAt?: Date;

  /**  */
  publishedAt?: Date;

  /**  */
  createdBy?: object;

  /**  */
  updatedBy?: object;

  /**  */
  localizations?: object;

  /**  */
  locale?: string;
}

export interface LocaleTableResponseDataObject {
  /**  */
  id?: number;

  /**  */
  attributes?: LocaleTable;
}

export interface LocaleTableResponse {
  /**  */
  data?: LocaleTableResponseDataObject;

  /**  */
  meta?: object;
}

export interface SharedNameValuePairComponent {
  /**  */
  id?: number;

  /**  */
  name?: string;

  /**  */
  value?: string;
}

export interface PageRequest {
  /**  */
  data: object;
}

export interface PageListResponseDataItem {
  /**  */
  id?: number;

  /**  */
  attributes?: Page;
}

export interface PageListResponse {
  /**  */
  data?: PageListResponseDataItem[];

  /**  */
  meta?: object;
}

export interface Page {
  /**  */
  title: string;

  /**  */
  subtitle?: string;

  /**  */
  cover?: object;

  /**  */
  slug?: string;

  /**  */
  type: EnumPageType;

  /**  */
  blocks?: any | null[];

  /**  */
  data?: any | null;

  /**  */
  createdAt?: Date;

  /**  */
  updatedAt?: Date;

  /**  */
  publishedAt?: Date;

  /**  */
  createdBy?: object;

  /**  */
  updatedBy?: object;
}

export interface PageResponseDataObject {
  /**  */
  id?: number;

  /**  */
  attributes?: Page;
}

export interface PageResponse {
  /**  */
  data?: PageResponseDataObject;

  /**  */
  meta?: object;
}

export interface PrivacyPolicyLocalizationRequest {
  /**  */
  body: string;

  /**  */
  locale: string;
}

export interface PrivacyPolicyRequest {
  /**  */
  data: object;
}

export interface PrivacyPolicyResponseDataObjectLocalized {
  /**  */
  id?: number;

  /**  */
  attributes?: PrivacyPolicy;
}

export interface PrivacyPolicyLocalizationResponse {
  /**  */
  data?: PrivacyPolicyResponseDataObjectLocalized;

  /**  */
  meta?: object;
}

export interface PrivacyPolicyListResponseDataItemLocalized {
  /**  */
  id?: number;

  /**  */
  attributes?: PrivacyPolicy;
}

export interface PrivacyPolicyLocalizationListResponse {
  /**  */
  data?: PrivacyPolicyListResponseDataItemLocalized[];

  /**  */
  meta?: object;
}

export interface PrivacyPolicyListResponseDataItem {
  /**  */
  id?: number;

  /**  */
  attributes?: PrivacyPolicy;
}

export interface PrivacyPolicyListResponse {
  /**  */
  data?: PrivacyPolicyListResponseDataItem[];

  /**  */
  meta?: object;
}

export interface PrivacyPolicy {
  /**  */
  body: string;

  /**  */
  createdAt?: Date;

  /**  */
  updatedAt?: Date;

  /**  */
  publishedAt?: Date;

  /**  */
  createdBy?: object;

  /**  */
  updatedBy?: object;

  /**  */
  localizations?: object;

  /**  */
  locale?: string;
}

export interface PrivacyPolicyResponseDataObject {
  /**  */
  id?: number;

  /**  */
  attributes?: PrivacyPolicy;
}

export interface PrivacyPolicyResponse {
  /**  */
  data?: PrivacyPolicyResponseDataObject;

  /**  */
  meta?: object;
}

export interface ProcessMenuLocalizationRequest {
  /**  */
  processMenu?: SharedProcessStepComponent[];

  /**  */
  locale: string;
}

export interface ProcessMenuRequest {
  /**  */
  data: object;
}

export interface ProcessMenuResponseDataObjectLocalized {
  /**  */
  id?: number;

  /**  */
  attributes?: ProcessMenu;
}

export interface ProcessMenuLocalizationResponse {
  /**  */
  data?: ProcessMenuResponseDataObjectLocalized;

  /**  */
  meta?: object;
}

export interface ProcessMenuListResponseDataItemLocalized {
  /**  */
  id?: number;

  /**  */
  attributes?: ProcessMenu;
}

export interface ProcessMenuLocalizationListResponse {
  /**  */
  data?: ProcessMenuListResponseDataItemLocalized[];

  /**  */
  meta?: object;
}

export interface ProcessMenuListResponseDataItem {
  /**  */
  id?: number;

  /**  */
  attributes?: ProcessMenu;
}

export interface ProcessMenuListResponse {
  /**  */
  data?: ProcessMenuListResponseDataItem[];

  /**  */
  meta?: object;
}

export interface ProcessMenu {
  /**  */
  processMenu?: SharedProcessStepComponent[];

  /**  */
  createdAt?: Date;

  /**  */
  updatedAt?: Date;

  /**  */
  createdBy?: object;

  /**  */
  updatedBy?: object;

  /**  */
  localizations?: object;

  /**  */
  locale?: string;
}

export interface ProcessMenuResponseDataObject {
  /**  */
  id?: number;

  /**  */
  attributes?: ProcessMenu;
}

export interface ProcessMenuResponse {
  /**  */
  data?: ProcessMenuResponseDataObject;

  /**  */
  meta?: object;
}

export interface SharedProcessStepComponent {
  /**  */
  id?: number;

  /**  */
  step?: number;

  /**  */
  stepName?: string;

  /**  */
  slug?: string;
}

export interface PropertyRequest {
  /**  */
  data: object;
}

export interface PropertyListResponseDataItem {
  /**  */
  id?: number;

  /**  */
  attributes?: Property;
}

export interface PropertyListResponse {
  /**  */
  data?: PropertyListResponseDataItem[];

  /**  */
  meta?: object;
}

export interface Property {
  /**  */
  name?: string;

  /**  */
  location?: InventoryLocationComponent;

  /**  */
  comment?: string;

  /**  */
  data?: any;

  /**  */
  code: string;

  /**  */
  image?: object;

  /**  */
  media?: any;

  /**  */
  createdAt?: Date;

  /**  */
  updatedAt?: Date;

  /**  */
  publishedAt?: Date;

  /**  */
  createdBy?: object;

  /**  */
  updatedBy?: object;
}

export interface PropertyResponseDataObject {
  /**  */
  id?: number;

  /**  */
  attributes?: Property;
}

export interface PropertyResponse {
  /**  */
  data?: PropertyResponseDataObject;

  /**  */
  meta?: object;
}

export interface PropertyPageLocalizationRequest {
  /**  */
  property?: AllPropertyTypes;

  /**  */
  hero?: PageHero2Component;

  /**  */
  about?: RoomAboutComponent;

  /**  */
  services?: RoomServiceSectionComponent;

  /**  */
  recommendation?: RoomRecommendationComponent[];

  /**  */
  history?: RoomHistoryComponent;

  /**  */
  gallery?: RoomGalleryComponent[];

  /**  */
  team?: RoomTeamComponent;

  /**  */
  foodAndBeverage?: InventoryFoodAndBeverageComponent;

  /**  */
  hotelRooms?: RoomHotelRoomsComponent;

  /**  */
  highlight?: PageHighlightsComponent;

  /**  */
  serviceHeading?: PageServiceHeadingComponent;

  /**  */
  reviewHeading?: PageServiceHeadingComponent;

  /**  */
  locale: string;
}

export interface PropertyPageRequest {
  /**  */
  data: object;
}

export interface PropertyPageResponseDataObjectLocalized {
  /**  */
  id?: number;

  /**  */
  attributes?: PropertyPage;
}

export interface PropertyPageLocalizationResponse {
  /**  */
  data?: PropertyPageResponseDataObjectLocalized;

  /**  */
  meta?: object;
}

export interface PropertyPageListResponseDataItemLocalized {
  /**  */
  id?: number;

  /**  */
  attributes?: PropertyPage;
}

export interface PropertyPageLocalizationListResponse {
  /**  */
  data?: PropertyPageListResponseDataItemLocalized[];

  /**  */
  meta?: object;
}

export interface PropertyPageListResponseDataItem {
  /**  */
  id?: number;

  /**  */
  attributes?: PropertyPage;
}

export interface PropertyPageListResponse {
  /**  */
  data?: PropertyPageListResponseDataItem[];

  /**  */
  meta?: object;
}

export interface PropertyPage {
  /**  */
  property?: object;

  /**  */
  hero?: PageHero2Component;

  /**  */
  about?: RoomAboutComponent;

  /**  */
  services?: RoomServiceSectionComponent;

  /**  */
  recommendation?: RoomRecommendationComponent[];

  /**  */
  history?: RoomHistoryComponent;

  /**  */
  gallery?: RoomGalleryComponent[];

  /**  */
  team?: RoomTeamComponent;

  /**  */
  foodAndBeverage?: InventoryFoodAndBeverageComponent;

  /**  */
  hotelRooms?: RoomHotelRoomsComponent;

  /**  */
  highlight?: PageHighlightsComponent;

  /**  */
  serviceHeading?: PageServiceHeadingComponent;

  /**  */
  reviewHeading?: PageServiceHeadingComponent;

  /**  */
  createdAt?: Date;

  /**  */
  updatedAt?: Date;

  /**  */
  createdBy?: object;

  /**  */
  updatedBy?: object;

  /**  */
  localizations?: object;

  /**  */
  locale?: string;
}

export interface PropertyPageResponseDataObject {
  /**  */
  id?: number;

  /**  */
  attributes?: PropertyPage;
}

export interface PropertyPageResponse {
  /**  */
  data?: PropertyPageResponseDataObject;

  /**  */
  meta?: object;
}

export interface RoomAboutComponent {
  /**  */
  id?: number;

  /**  */
  text?: string;

  /**  */
  icons?: object[];

  /**  */
  contactInfo?: object[];
}

export interface RoomServiceSectionComponent {
  /**  */
  id?: number;

  /**  */
  service?: object[];

  /**  */
  text?: string;
}

export interface RoomRecommendationComponent {
  /**  */
  id?: number;

  /**  */
  text?: string;

  /**  */
  title?: string;

  /**  */
  media?: object[];

  /**  */
  icon?: object;
}

export interface RoomHistoryComponent {
  /**  */
  id?: number;

  /**  */
  title?: string;

  /**  */
  text?: string;

  /**  */
  entries?: object[];

  /**  */
  icon?: object;
}

export interface RoomGalleryComponent {
  /**  */
  id?: number;

  /**  */
  title?: string;

  /**  */
  text?: string;

  /**  */
  media?: object[];
}

export interface RoomTeamComponent {
  /**  */
  id?: number;

  /**  */
  title?: string;

  /**  */
  text?: string;

  /**  */
  members?: object;

  /**  */
  icon?: object;
}

export interface InventoryFoodAndBeverageComponent {
  /**  */
  id?: number;

  /**  */
  title?: string;

  /**  */
  text?: string;

  /**  */
  items?: object[];

  /**  */
  icon?: object;
}

export interface RoomHotelRoomsComponent {
  /**  */
  id?: number;

  /**  */
  title?: string;

  /**  */
  subtitle?: string;

  /**  */
  rooms?: object[];

  /**  */
  icon?: object;
}

export interface PageHighlightsComponent {
  /**  */
  id?: number;

  /**  */
  title?: string;

  /**  */
  description?: string;

  /**  */
  primary?: object[];

  /**  */
  icon?: object;
}

export interface PageServiceHeadingComponent {
  /**  */
  id?: number;

  /**  */
  title?: string;

  /**  */
  description?: string;

  /**  */
  icon?: object;
}

export interface PropertyTeamRequest {
  /**  */
  data: object;
}

export interface PropertyTeamListResponseDataItem {
  /**  */
  id?: number;

  /**  */
  attributes?: PropertyTeam;
}

export interface PropertyTeamListResponse {
  /**  */
  data?: PropertyTeamListResponseDataItem[];

  /**  */
  meta?: object;
}

export interface PropertyTeam {
  /**  */
  property?: object;

  /**  */
  fullname?: string;

  /**  */
  firstname?: string;

  /**  */
  salutation?: string;

  /**  */
  email?: string;

  /**  */
  phone?: string;

  /**  */
  position?: string;

  /**  */
  department?: string;

  /**  */
  image?: object;

  /**  */
  priority?: number;

  /**  */
  data?: any | null;

  /**  */
  surname?: string;

  /**  */
  createdAt?: Date;

  /**  */
  updatedAt?: Date;

  /**  */
  publishedAt?: Date;

  /**  */
  createdBy?: object;

  /**  */
  updatedBy?: object;
}

export interface PropertyTeamResponseDataObject {
  /**  */
  id?: number;

  /**  */
  attributes?: PropertyTeam;
}

export interface PropertyTeamResponse {
  /**  */
  data?: PropertyTeamResponseDataObject;

  /**  */
  meta?: object;
}

export interface ResultPageLocalizationRequest {
  /**  */
  dataNotification?: string;

  /**  */
  filterName?: SharedFilterNameComponent;

  /**  */
  locale: string;
}

export interface ResultPageRequest {
  /**  */
  data: object;
}

export interface ResultPageResponseDataObjectLocalized {
  /**  */
  id?: number;

  /**  */
  attributes?: ResultPage;
}

export interface ResultPageLocalizationResponse {
  /**  */
  data?: ResultPageResponseDataObjectLocalized;

  /**  */
  meta?: object;
}

export interface ResultPageListResponseDataItemLocalized {
  /**  */
  id?: number;

  /**  */
  attributes?: ResultPage;
}

export interface ResultPageLocalizationListResponse {
  /**  */
  data?: ResultPageListResponseDataItemLocalized[];

  /**  */
  meta?: object;
}

export interface ResultPageListResponseDataItem {
  /**  */
  id?: number;

  /**  */
  attributes?: ResultPage;
}

export interface ResultPageListResponse {
  /**  */
  data?: ResultPageListResponseDataItem[];

  /**  */
  meta?: object;
}

export interface ResultPage {
  /**  */
  dataNotification?: string;

  /**  */
  filterName?: SharedFilterNameComponent;

  /**  */
  createdAt?: Date;

  /**  */
  updatedAt?: Date;

  /**  */
  createdBy?: object;

  /**  */
  updatedBy?: object;

  /**  */
  localizations?: object;

  /**  */
  locale?: string;
}

export interface ResultPageResponseDataObject {
  /**  */
  id?: number;

  /**  */
  attributes?: ResultPage;
}

export interface ResultPageResponse {
  /**  */
  data?: ResultPageResponseDataObject;

  /**  */
  meta?: object;
}

export interface SharedFilterNameComponent {
  /**  */
  id?: number;

  /**  */
  priceRange?: string;

  /**  */
  landscape?: string;

  /**  */
  activities?: string;

  /**  */
  specialOffer?: string;

  /**  */
  priceContent?: any | null;
}

export interface SettingLocalizationRequest {
  /**  */
  name: string;

  /**  */
  entries?: SharedNameValuePairComponent[];

  /**  */
  locale: string;
}

export interface SettingRequest {
  /**  */
  data: object;
}

export interface SettingResponseDataObjectLocalized {
  /**  */
  id?: number;

  /**  */
  attributes?: Setting;
}

export interface SettingLocalizationResponse {
  /**  */
  data?: SettingResponseDataObjectLocalized;

  /**  */
  meta?: object;
}

export interface SettingListResponseDataItemLocalized {
  /**  */
  id?: number;

  /**  */
  attributes?: Setting;
}

export interface SettingLocalizationListResponse {
  /**  */
  data?: SettingListResponseDataItemLocalized[];

  /**  */
  meta?: object;
}

export interface SettingListResponseDataItem {
  /**  */
  id?: number;

  /**  */
  attributes?: Setting;
}

export interface SettingListResponse {
  /**  */
  data?: SettingListResponseDataItem[];

  /**  */
  meta?: object;
}

export interface Setting {
  /**  */
  name: string;

  /**  */
  entries?: SharedNameValuePairComponent[];

  /**  */
  createdAt?: Date;

  /**  */
  updatedAt?: Date;

  /**  */
  publishedAt?: Date;

  /**  */
  createdBy?: object;

  /**  */
  updatedBy?: object;

  /**  */
  localizations?: object;

  /**  */
  locale?: string;
}

export interface SettingResponseDataObject {
  /**  */
  id?: number;

  /**  */
  attributes?: Setting;
}

export interface SettingResponse {
  /**  */
  data?: SettingResponseDataObject;

  /**  */
  meta?: object;
}

export interface UploadFile {
  /**  */
  id?: number;

  /**  */
  name?: string;

  /**  */
  alternativeText?: string;

  /**  */
  caption?: string;

  /**  */
  width?: number;

  /**  */
  height?: number;

  /**  */
  formats?: number;

  /**  */
  hash?: string;

  /**  */
  ext?: string;

  /**  */
  mime?: string;

  /**  */
  size?: number;

  /**  */
  url?: string;

  /**  */
  previewUrl?: string;

  /**  */
  provider?: string;

  /**  */
  provider_metadata?: object;

  /**  */
  createdAt?: Date;

  /**  */
  updatedAt?: Date;
}

export interface Users_Permissions_Role {
  /**  */
  id?: number;

  /**  */
  name?: string;

  /**  */
  description?: string;

  /**  */
  type?: string;

  /**  */
  createdAt?: Date;

  /**  */
  updatedAt?: Date;
}

export interface Users_Permissions_User {
  /**  */
  id?: number;

  /**  */
  username?: string;

  /**  */
  email?: string;

  /**  */
  provider?: string;

  /**  */
  confirmed?: boolean;

  /**  */
  blocked?: boolean;

  /**  */
  createdAt?: Date;

  /**  */
  updatedAt?: Date;
}

export interface Users_Permissions_UserRegistration {
  /**  */
  jwt?: string;

  /**  */
  user?: Users_Permissions_User;
}

export interface Users_Permissions_PermissionsTree {
  /** every api */
  [additionalProperties: string]: object;
}
export type AllDataTypes = any | null | any | null;
export type AllSectionBannerTypes = any | null | any | null;
export enum EnumSharedVoucherComponentCurrency {
  'USD' = 'USD',
  'EUR' = 'EUR',
}
export type AllPropertyTypes = any | null | any | null;
export enum EnumPageType {
  'standard' = 'standard',
  'about' = 'about',
  'service' = 'service',
  'blog' = 'blog',
  'news' = 'news',
  'job' = 'job',
  'team' = 'team',
}
