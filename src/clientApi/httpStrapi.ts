import axios,{ AxiosError, AxiosResponse } from 'axios';

import https from 'https';

const httpStrapi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_STRAPI_API}/api/`,
  
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
  // withCredentials: true,
});

httpStrapi.interceptors.response.use(
  function (response: AxiosResponse) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error: AxiosError) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default httpStrapi;
