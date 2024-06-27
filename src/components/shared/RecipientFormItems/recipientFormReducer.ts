import { RecipientFormViewProps } from ".";
import { actionTypes, ActionProps } from "./types";

const recipientFormRducer = (state: RecipientFormViewProps, action: ActionProps) => {
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

export default recipientFormRducer;
