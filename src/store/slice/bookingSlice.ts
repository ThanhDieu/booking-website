import { AdditionalGuestType, BookerModelType } from "@/types/modelType/bookerModelType";
import { ReservationPayloadType, ReservationsType } from "@/types/modelType/reservationModelType";
import { createSlice } from "@reduxjs/toolkit";



interface BookingSliceState {
    booker?: BookerModelType;
    additionalGuest: AdditionalGuestType[];
    primaryGuest?: BookerModelType;
    reservation?: ReservationsType[];
    reservationPayload?: ReservationPayloadType;
    paymentData?: {
        foliosId: string;
        balance: number;
      };
};

const initialState: BookingSliceState = {
    booker: undefined,
    additionalGuest: [],
    primaryGuest: undefined,
    reservation: undefined,
    reservationPayload: undefined,
    paymentData: undefined,
};


const bookingSlice = createSlice({
    name: 'bookingSlice',
    initialState,
    reducers: {
        resetBookingSlice: () => initialState,
        addBookerSlice: (state, {payload}) => {
            state.booker = payload
        },
        addReservationSlice: (state, {payload}) => {
            state.reservation = payload
        },
        addReservationPayloadSlice: (state, {payload}) => {
            state.reservationPayload = payload
        },
        addAdditionalGuest: (state, {payload}) => {
            state.additionalGuest = payload;
        },
        addPrimaryGuest: (state, {payload}) => {
            state.primaryGuest = payload;
        }
    }
});



export const {
    addBookerSlice,
    addReservationSlice,
    addReservationPayloadSlice,
    addAdditionalGuest,
    resetBookingSlice,
    addPrimaryGuest,
} = bookingSlice.actions;

export default bookingSlice.reducer;

