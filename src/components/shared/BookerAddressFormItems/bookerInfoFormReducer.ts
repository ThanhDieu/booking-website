import { BookerAddressFormViewProps } from ".";
import { actionTypes, ActionProps } from "./types";

const bookerAddressFormRducer = (state: BookerAddressFormViewProps, action: ActionProps) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.CHANGE_FIELD:
      return {
        ...state,
        fields: {
          ...state.fields,
          [payload.field]: payload.value
        }
      }

    default:
      return state;
  }
}

export default bookerAddressFormRducer;
