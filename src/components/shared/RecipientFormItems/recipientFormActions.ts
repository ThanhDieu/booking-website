import { actionTypes } from "./types";

interface InputFieldProps {
  field: string,
  value: string,
}

export const changeField = (change: InputFieldProps) => ({
  type: actionTypes.CHANGE_FIELD,
  payload: change,
});
