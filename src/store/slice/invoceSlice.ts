import {
  AddonsSliceType,
  BundlePriceType,
  ServiceAddonsPayloadType,
} from '@/types/invoceSliceType/invoceSliceType';
import { createSlice } from '@reduxjs/toolkit';

export interface InvoiceSliceType {
  bundlePrice?: BundlePriceType;
  serviceAddons: ServiceAddonsPayloadType;
}

const initialState: InvoiceSliceType = {
  bundlePrice: undefined,
  serviceAddons: {
    baseService: [],
    addons: [],
  },
};

const invoiceSlice = createSlice({
  name: 'invoiceSlice',
  initialState,
  reducers: {
    resetInvoiceSlice: () => initialState,
    setBundlePrice: (state, { payload }) => {
      state.bundlePrice = payload;
    },
    setBaseService: (state, { payload }) => {
      state.serviceAddons = { ...state.serviceAddons, baseService: payload };
    },
    setAddonsService: (state, { payload }) => {
      if (payload?.serviceId) {
        const findService = state.serviceAddons.addons.find(
          (service) => service.serviceId === payload.serviceId
        );
        if (findService) {
          const serviceFilter = state.serviceAddons.addons.filter(
            (state) => state.serviceId !== payload.serviceId
          );
          state.serviceAddons = { ...state.serviceAddons, addons: serviceFilter };
        } else {
          state.serviceAddons = {
            ...state.serviceAddons,
            addons: [...state.serviceAddons.addons, payload],
          };
        }
      }
    },
    deleteAddonsService: (state, { payload }) => {
      const findService = state.serviceAddons.addons.filter((item) => item.serviceId !== payload);
      state.serviceAddons = { ...state.serviceAddons, addons: findService };
    },
    decreaseQuantityService: (state, { payload }) => {
      const findOne = state.serviceAddons.addons.find((item) => item.serviceId === payload);
      if (findOne && findOne.count > 1) {
        state.serviceAddons.addons = state.serviceAddons.addons?.map((ele) => {
          if (ele.count > 0 && ele.serviceId === payload) {
            return { ...ele, count: ele.count - 1 };
          } else {
            return ele;
          }
        });
      } else if (findOne && findOne.count === 1) {
        const filterServcie = state.serviceAddons.addons.filter(
          (service) => service.serviceId !== payload
        );
        state.serviceAddons.addons = filterServcie;
      }
    },
    increaseQuantityService: (state, { payload }) => {
      const findOne = state.serviceAddons.addons.find(
        (item: AddonsSliceType) => item.serviceId === payload
      );
      if (findOne && findOne.count < findOne.maxCount) {
        state.serviceAddons.addons = state.serviceAddons.addons?.map((ele) => {
          if (ele.count < ele.maxCount && ele.serviceId === payload) {
            return { ...ele, count: ele.count + 1 };
          } else {
            return ele;
          }
        });
      }
    },
  },
});

export const {
  resetInvoiceSlice,
  setBundlePrice,
  setBaseService,
  setAddonsService,
  deleteAddonsService,
  decreaseQuantityService,
  increaseQuantityService,
} = invoiceSlice.actions;

export default invoiceSlice.reducer;
