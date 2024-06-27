import statusCode from '@/constants/statusCode';
import { IbeVoucherService } from '@/service/voucherService';
import { VoucherBEPayloadType } from '@/types/voucherSliceType/voucherSliceType';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface VoucherSliceType {
  voucher: VoucherBEPayloadType[];
  isCheckingVoucher: boolean;
}

const initialState: VoucherSliceType = {
  voucher: [],
  isCheckingVoucher: false, 
};



const voucherSlice = createSlice({
  name: 'voucherSlice',
  initialState,
  reducers: {
    resetVoucher: () => initialState,
    addVoucher: (state, {payload}) => {
        const checkInclude = state.voucher.find(ele => ele.voucherId === payload.voucherId);
        if(!checkInclude) {
            state.voucher = [...state.voucher, payload]
        }
    },
    removeVoucher: (state, {payload}) => {
        const dataFill = state.voucher.filter(ele => ele.voucherId !== payload);
        state.voucher = dataFill;
    },
    setIsCheckingVoucher: (state, {payload}) => {
        state.isCheckingVoucher = payload;
    }
  }
});

export const {addVoucher, setIsCheckingVoucher, removeVoucher, resetVoucher} = voucherSlice.actions;
export default voucherSlice.reducer;
