import { createSlice } from '@reduxjs/toolkit';

interface cartSliceType {
  cartValue?: any;
}

const initialState: cartSliceType = {
  cartValue: undefined,
};

export const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    /***** handle blocking func here *****/
    addcartValue: (state, { payload }) => {
      state.cartValue = payload;
    },
  },
});

export const { addcartValue } = cartSlice.actions;

export default cartSlice.reducer;
