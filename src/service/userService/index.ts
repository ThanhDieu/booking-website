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
export interface UserServiceOptions {
  axios?: AxiosInstance;
  /** only in axios interceptor config*/
  loading: boolean;
  showError: boolean;
}

// Add default options
export const userServiceOptions: UserServiceOptions = {};

// Instance selector
export function axios(
  configs: IRequestConfig,
  resolve: (p: any) => void,
  reject: (p: any) => void
): Promise<any> {
  if (userServiceOptions.axios) {
    return userServiceOptions.axios
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
    loading: userServiceOptions.loading,
    showError: userServiceOptions.showError,
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

export class AuthService {
  /**
   * Auth callback
   */
  static authCallback(
    params: {
      /** code */
      code: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = '/auth/callback';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { code: params['code'] };

      axios(configs, resolve, reject);
    });
  }
  /**
   * Auth get google login url
   */
  static authGetGoogleUrl(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = '/auth/google/url';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      axios(configs, resolve, reject);
    });
  }
  /**
   * Auth register
   */
  static authRegister(
    params: {
      /** AuthRegisterRequest */
      authRegisterRequest: backend_AuthRegisterRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = '/auth/register';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params['authRegisterRequest'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
}

export class UserService {
  /**
   * User user bookings
   */
  static authUserBookings(
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
      let url = '/auth/users/bookings';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        perPage: params['perPage'],
        currentPage: params['currentPage'],
        sorts: params['sorts'],
      };

      axios(configs, resolve, reject);
    });
  }
  /**
   * User get profile
   */
  static authGetProfile(
    params: {
      /** expands */
      expands?: string[];
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<backend_User> {
    return new Promise((resolve, reject) => {
      let url = '/auth/users/profile';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { expands: params['expands'] };

      axios(configs, resolve, reject);
    });
  }
  /**
   * User update profile
   */
  static authUpdateProfile(
    params: {
      /** UpdateUser */
      updateUser: backend_UpdateUser;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = '/auth/users/profile';

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = params['updateUser'];

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
}

export interface backend_AuthLoginRequest {
  /**  */
  password?: string;

  /**  */
  username?: string;
}

export interface backend_AuthRegisterRequest {
  /**  */
  confirmPassword?: string;

  /**  */
  email?: string;

  /**  */
  firstName?: string;

  /**  */
  lastName?: string;

  /**  */
  password?: string;
}

export interface backend_RegisterUser {
  /**  */
  language: string;

  /**  */
  password: string;

  /**  */
  roles: string[];

  /**  */
  username: string;
}

export interface backend_Role {
  /**  */
  color?: string;

  /**  */
  comment?: string;

  /**  */
  extendedData?: gormjsonb_JSONB;

  /**  */
  name?: string;

  /**  */
  roleId?: string;

  /**  */
  title?: string;
}

export interface backend_UpdateUser {
  /**  */
  addressLine1?: string;

  /**  */
  addressLine2?: string;

  /**  */
  avatar?: string;

  /**  */
  city?: string;

  /**  */
  country?: string;

  /**  */
  countryCode?: string;

  /**  */
  dateOfBirth?: string;

  /**  */
  firstName?: string;

  /**  */
  gender?: string;

  /**  */
  lastName?: string;

  /**  */
  location?: string;

  /**  */
  phoneNumber?: string;

  /**  */
  postalCode?: string;

  /**  */
  title?: string;
  /**  */
  email?: string;
}

export interface backend_User {
  /**  */
  addressLine1?: string;

  /**  */
  addressLine2?: string;

  /**  */
  avatar?: string;

  /**  */
  city?: string;

  /**  */
  country?: string;

  /**  */
  countryCode?: string;

  /**  */
  dateOfBirth?: string;

  /**  */
  email?: string;

  /**  */
  enabled?: boolean;

  /**  */
  extendedData?: gormjsonb_JSONB;

  /**  */
  firstName?: string;

  /**  */
  gender?: string;

  /**  */
  language?: string;

  /**  */
  lastName?: string;

  /**  */
  location?: string;

  /**  */
  name?: string;

  /**  */
  phoneNumber?: string;

  /**  */
  postalCode?: string;

  /**  */
  roles?: backend_Role[];

  /**  */
  title?: string;

  /**  */
  type?: string;

  /**  */
  userId?: string;

  /**  */
  username?: string;
}

export interface gormjsonb_JSONB {}
