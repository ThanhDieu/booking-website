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
export interface BundleServiceOptions {
  axios?: AxiosInstance;
  /** only in axios interceptor config*/
  loading: boolean;
  showError: boolean;
}

// Add default options
export const bundleServiceOptions: BundleServiceOptions = {};

// Instance selector
export function axios(configs: IRequestConfig, resolve: (p: any) => void, reject: (p: any) => void): Promise<any> {
  if (bundleServiceOptions.axios) {
    return bundleServiceOptions.axios
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
    loading: bundleServiceOptions.loading,
    showError: bundleServiceOptions.showError,
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

export interface IList<T> extends Array<T> { }
export interface List<T> extends Array<T> { }
export interface IDictionary<TValue> {
  [key: string]: TValue;
}
export interface Dictionary<TValue> extends IDictionary<TValue> { }

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

export class BundleService {
  /**
   * Get bundles
   */
  static loadBundles(
    params: {
      /** landscape */
      landscape?: string;
      /** activities */
      activities?: string[];
      /** arrival */
      arrival?: number;
      /** departure */
      departure?: number;
      /** isHomePage */
      isHomePage?: boolean;
      /** isHotelPage */
      isHotelPage?: boolean;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any | null> {
    return new Promise((resolve, reject) => {
      let url = '/bundles';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        landscape: params['landscape'],
        activities: params['activities']?.toString(),
        arrival: params['arrival'],
        departure: params['departure'],
        isHomePage: params['isHomePage'],
        isHotelPage: params['isHotelPage']
      };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Load Bundles
   */
  static getBundles(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = '/bundles/load';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Search bundles
   */
  static searchBundles(
    params: {
      /** countryCode */
      countryCode?: string;
      /** propertyId */
      propertyId?: string;
      /** arrival */
      arrival?: number;
      /** departure */
      departure?: number;
      /** adults */
      adults: number;
      /** rooms */
      rooms: number;
      /** children */
      children?: number;
      /** childrenAgeBelow */
      childrenAgeBelow?: number;
      /** unitGroupId */
      unitGroupId?: string;
      /** landscape */
      landscape?: string;
      /** activities */
      activities?: string[];
      /** specials */
      specialBundle?: string;
      /** isHolidayPackage */
      isHolidayPackage?: boolean;
      /** mainActivity */
      mainActivity?: string;
      /** isHomePage */
      isHomePage?: boolean;
      /** isHotelPage */
      isHotelPage?: boolean;
      /** perPage */
      perPage?: number;
      /** currentPage */
      currentPage?: number;
      /** sorts */
      sorts?: string[];
      /** timezone */
      timezone?: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any | null> {
    return new Promise((resolve, reject) => {
      let url = '/bundles/search';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        countryCode: params['countryCode'],
        propertyId: params['propertyId'],
        arrival: params['arrival'],
        departure: params['departure'],
        adults: params['adults'],
        rooms: params['rooms'],
        children: params['children'],
        childrenAgeBelow: params['childrenAgeBelow']?.toString(),
        unitGroupId: params['unitGroupId'],
        landscape: params['landscape'],
        activities: params['activities']?.toString(),
        specialBundleId: params['specialBundle']?.toString(),
        isHolidayPackage: params['isHolidayPackage'],
        mainActivity: params['mainActivity'],
        isHomePage: params['isHomePage'],
        isHotelPage: params['isHotelPage'],
        perPage: params['perPage'],
        currentPage: params['currentPage'],
        sorts: params['sorts']?.toString(),
        timezone: params['timezone']
      };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Search bundle by id
   */
  static searchBundleById(
    params: {
      /** id */
      id: string;
      /** adults */
      adults: number;
      /** timezone */
      timezone?: string;
      /** children */
      children?: number[];
      /** rooms */
      rooms: number;
      /** arrival */
      arrival?: number;
      /** departure */
      departure?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any | null> {
    return new Promise((resolve, reject) => {
      let url = '/bundles/search/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        adults: params['adults'],
        timezone: params['timezone'],
        children: params['children']?.toString(),
        rooms: params['rooms'],
        arrival: params['arrival'],
        departure: params['departure']
      };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
}

export interface backend_JsonResult {
  /**  */
  code?: number;

  /**  */
  data?: any | null;

  /**  */
  message?: string;

  /**  */
  success?: boolean;
}

export interface gormjsonb_JSONB { }

export interface model_backend_ibe_Activity {
  /**  */
  activityId?: string;

  /**  */
  extendedData?: gormjsonb_JSONB;

  /**  */
  icon?: string;

  /**  */
  media?: string;

  /**  */
  name?: string;

  /**  */
  title?: string;
}

export interface model_backend_ibe_Bundle {
  /**  */
  activities?: model_backend_ibe_Activity[];

  /**  */
  bundleId?: string;

  /**  */
  bundleServices?: model_backend_ibe_BundleService[];

  /**  */
  createdBy?: string;

  /**  */
  currency?: string;

  /**  */
  description?: string;

  /**  */
  extendedData?: gormjsonb_JSONB;

  /**  */
  isHolidayPackage?: boolean;

  /**  */
  landscape?: model_backend_ibe_Landscape;

  /**  */
  maximumStay?: number;

  /**  */
  media?: string[];

  /**  */
  minimumStay?: number;

  /**  */
  name?: string;

  /**  */
  periods?: model_backend_ibe_Period[];

  /**  */
  price?: number;

  /**  */
  priceAvg?: number;

  /**  */
  priceMax?: number;

  /**  */
  priceMin?: number;

  /**  */
  priceRelaAvg?: number;

  /**  */
  priceRelaMax?: number;

  /**  */
  priceRelaMin?: number;

  /**  */
  property?: model_backend_ibe_Property;

  /**  */
  sellNumber?: number;

  /**  */
  title?: string;
}

export interface model_backend_ibe_BundleService {
  /**  */
  extendedData?: gormjsonb_JSONB;

  /**  */
  mode?: string;

  /**  */
  name?: string;

  /**  */
  originalPrice?: number;

  /**  */
  overwritePrice?: number;

  /**  */
  service?: model_backend_ibe_Service;

  /**  */
  serviceId?: string;
}

export interface model_backend_ibe_Icons {
  /**  */
  dark?: string;

  /**  */
  light?: string;
}

export interface model_backend_ibe_Landscape {
  /**  */
  extendedData?: gormjsonb_JSONB;

  /**  */
  icons?: model_backend_ibe_Icons;

  /**  */
  landscapeId?: string;

  /**  */
  name?: string;

  /**  */
  title?: string;
}

export interface model_backend_ibe_Location {
  /**  */
  addressLine1?: string;

  /**  */
  city?: string;

  /**  */
  countryCode?: string;

  /**  */
  postalCode?: string;
}

export interface model_backend_ibe_Pagination {
  /**  */
  currentPage?: number;

  /**  */
  perPage?: number;

  /**  */
  total?: number;
}

export interface model_backend_ibe_Period {
  /**  */
  end?: number;

  /**  */
  extendedData?: gormjsonb_JSONB;

  /**  */
  name?: string;

  /**  */
  start?: number;
}

export interface model_backend_ibe_Property {
  /**  */
  city?: string;

  /**  */
  country?: string;

  /**  */
  currency?: string;

  /**  */
  description?: string;

  /**  */
  extId?: string;

  /**  */
  extendedData?: gormjsonb_JSONB;

  /**  */
  landscape?: model_backend_ibe_Landscape;

  /**  */
  location?: model_backend_ibe_Location;

  /**  */
  media?: string[];

  /**  */
  name?: string;

  /**  */
  timeSliceDefinition?: model_backend_ibe_TimeSliceDefinition;

  /**  */
  version?: string;
}

export interface model_backend_ibe_Service {
  /**  */
  description?: string;

  /**  */
  disabled?: boolean;

  /**  */
  extId?: string;

  /**  */
  extendedData?: gormjsonb_JSONB;

  /**  */
  media?: string[];

  /**  */
  mode?: string;

  /**  */
  name?: string;

  /**  */
  popular?: boolean;

  /**  */
  price?: number;

  /**  */
  priority?: number;

  /**  */
  title?: string;

  /**  */
  type?: string;

  /**  */
  version?: string;
}

export interface model_backend_ibe_TimeSliceDefinition {
  /**  */
  checkInTime?: string;

  /**  */
  checkOutTime?: string;

  /**  */
  extendedData?: gormjsonb_JSONB;

  /**  */
  name?: string;
}
