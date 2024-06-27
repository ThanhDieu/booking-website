import View from "./View";
import { VoucherProps } from "../../partials/Voucher";

export interface StepOneProps {
  voucher: VoucherProps
}

const StepOne = (props: { data: StepOneProps }) => {
  const model = props.data || {};

  return <View model={model} />
}

export default StepOne;
