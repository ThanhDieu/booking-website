import { SearchValueType } from '@/types/bundle/bundleSearch';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface BundleSliceType {
  searchValue?: SearchValueType;
  bundleId?: string;
  offerId?: string;
  childrenAge?: number[];
  nearbyDate?: {
    arrival: number;
    departure: number;
  }
  nearbyGuest?: {
    rooms: number;
    adults: number;
    children: number;
    childernAge?: string;
  }
}

const initialState: BundleSliceType = {
  searchValue: undefined,
  bundleId: undefined,
  offerId: undefined,
  childrenAge: undefined,
  nearbyDate: undefined,
  nearbyGuest: undefined,
};

const bundleSlice = createSlice({
  name: 'bundleSlice',
  initialState,
  reducers: {
    resetBundleSearchSlice: () => initialState,
    setSearchValue: (state, { payload }: PayloadAction<SearchValueType>) => {
      state.searchValue = payload;
    },
    addBundleId: (state, { payload }) => {
      state.bundleId = payload;
    },
    addChildrendAge: (state, { payload }) => {
      state.childrenAge = payload;
    },
    setNearbyCalendarDate: (state, { payload }) => {
      state.nearbyDate = {
        arrival: payload.arrival,
        departure: payload.departure,
      };
    },
    setNearbyGuest: (state, { payload }) => {
      state.nearbyGuest = {
        rooms: payload.room,
        adults: payload.adult,
        children: payload.children,
        childernAge: payload.childrenAge
      }
    }
  },
});

export const {
  setSearchValue,
  addBundleId,
  resetBundleSearchSlice,
  addChildrendAge,
  setNearbyCalendarDate,
  setNearbyGuest,
} = bundleSlice.actions;

export default bundleSlice.reducer;
