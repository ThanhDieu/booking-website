
import { PaidListType, PaymentLinkListType } from "@/types/foliosSliceType/paidSlice";
import { createSlice } from "@reduxjs/toolkit";


interface PaidSuccesSice {
    paidList: PaidListType[];
    createPayment: {
        id: string
    }[];
    paymentLinkList: PaymentLinkListType[];
    openModal: boolean;
};

const initialState: PaidSuccesSice = {
    paidList: [],
    paymentLinkList: [],
    createPayment: [],
    openModal: false,
}


const paidSlice = createSlice({
    name: "paidSlice",
    initialState,
    reducers: {
        resetPaidSlice: () => initialState,
        addPaidList: (state, { payload }) => {
            const find = state.paidList.find((ele) => ele.foliosId === payload.foliosId);
            if (!find) {
                if(payload.balance.amount === 0) {
                    state.paidList = [...state.paidList, payload];
                }
            }
        },
        addPaymentLinkList: (state, { payload }) => {
            const find = state.paymentLinkList.find(ele => ele.foliosId === payload.foliosId);
            if (!find) {
                state.paymentLinkList = [...state.paymentLinkList, payload];
            }
        },
        setOpenModal: (state, { payload }) => {
            state.openModal = payload;
        },
        addCreatePayment: (state, { payload }) => {
            const find = state.createPayment.find(ele => ele.id === payload.id);
            if (!find) {
                state.createPayment = [...state.createPayment, payload]
            }
        }
    },
});

export const {
    addPaidList,
    addPaymentLinkList,
    setOpenModal,
    resetPaidSlice,
    addCreatePayment,
} = paidSlice.actions;

export default paidSlice.reducer;