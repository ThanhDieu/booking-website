import statusCode from '@/constants/statusCode';
import { localStorageKey } from '@/context/auth/authFunction';
import {
  AdminActivityBookingService,
  BookingService,
  backend_CreateActivityBooking,
} from '@/service/bookingService';
import { UserService, backend_UpdateUser } from '@/service/userService';
import { PaginationType } from '@/types/globalType/globalType';
import { BookingHistoryType, ProfileUpdatePayload } from '@/types/userSliceType/userSlice';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface UserSliceType {
  profile?: ProfileUpdatePayload;
  bookingHistory?: {
    pagination: PaginationType;
    history: BookingHistoryType[];
  };
  activitiesHistory?: {
    pagination: PaginationType;
    activities: any[];
  };
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: UserSliceType = {
  profile: undefined,
  bookingHistory: undefined,
  loading: 'idle'
};

/** async thunk get profile */
export const asyncThunkFetchProfile = createAsyncThunk('userFetchProfile', async (thunkApi) => {
  const profile = await UserService.authGetProfile();
  // @ts-ignore
  return profile?.data[0];
});

/** async thunk update profile */
export const asyncThunkUpdateProfile = createAsyncThunk(
  'userUpdateProfile',
  async (data: backend_UpdateUser, thunkApi) => {
    try {
      const profile = await UserService.authUpdateProfile({ updateUser: data });
      return profile;
    } catch (err) {
      return err;
    }
  }
);

/** async thunk get booking history */
export const thunkFetchHistoryBooking = createAsyncThunk(
  'userSlice/fetchHistory',
  async (_, thunkApi) => {
    const res = await BookingService.getBookingsHistory();
    if (res.code === statusCode.SUCCESS && res.data[0].data !== null) {
      return res.data[0];
    } else {
      return []
    }
  }
);

/** async thunk create activities history */
export const thunkAddActivitiesHistory = createAsyncThunk(
  'userSlice/addActivitiesHistory',
  async (data: backend_CreateActivityBooking, thunkApi) => {
    await AdminActivityBookingService.createActivityBooking({ createActivityBooking: data });
  }
);

/** async thunk get activities history */
export const thunkFetchActivitiesHistory = createAsyncThunk(
  'userSlice/fetchActivitiesHistory',
  async (_, thunkApi) => {
    const res = await AdminActivityBookingService.getAllActivitiesBookings();
    if (res.code === statusCode.SUCCESS && res.data[0].data !== null) {
      return res.data[0];
    } else {
      return [];
    }
  }
);

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    userLogout: (state, { payload }) => {
      localStorage.removeItem(localStorageKey);
      state.profile = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(asyncThunkFetchProfile.fulfilled, (state, { payload }) => {
      state.profile = payload;
      state.loading = 'succeeded';
    });
    builder.addCase(asyncThunkFetchProfile.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(asyncThunkFetchProfile.rejected, (state) => {
      state.loading = 'failed';
    });
    builder.addCase(thunkFetchHistoryBooking.fulfilled, (state, { payload }) => {
      state.bookingHistory = {
        pagination: payload.pagination,
        history: payload.data,
      };
    });
    builder.addCase(thunkFetchActivitiesHistory.fulfilled, (state, { payload }) => {
      const slugSet = new Set();
      const uniquePropertyFormat = payload?.data && payload?.data?.length ? payload.data.filter((item: any) => {
        if (item?.bundle?.bundleId && !slugSet.has(item.bundle.bundleId)) {
          slugSet.add(item.bundle.bundleId);
          return true;
        }
        return false;
      }) : [];
      state.activitiesHistory = {
        pagination: payload.pagination,
        activities: uniquePropertyFormat,
      };
    });
  },
});

export const { userLogout } = userSlice.actions;

export default userSlice.reducer;
