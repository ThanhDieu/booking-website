import { SignInFormTypes, SignInProps } from ".";
import { backend_AuthRegisterRequest } from "@/service/userService";
import { actionTypes } from "./types";

interface InputFieldProps {
  field: string,
  value: string,
}

interface SignInTypes {
  type: SignInFormTypes,
  fields: SignInProps | backend_AuthRegisterRequest
}

export const changeField = (change: InputFieldProps) => ({
  type: actionTypes.CHANGE_FIELD,
  payload: change,
});

export const changeType = (type: SignInTypes) => ({
  type: actionTypes.CHANGE_TYPE,
  payload: type
})
