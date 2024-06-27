import { ChangeProps } from "./types";
import View from "./View";

export interface RecipientProps {
  title?: string,
  firstName?: string,
  lastName?: string,
  message?: string,
  email?: string,
}

export interface RecipientFormViewProps {
  fields: RecipientProps,
  showEmail: boolean,
  title?: string
}

export interface RecipientFormProps {
  data: RecipientFormViewProps,
  handleFieldChange: (change: ChangeProps) => void,
}

const RecipientForm = (props: RecipientFormProps) => {
  return (
    <View
      model={props.data}
      onFieldChange={props.handleFieldChange}
    />
  )
}

export default RecipientForm;
