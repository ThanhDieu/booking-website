import { useContext } from "react";
import { VoucherContext } from "@/pages/vouchers/[voucherId]";
import View from "./View";
import { BookerInfoFormViewProps } from "@/components/shared/BookerInfoFormItems";
import { BookerAddressFormViewProps } from "@/components/shared/BookerAddressFormItems";
import { VoucherProps } from "../../partials/Voucher";
import { useIbeTranslation } from "@/hooks";
import { useCallback, useEffect, useState } from "react";
import { CreateAdyenPaymentLinkService, FinanceService } from "@/service/financeService";
import createFolio from "../../Function/createFolio";
import addCharge from "../../Function/addCharge";
import { pathSocket } from "@/constants";
import { FoliosPayloadType } from "@/types/foliosSliceType/foliosSlice";
export interface StepThreeProps {
  data: {
    buyFor: string,
    shippingMethod: string,
    bookerInfo: BookerInfoFormViewProps,
    bookerAddress: BookerAddressFormViewProps,
    voucher: VoucherProps
  },
  handleNextButton: () => void,
  handlePreviousButton: () => void,
}

const StepThree = (props: StepThreeProps) => {
  const { voucher, buyFor, shippingMethod, bookerInfo, bookerAddress } = props.data;
  const items = [{
    heading: "Vouchers",
    items: [
      {
        title: voucher.title,
        qty: 1,
        amount: `${voucher.value.toLocaleString('de-DE', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })} ${voucher.currency}`,
        description: [`To ${buyFor} - By ${shippingMethod}`]
      }
    ]
  }]

  const [paidAll, setPaidAll] = useState(false);
  const { folioId, setFolioId } = useContext(VoucherContext);
  const [paymentLink, setPaymentLink] = useState<string>("");

  const model = { 
    bookerInfo,
    bookerAddress,
    items,
    propertyLogo: "",
    totalPrice: voucher.value.toLocaleString('de-DE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }),
    previousButtonText: useIbeTranslation("bookingSteps.step3.buttonText.previous"),
    nextButtonText: `Payment now for ${voucher.value.toLocaleString('de-DE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })} ${voucher.currency}`,
    paymentLink
  }


  useEffect(() => {
    const getFolio = async () => {
      const data = await createFolio(props.data.bookerInfo.fields, props.data.bookerAddress.fields, "XSWR");
      setFolioId(data?.id)
    }

    getFolio()
      .catch((err: any) => {
        console.error(err);
      })
  }, [props.data.bookerInfo, props.data.bookerAddress, setFolioId]);

  useEffect(() => {
    if (paidAll) {
      props.handleNextButton();
    }
  }, [paidAll, props]);

  const createPaymentLink = useCallback(async (amount: number, currency: string, foliosId: string) => {
    try {
      const res = await CreateAdyenPaymentLinkService.createAdyenPaymentLink({
        createPaymentLink: {
          amount: { amount: amount * 100, currency },
          reference: foliosId,
        },
      });
      if (res.data && res.data[0]) {
        const linkPayment = {
          foliosId: foliosId,
          paymentId: foliosId,
          getLink: res.data[0],
        };
        return linkPayment;
      }
      return { getLink: "" }
    } catch (error) {
      return { getLink: "" }
    }
  }, []);

  useEffect(() => {
    if (folioId) {
      addCharge(folioId, { 
        amount: voucher.value,
        currency: voucher.currency,
      }).then(() => {
        createPaymentLink(voucher.value, voucher.currency, folioId).then(res => {
          setPaymentLink(res.getLink);
        });
      })
    }
  }, [folioId, voucher, createPaymentLink]);

  useEffect(() => {
    let socket: any;
    if (folioId) {
      socket = new WebSocket(pathSocket.SOCKET_GET_PAYMENT);
      socket.onmessage = async (event: any) => {
        if (event.data === folioId) {
          const res = await FinanceService.getOneFolios({ id: event.data });
          if (res?.balance?.amount >= 0) {
            setPaidAll(true);
          }
        }
      };
    }
    return () => {
      if (folioId) {
        socket.close();
      }
    };
  }, [folioId]);

  return <View
    model={model}
    handleNextButton={props.handleNextButton} 
    handlePreviousButton={props.handlePreviousButton}
  />
}

export default StepThree;
