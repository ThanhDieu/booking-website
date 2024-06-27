import View from "./View";

export interface OptionProps {
  value: string,
  label: string,
}

export interface RadioInputViewProps {
  name: string,
  title: string,
  subTitle: string,
  options: OptionProps[],
  selectedValue: string,
}

export interface RadioInputProps {
  data: RadioInputViewProps,
  setSelectedValue: (selected: string) => void
}

const RadioInput = (props: RadioInputProps) => {
  const handleOnClickValue = (value: string) => {
    props.setSelectedValue(value);
  }

  return <View model={props.data} onClickValue={handleOnClickValue} />
}

export default RadioInput;
