import { actionTypes } from "./buyVoucherReducer";
import { RecipientFormViewProps } from "@/components/shared/RecipientFormItems";
import { BookerInfoFormViewProps } from "@/components/shared/BookerInfoFormItems";
import { VoucherProps } from "../partials/Voucher";
import { BookerAddressFormViewProps } from "@/components/shared/BookerAddressFormItems";

export const changeStepAction = (payload: number) => ({
  type: actionTypes.CHANGE_STEP,
  payload,
});

export const enableStepAction = (payload: number) => ({
  type: actionTypes.ENABLE_STEP,
  payload,
});

export const disableStepAction = (payload: number) => ({
  type: actionTypes.DISABLE_STEP,
  payload,
});

export const updateRecipientAction = (payload: RecipientFormViewProps) => ({
  type: actionTypes.UPDATE_RECIPIENT,
  payload,
});

export const updateBookerAction = (payload: BookerInfoFormViewProps) => ({
  type: actionTypes.UPDATE_BOOKER,
  payload,
});

export const updateAddressAction = (payload: BookerAddressFormViewProps) => ({
  type: actionTypes.UPDATE_ADDRESS,
  payload,
});


export const changeVoucherAction = (payload: VoucherProps) => ({
  type: actionTypes.CHANGE_VOUCHER,
  payload,
});

export const changeBuyForAction = (payload: string) => ({
  type: actionTypes.UPDATE_BUY_FOR,
  payload
});


export const changeShippingAction = (payload: string) => ({
  type: actionTypes.UPDATE_SHIPPING,
  payload
});
