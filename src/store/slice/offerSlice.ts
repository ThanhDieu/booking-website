import requesterAxios from "@/clientApi/requester";
import { BundleType } from "@/types/bundle/bundleType";
import { BookerModelType } from "@/types/modelType/bookerModelType";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export enum ELoad {
    INIT = 'init',
    PENDING = 'pending',
    FULFILLED = 'fulfilled',
    REJECTED = 'rejected'
}

interface OfferSliceState {
    booker?: BookerModelType;
    bundles?: any[];
    services?: any;
    detail: any;
    indicator: {
        all: ELoad;
        detail: ELoad;
    }
};

const initialState: OfferSliceState = {
    booker: undefined,
    bundles: undefined,
    detail: undefined,
    services: undefined,
    indicator: {
        all: ELoad.INIT,
        detail: ELoad.INIT
    }
};

/** fetch all bundle */
export const thunkGetOfferDetail = createAsyncThunk(
    'offerSlice/fetchOfferById',
    async (id: string, thunkApi) => {
        const res = await requesterAxios.getOfferDetail(id);
        return res?.data?.[0];
    }
);

const offerSlice = createSlice({
    name: 'offerSlice',
    initialState,
    reducers: {
        addFieldOfferSlice: (state, { payload }: PayloadAction<{
            field: keyof typeof state,
            params: any
        }>) => {
            const { field, params } = payload
            state[field] = params
        },
        resetOfferSlice: (state, { payload }: PayloadAction<string[] | undefined>) => {
            if (payload?.length) {
                (payload as (keyof typeof state)[]).forEach((field) => {
                    state[field] = initialState?.[field] as any;
                });
            } else {
                return initialState;
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(thunkGetOfferDetail.fulfilled, (state, action: any) => {
            const { payload } = action
            if (payload) {
                const { offerBundleUpgrades, booker, offerServices, ...rest } = payload
                state.detail = rest;
                if (offerBundleUpgrades) {
                    state.bundles = offerBundleUpgrades.map((bd: any) => {
                        const { bundleUpgrade, ...restOfferBundle } = bd
                        return {
                            ...bd.bundleUpgrade,
                            ...restOfferBundle,
                            children: restOfferBundle?.children?.filter((item: any) => item)

                        }
                    })
                }
                if (booker) {
                    state.booker = booker
                }
                if (offerServices) {
                    state.services = offerServices.map((sv: any) => {
                        const { service, ...restOfferService } = sv
                        return {
                            ...sv.service,
                            ...restOfferService
                        }
                    })
                }
            }

            state.indicator.detail = ELoad.FULFILLED;
        });
        builder.addCase(thunkGetOfferDetail.pending, (state) => {
            state.indicator.detail = ELoad.PENDING;
        });
        builder.addCase(thunkGetOfferDetail.rejected, (state) => {
            state.indicator.detail = ELoad.REJECTED;
        });
    }
});



export const {
    addFieldOfferSlice,
    resetOfferSlice,

} = offerSlice.actions;

export default offerSlice.reducer;

