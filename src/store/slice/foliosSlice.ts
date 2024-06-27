import { FoliosPayloadType } from '@/types/foliosSliceType/foliosSlice';
import { createSlice } from '@reduxjs/toolkit';

interface FoliosSliceStateType {
  folios?: FoliosPayloadType[];
  countryCode?: string;
  expiresAt?: string;
}

const initialState: FoliosSliceStateType = {
  folios: undefined,
  countryCode: undefined,
  expiresAt: undefined
};

const foliosSlice = createSlice({
  name: 'foliosSlice',
  initialState,
  reducers: {
    resetFoliosSlice: () => initialState,
    addFolios: (state, { payload }) => {
      state.folios = payload;
    },
    addCountryCode: (state, {payload}) => {
        state.countryCode = payload;
    },
    addExpiresAt: (state, {payload}) => {
        state.expiresAt = payload;
    }
  },
});

export const {addFolios, addCountryCode, addExpiresAt, resetFoliosSlice } = foliosSlice.actions;

export default foliosSlice.reducer;
