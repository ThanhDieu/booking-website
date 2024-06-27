import { useContext } from "react";
import { VoucherContext } from "@/pages/vouchers/[voucherId]";
import { useState, useEffect } from "react";
import { VoucherProps } from "../../partials/Voucher";
import View from "./View";
import { BookerInfoProps } from "@/components/shared/BookerInfoFormItems";
import { BookerAddressProps } from "@/components/shared/BookerAddressFormItems";
import { IbeVoucherService } from "@/service/voucherService";
import { currencyType } from "@/constants/paymentConst";

interface StepFourProps {
  data: {
    voucher: VoucherProps,
    booker: BookerInfoProps
    address: BookerAddressProps,
  }
}

const StepFour = (props: StepFourProps) => {
  const [voucherCode, setVoucherCode] = useState("");
  const { folioId } = useContext(VoucherContext);

  useEffect(() => {
      const createVoucher = async () => {
      try {
        const data = {
          name: 'voucher',
          ref: folioId,
          value: props.data.voucher.value,
          currency: currencyType.EURO,
          hotel: 'XXX',
          email: props.data.booker.email
        };
        const res = await IbeVoucherService.createIbeVoucher({createVoucher: data});
        setVoucherCode(res.data[0]?.code || "{}");
      } catch (err) {
        console.error(err)
      }
    };
      createVoucher();
  }, [props.data.voucher, props.data.booker, folioId]);
  
  const model = {
    voucherCode
  }

  return <View model={model} />
}

export default StepFour;
