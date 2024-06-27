import View from "./View"

interface PaymentMethodsProps {
  data: {
    methods: {
      title: string,
      value: string,
      label: string,
    }[],
    isCheckedPolicy: boolean
  },
  handleSelectPayment: (value: string) => void,
  setIsCheckedPolicy: (value: boolean) => void,
}


const PaymentMethod = (props: PaymentMethodsProps) => {
  const model = props.data;

  return <View model={model} handleSelectPayment={props.handleSelectPayment} setIsCheckedPolicy={props.setIsCheckedPolicy} />
}

export default PaymentMethod;
