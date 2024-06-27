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
export interface InventoryServiceOptions {
  axios?: AxiosInstance;
  /** only in axios interceptor config*/
  loading: boolean;
  showError: boolean;
}

// Add default options
export const inventoryServiceOptions: InventoryServiceOptions = {};

// Instance selector
export function axios(
  configs: IRequestConfig,
  resolve: (p: any) => void,
  reject: (p: any) => void
): Promise<any> {
  if (inventoryServiceOptions.axios) {
    return inventoryServiceOptions.axios
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
    loading: inventoryServiceOptions.loading,
    showError: inventoryServiceOptions.showError,
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

export class AdminAvailabilityService {
  /**
   * Get availability services
   */
  static getAvailabilityServices(
    params: {
      /** propertyId */
      propertyId: string;
      /** from */
      from: string;
      /** to */
      to: string;
      /** timeSliceTemplate */
      timeSliceTemplate?: string;
      /** channelCodes */
      channelCodes?: string;
      /** pageNumber */
      pageNumber?: number;
      /** pageSize */
      pageSize?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = '/admin/availability/v1/services';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        propertyId: params['propertyId'],
        from: params['from'],
        to: params['to'],
        timeSliceTemplate: params['timeSliceTemplate'],
        channelCodes: params['channelCodes'],
        pageNumber: params['pageNumber'],
        pageSize: params['pageSize'],
      };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get availability unit groups
   */
  static getAvailabilityUnitGroups(
    params: {
      /** propertyId */
      propertyId: string;
      /** from */
      from?: number;
      /** to */
      to?: number;
      /** timeSliceTemplate */
      timeSliceTemplate?: string;
      /** unitGroupTypes */
      unitGroupTypes?: string[];
      /** unitGroupIds */
      unitGroupIds?: string[];
      /** adults */
      adults?: number;
      /** onlySellable */
      onlySellable?: boolean;
      /** currentPage */
      currentPage?: number;
      /** perPage */
      perPage?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = '/admin/availability/v1/unit-groups';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        propertyId: params['propertyId'],
        from: params['from'],
        to: params['to'],
        timeSliceTemplate: params['timeSliceTemplate'],
        unitGroupTypes: params['unitGroupTypes'],
        unitGroupIds: params['unitGroupIds'],
        adults: params['adults'],
        onlySellable: params['onlySellable'],
        currentPage: params['currentPage'],
        perPage: params['perPage'],
      };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get availability units
   */
  static getAvailabilityUnits(
    params: {
      /** propertyId */
      propertyId: string;
      /** unitGroupId */
      unitGroupId?: string;
      /** from */
      from: string;
      /** to */
      to: string;
      /** pageNumber */
      pageNumber?: number;
      /** pageSize */
      pageSize?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = '/admin/inventory/availability/v1/units';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        propertyId: params['propertyId'],
        unitGroupId: params['unitGroupId'],
        from: params['from'],
        to: params['to'],
        pageNumber: params['pageNumber'],
        pageSize: params['pageSize'],
      };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
}

export class AdminActivityService {
  /**
   * Get admin all activities
   */
  static getAdminAllActivities(
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
      let url = '/admin/inventory/activities';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        perPage: params['perPage'],
        currentPage: params['currentPage'],
        sorts: params['sorts'],
      };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get Admin Activity
   */
  static getAdminActivity(
    params: {
      /** id */
      id: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = '/admin/inventory/activities/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
}

export class ActivityService {
  /**
   * Create activity
   */
  static createActivity(
    params: {
      /** CreateActivity */
      createActivity: backend_CreateActivity;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = '/admin/inventory/activities';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params['createActivity'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Update activity
   */
  static updateActivity(
    params: {
      /** id */
      id: string;
      /** CreateActivity */
      updateActivity: backend_CreateActivity;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = '/admin/inventory/activities/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = params['updateActivity'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Delete activity
   */
  static deleteActivity(
    params: {
      /** id */
      id: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = '/admin/inventory/activities/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get all activities
   */
  static getAllActivities(
    params: {
      /** perPage */
      perPage?: number;
      /** currentPage */
      currentPage?: number;
      /** sorts */
      sorts?: string[];
    } = {} as any | undefined,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = '/inventory/activities';
      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        perPage: params['perPage'],
        currentPage: params['currentPage'],
        sorts: params['sorts'],
      };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get Activity
   */
  static getActivity(
    params: {
      /** id */
      id: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = '/inventory/activities/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
}

export class AdminAttributeService {
  /**
   * Get all attributes
   */
  static getAllAttributes(
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
      let url = '/admin/inventory/attributes';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        perPage: params['perPage'],
        currentPage: params['currentPage'],
        sorts: params['sorts'],
      };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get attribute by id
   */
  static getAttributeById(
    params: {
      /** id */
      id: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = '/admin/inventory/attributes/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Update attribute
   */
  static updateAttribute(
    params: {
      /** id */
      id: string;
      /** AttributeRequest */
      attributeRequest: backend_Attribute;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = '/admin/inventory/attributes/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = params['attributeRequest'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
}

export class AdminReservationAvailabilityService {
  /**
   * Get a list of all available units for a reservation
   */
  static getReservationsAvailabilityUnits(
    params: {
      /** id */
      id: string;
      /** unitGroupId */
      unitGroupId?: string;
      /** from */
      from?: number;
      /** to */
      to?: number;
      /** includeOutOfService */
      includeOutOfService?: boolean;
      /** unitCondition */
      unitCondition?: string;
      /** currentPage */
      currentPage?: number;
      /** perPage */
      perPage?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = '/admin/inventory/availability/v1/reservations/{id}/units';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        unitGroupId: params['unitGroupId'],
        from: params['from'],
        to: params['to'],
        includeOutOfService: params['includeOutOfService'],
        unitCondition: params['unitCondition'],
        currentPage: params['currentPage'],
        perPage: params['perPage'],
      };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
}

export class LandscapeService {
  /**
   * Get admin all landscape
   */
  static getAdminAllLandscape(
    params: {
      /** perPage */
      perPage?: number;
      /** currentPage */
      currentPage?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = '/admin/inventory/landscapes';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { perPage: params['perPage'], currentPage: params['currentPage'] };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Create landscape
   */
  static createLandscape(
    params: {
      /** CreateLandscape */
      createLandscape: backend_CreateLandscape;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = '/admin/inventory/landscapes';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params['createLandscape'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Update landscape
   */
  static updateLandscape(
    params: {
      /** id */
      id: string;
      /** UpdateLandscape */
      updateLandscape: backend_UpdateLandscape;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = '/admin/inventory/landscapes/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = params['updateLandscape'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Delete landscape
   */
  static deleteLandscape(
    params: {
      /** id */
      id: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = '/admin/inventory/landscapes/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get Landscape
   */
  static getLandscape(
    params: {
      /** id */
      id: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = '/inventory/landscapes/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
}

export class AdminPropertyService {
  /**
   * Get admin all properties
   */
  static getAdminAllProperties(
    params: {
      /** includePrice */
      includePrice?: boolean;
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
      let url = '/admin/inventory/properties';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        includePrice: params['includePrice'],
        perPage: params['perPage'],
        currentPage: params['currentPage'],
        sorts: params['sorts'],
      };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get admin property by id
   */
  static getAdminPropertyById(
    params: {
      /** id */
      id: string;
      /** priceInclude */
      priceInclude?: boolean;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = '/admin/inventory/properties/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { priceInclude: params['priceInclude'] };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Update property
   */
  static updateProperty(
    params: {
      /** id */
      id: string;
      /** UpdateProperty */
      updateProperty: backend_UpdateProperty;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = '/admin/inventory/properties/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = params['updateProperty'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
}

export class SpecialBundleService {
  /**
   * Get admin all special bundles
   */
  static getAdminAllSpecialBundles(
    params: {
      /** perPage */
      perPage?: number;
      /** currentPage */
      currentPage?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = '/admin/inventory/special-bundles';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { perPage: params['perPage'], currentPage: params['currentPage'] };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get all special bundles
   */
  static getAllSpecialBundles(
    params: {
      /** perPage */
      perPage?: number;
      /** currentPage */
      currentPage?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = '/inventory/special-bundles';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { perPage: params['perPage'], currentPage: params['currentPage'] };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
}

export class AdminTagService {
  /**
   * Get all tags
   */
  static getAdminAllTags(
    params: {
      /** type */
      type?: string;
      /** propertyId */
      propertyId?: string;
      /** status */
      status?: boolean;
      /** isGlobal */
      isGlobal?: boolean;
      /** tagId */
      tagId?: string;
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
      let url = '/admin/inventory/tags';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        type: params['type'],
        propertyId: params['propertyId'],
        status: params['status'],
        isGlobal: params['isGlobal'],
        tagId: params['tagId'],
        perPage: params['perPage'],
        currentPage: params['currentPage'],
        sorts: params['sorts'],
      };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Create tag
   */
  static createTag(
    params: {
      /** CreateTag */
      createTag: backend_CreateTag;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = '/admin/inventory/tags';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params['createTag'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get Tag
   */
  static getTag(
    params: {
      /** id */
      id: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = '/admin/inventory/tags/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Update tag
   */
  static updateTag(
    params: {
      /** id */
      id: string;
      /** UpdateTag */
      updateTag: backend_UpdateTag;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = '/admin/inventory/tags/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = params['updateTag'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Delete tag
   */
  static deleteTag(
    params: {
      /** id */
      id: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = '/admin/inventory/tags/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
}

export class AdminUnitGroupService {
  /**
   * Get all unit groups
   */
  static getAllUnitGroups(
    params: {
      /** priceInclude */
      priceInclude?: boolean;
      /** propertyId */
      propertyId?: string;
      /** periods */
      periods?: string[];
      /** ratePlanInclude */
      ratePlanInclude?: boolean;
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
      let url = '/admin/inventory/unit-groups';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        priceInclude: params['priceInclude'],
        propertyId: params['propertyId'],
        periods: params['periods'],
        ratePlanInclude: params['ratePlanInclude'],
        perPage: params['perPage'],
        currentPage: params['currentPage'],
        sorts: params['sorts'],
      };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Create unit group
   */
  static createUnitGroup(
    params: {
      /** CreateUnitGroup */
      createUnitGroup: backend_CreateUnitGroup;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = '/admin/inventory/unit-groups';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params['createUnitGroup'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get unit group by id
   */
  static getUnitGroupById(
    params: {
      /** id */
      id: string;
      /** priceInclude */
      priceInclude?: boolean;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = '/admin/inventory/unit-groups/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { priceInclude: params['priceInclude'] };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Update unit group
   */
  static updateUnitGroup(
    params: {
      /** id */
      id: string;
      /** UpdateUnitGroup */
      updateUnitGroup: backend_UpdateUnitGroup;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = '/admin/inventory/unit-groups/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = params['updateUnitGroup'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Delete unit group
   */
  static deleteUnitGroup(
    params: {
      /** id */
      id: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = '/admin/inventory/unit-groups/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
}

export class AdminUnitService {
  /**
   * Get all units
   */
  static getAllUnits(
    params: {
      /** propertyId */
      propertyId?: string;
      /** unitGroupIds */
      unitGroupIds?: string[];
      /** tagIds */
      tagIds?: string[];
      /** isOccupied */
      isOccupied?: boolean;
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
      let url = '/admin/inventory/units';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        propertyId: params['propertyId'],
        unitGroupIds: params['unitGroupIds'],
        tagIds: params['tagIds'],
        isOccupied: params['isOccupied'],
        perPage: params['perPage'],
        currentPage: params['currentPage'],
        sorts: params['sorts'],
      };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Create unit
   */
  static createUnit(
    params: {
      /** CreateUnit */
      createUnit: backend_CreateUnit;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = '/admin/inventory/units';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params['createUnit'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get unit by id
   */
  static getUnitById(
    params: {
      /** id */
      id: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = '/admin/inventory/units/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Update unit
   */
  static updateUnit(
    params: {
      /** id */
      id: string;
      /** UpdateUnit */
      updateUnit: backend_UpdateUnit;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = '/admin/inventory/units/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = params['updateUnit'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Delete unit
   */
  static deleteUnit(
    params: {
      /** id */
      id: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = '/admin/inventory/units/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
}

export class EventsService {
  /**
   * Get all events
   */
  static getAllEvents(
    params: {
      /** propertyId */
      propertyId?: string;
      /** perPage */
      perPage?: number;
      /** currentPage */
      currentPage?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = '/inventory/events';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        propertyId: params['propertyId'],
        perPage: params['perPage'],
        currentPage: params['currentPage'],
      };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
}

export class PropertyService {
  /**
   * Get all properties
   */
  static getAllProperties(
    params: {
      /** includePrice */
      includePrice?: boolean;
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
      let url = '/inventory/properties';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        includePrice: params['includePrice'],
        perPage: params['perPage'],
        currentPage: params['currentPage'],
        sorts: params['sorts'],
      };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get location
   */
  static getLocation(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = '/inventory/properties/locations/search';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get property by id
   */
  static getPropertyById(
    params: {
      /** id */
      id: string;
      /** priceInclude */
      priceInclude?: boolean;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = '/inventory/properties/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { priceInclude: params['priceInclude'] };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
}

export class TagService {
  /**
   * Get all tags
   */
  static getAllTags(
    params: {
      /** type */
      type?: string;
      /** propertyId */
      propertyId?: string;
      /** status */
      status?: boolean;
      /** isGlobal */
      isGlobal?: boolean;
      /** tagId */
      tagId?: string;
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
      let url = '/inventory/tags';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        type: params['type'],
        propertyId: params['propertyId'],
        status: params['status'],
        isGlobal: params['isGlobal'],
        tagId: params['tagId'],
        perPage: params['perPage'],
        currentPage: params['currentPage'],
        sorts: params['sorts'],
      };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
}

export interface backend_Attribute {
  /**  */
  category?: string;

  /**  */
  comment?: string;

  /**  */
  data?: gormjsonb_JSONB;

  /**  */
  description?: string;

  /**  */
  disabled?: boolean;

  /**  */
  extId?: string;

  /**  */
  extendedData?: gormjsonb_JSONB;

  /**  */
  name?: string;

  /**  */
  priority?: number;

  /**  */
  title?: string;

  /**  */
  type?: string;

  /**  */
  version?: string;
}

export interface backend_CreateActivity {
  /**  */
  icon?: string;

  /**  */
  media?: string;

  /**  */
  title?: string;
}

export interface backend_CreateLandscape {
  /**  */
  icons?: backend_Icons;

  /**  */
  title?: string;
}

export interface backend_CreateTag {
  /**  */
  color?: string;

  /**  */
  description?: string;

  /**  */
  extendedData?: gormjsonb_JSONB;

  /**  */
  icon?: string;

  /**  */
  isGlobal?: boolean;

  /**  */
  propertyIds?: string[];

  /**  */
  status?: boolean;

  /**  */
  title?: string;

  /** unit, service, polic msgpack:"type"` // unit, service, policy */
  type?: string;
}

export interface backend_CreateUnit {
  /**  */
  description: string;

  /**  */
  maxPersons?: number;

  /**  */
  propertyId: string;

  /**  */
  size?: number;

  /**  */
  title: string;

  /**  */
  unitGroupId?: string;
}

export interface backend_CreateUnitGroup {
  /**  */
  code?: string;

  /**  */
  description?: string;

  /**  */
  maxPersons?: number;

  /**  */
  media?: string[];

  /**  */
  priority?: number;

  /**  */
  propertyId?: string;

  /**  */
  size?: number;

  /**  */
  tagIds?: string[];

  /**  */
  title?: string;
}

export interface backend_Icons {
  /**  */
  dark?: string;

  /**  */
  light?: string;
}

export interface backend_UpdateLandscape {
  /**  */
  icons?: backend_Icons;

  /**  */
  title?: string;
}

export interface backend_UpdateProperty {
  /**  */
  end?: number;

  /**  */
  landscapeId?: string;

  /**  */
  media?: string[];

  /**  */
  start?: number;

  /**  */
  tagIds?: string[];
}

export interface backend_UpdateTag {
  /**  */
  color?: string;

  /**  */
  description?: string;

  /**  */
  extendedData?: gormjsonb_JSONB;

  /**  */
  icon?: string;

  /**  */
  isGlobal?: boolean;

  /**  */
  propertyIds?: string[];

  /**  */
  status?: boolean;

  /**  */
  title?: string;
}

export interface backend_UpdateUnit {
  /**  */
  size?: number;

  /**  */
  tagIds?: string[];
}

export interface backend_UpdateUnitGroup {
  /**  */
  maximumDiscount?: number;

  /**  */
  media?: string[];

  /**  */
  minimumPrice?: number;

  /**  */
  priority?: number;

  /**  */
  size?: number;

  /**  */
  tagIds?: string[];
}

export interface gormjsonb_JSONB { }
