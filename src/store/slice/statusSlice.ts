import { createSlice } from "@reduxjs/toolkit";


export interface statusSliceValue {
    isBundleLoading: boolean;
}


const initialState: statusSliceValue = {
    isBundleLoading: false,
};

export const statusSlice = createSlice({
    name: 'statusSlice',
    initialState,
    reducers: {
        setBundleLoading: (state, {payload}) => {
            state.isBundleLoading = payload;
        }
    }
});

export const {
    setBundleLoading
} = statusSlice.actions;

export default statusSlice.reducer;