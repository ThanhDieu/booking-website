import { SignInFormItemsViewProps } from ".";
import { actionTypes, ActionProps } from "./types";

const signInFormRducer = (state: SignInFormItemsViewProps, action: ActionProps) => {
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

    case actionTypes.CHANGE_TYPE:
      return {
        ...state,
        type: payload.type,
        fields: payload.fields
      }

    default:
      return state;
  }
}

export default signInFormRducer;
