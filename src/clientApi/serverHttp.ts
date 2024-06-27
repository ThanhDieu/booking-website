import { bookingsServiceOptions } from '@/service/bookingService';
import { bundleServiceOptions } from '@/service/bundleService';
import { inventoryServiceOptions } from '@/service/inventoryService';
import { ratePlanServiceOptions } from '@/service/ratePlanService';
import { userServiceOptions } from '@/service/userService';
import { voucherServiceOptions } from '@/service/voucherService';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { financeServiceOptions } from '@/service/financeService';
import { localStorageKey } from '@/context/auth/authFunction';


const serverHttp = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/orion/v1`,
});

serverHttp.interceptors.request.use((config) => {
  const user = localStorage.getItem(localStorageKey);
  if (user && JSON.parse(user)?.sessionToken) {
    const { sessionToken, sessionId } = JSON.parse(user);
    config.headers.SessionId = sessionId;
    config.headers.SessionToken = `Bearer ${sessionToken}`;
  }
  return config;
});

serverHttp.interceptors.response.use(
  async function(response: AxiosResponse) {
    return response;
  },
  function(error: AxiosError) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

bundleServiceOptions.axios = serverHttp;
userServiceOptions.axios = serverHttp;
ratePlanServiceOptions.axios = serverHttp;
inventoryServiceOptions.axios = serverHttp;
voucherServiceOptions.axios = serverHttp;
bookingsServiceOptions.axios = serverHttp;
financeServiceOptions.axios = serverHttp;

export default serverHttp;
