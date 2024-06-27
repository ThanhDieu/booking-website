import { PaymentService } from '@/service/bookingService';
import { BundleService } from '@/service/bundleService';
import { BundleType } from '@/types/bundle/bundleType';
import { FetchAllBundlePayload, LocationGlobalType } from '@/types/commonSliceType/commonSliceType';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface CommonSliceType {
  locationList: LocationGlobalType[];
  bundleList: BundleType[];
  appFilter: {
    activities?: string[];
    landscape?: string,
    specialBundle?: string,
  };
  isOpenCalendar: boolean;
  isOpenLocation: boolean;
  isOpenGuest: boolean;
  media: { data: { attributes: { url: string } } };
  couponTag: any
}



/** fetch all bundle */
export const thunkGetAllBundle = createAsyncThunk(
  'commonSlice/fetchAllBundle',
  async (payload: FetchAllBundlePayload, thunkApi) => {
    const res = await BundleService.loadBundles(payload);
    return res.data;
  }
);

/** fetch country location */
export const thunkFetchLocation = createAsyncThunk(
  'commonSlice/fetchLocation',
  async (_, thunkApi) => {
    const response = await PaymentService.getPaymentLocation();
    return response.data;
  }
);

const initialState: CommonSliceType = {
  locationList: [],
  bundleList: [],
  appFilter: {},
  isOpenCalendar: false,
  isOpenLocation: false,
  isOpenGuest: false,
  media: { data: { attributes: { url: '' } } },
  couponTag: {}
};

export const commonSlice = createSlice({
  name: 'commonSlice',
  initialState,
  reducers: {
    setOpenCalendar: (state, { payload }) => {
      state.isOpenCalendar = payload;
      // state.isOpenLocation = false;
      // state.isOpenGuest = false;
    },
    setOpenLocation: (state, { payload }) => {
      state.isOpenLocation = payload;
      // state.isOpenGuest = false;
    },
    setOpenGuest: (state, { payload }) => {
      state.isOpenGuest = payload;
      // state.isOpenCalendar = false;
      // state.isOpenLocation = false;
    },

    setAppFilter: (state, { payload }: PayloadAction<Partial<CommonSliceType['appFilter']>>) => {
      state.appFilter = { ...state.appFilter, ...payload };
    },
    resetAppFilter: (state, { payload }: PayloadAction<string[]>) => {
      if (payload?.length) {
        (payload as (keyof typeof state.appFilter)[]).forEach((field) => {
          delete state?.appFilter?.[field];
        });
      }
    },
    setMedia: (state, { payload }) => {
      state.media = payload;
    },

    setCouponTag: (state, { payload }) => {
      state.couponTag = payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(thunkFetchLocation.fulfilled, (state, { payload }) => {
      state.locationList = payload;
    });
    builder.addCase(thunkGetAllBundle.fulfilled, (state, { payload }) => {
      state.bundleList = payload;
    });
  },
});

export const {
  setOpenCalendar,
  setOpenLocation,
  setOpenGuest,
  setAppFilter,
  resetAppFilter,
  setMedia,
  setCouponTag,
} = commonSlice.actions;
export default commonSlice.reducer;
