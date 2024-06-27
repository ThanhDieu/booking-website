import { getTokenInLocal } from '@/constants/loginConst';
import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

import https from 'https';
import { userAgent } from 'next/server';
interface AdaptAxiosRequestConfig extends AxiosRequestConfig {
  headers: AxiosRequestHeaders
}

const http = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/orion/v1`,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
  // withCredentials: true,
});


http.interceptors.response.use(
  function(response: AxiosResponse) {
    return response.data;
  },
  function(error: AxiosError) {

    return Promise.reject(error);
  }
);


export default http;
