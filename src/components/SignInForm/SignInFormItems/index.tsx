import { backend_AuthRegisterRequest } from "@/service/userService";
import { ChangeProps } from "./types";
import View from "./View";
export enum SignInFormTypes {
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  RESET = 'RESET',
  VERIFY = 'VERIFY'
}

export interface SignInProps {
  username: string,
  password: string,
}

export interface SignInFormItemsViewProps {
  fields: SignInProps | backend_AuthRegisterRequest,
  isCheckedPolicy: boolean,
  type: SignInFormTypes,
}

export interface SignInFormItemsProps {
  data: SignInFormItemsViewProps,
  setIsCheckedPolicy: (value: boolean) => void,
  handleFieldChange: (change: ChangeProps) => void,
}

const SignInFormItems = (props: SignInFormItemsProps) => {
  return (
    <View
      model={props.data}
      onFieldChange={props.handleFieldChange}
      onClickResetPassword={() => {}}
      setIsCheckedPolicy={props.setIsCheckedPolicy}
    />
  )
}

export default SignInFormItems;
