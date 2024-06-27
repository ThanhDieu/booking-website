import { VoucherProps } from "@/components/Vouchers/partials/Voucher";
import { useIbeTranslation } from "@/hooks";
import View from "./View";

interface VoucherListProps {
  vouchers: VoucherProps[]
}

const VoucherList = (props: { data: VoucherListProps}) => {
  const model = props.data || [];
  const voucherTitle = useIbeTranslation('general')
  return <View title={voucherTitle?.invoice?.list?.voucher} model={model} />
}

export default VoucherList;
