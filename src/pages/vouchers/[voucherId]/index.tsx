import { useEffect, useReducer, createContext, useState, useMemo } from 'react';
import { GetStaticPaths, GetStaticPropsContext } from 'next';
import CouponLayout from '@/layouts/CouponLayout';
import { VoucherProps } from '@/components/Vouchers/partials/Voucher';
import View from '@/components/Vouchers/Buy/View';
import strapiRequester from '@/clientApi/requester/strapiRequester';
import { useIbeTranslation } from '@/hooks';
import { initialRecipient, initialBookerInfo, initialAddressInfo, BUY_FOR, SHIPPING_METHOD } from '@/components/Vouchers/Buy/StepTwo/constant';
import { StepsProps } from '@/components/shared/Steps';
import buyVoucherReducer from '@/components/Vouchers/Buy/buyVoucherReducer';
import {
  changeStepAction,
  enableStepAction,
  updateRecipientAction,
  updateBookerAction,
  updateAddressAction,
  changeVoucherAction,
  changeBuyForAction,
  changeShippingAction,
  disableStepAction
} from '@/components/Vouchers/Buy/buyVoucherActions';
import recipientFormReducer from '@/components/shared/RecipientFormItems/recipientFormReducer';
import { RecipientFormViewProps } from '@/components/shared/RecipientFormItems';
import bookerInfoFormRducer from '@/components/shared/BookerInfoFormItems/bookerInfoFormReducer';
import { BookerInfoFormViewProps } from '@/components/shared/BookerInfoFormItems';
import { changeField } from '@/components/shared/RecipientFormItems/recipientFormActions';
import { ChangeProps } from '@/components/shared/RecipientFormItems/types';
import { Form, FormInstance } from 'antd';
import { BookerAddressFormViewProps } from '@/components/shared/BookerAddressFormItems';
import bookerAddressFormRducer from '@/components/shared/BookerAddressFormItems/bookerInfoFormReducer';

export interface BuyVoucherProps {
  voucher: VoucherProps,
  vouchers: VoucherProps[],
  buySteps: StepsProps,
  recipient: RecipientFormViewProps,
  booker: BookerInfoFormViewProps,
  address: BookerAddressFormViewProps,
  formInstance: FormInstance,
  buyFor: string,
  shippingMethod: string,
}

export const VoucherContext = createContext({ folioId: "", setFolioId: (id: string) => {} });

const BuyVoucher = (props: { data: BuyVoucherProps }) => {
  const vouchersStep = useIbeTranslation("vouchers") || {};
  const steps = Array.from([1, 2, 3, 4]).map((step: number) => ({
    step,
    title: vouchersStep[`step${step}`]?.title,
    enabled: false,
    onClick: (step: number) => handleClickOnStep(step)
  }));

  const handleClickOnStep = (step: number) => {
    dispatch(changeStepAction(step));
  }

  const goToNextStep = (currentStep: number) => {
    // validate form before go to next step
    if (currentStep === 2) {
      formInstance.validateFields()
      .then(() => {
        dispatch(enableStepAction(model.buySteps.activeStep));
        dispatch(changeStepAction(currentStep + 1));
      })
      .catch((error) => {});
    } else {
      dispatch(enableStepAction(model.buySteps.activeStep));
      dispatch(changeStepAction(currentStep + 1));
    }

    if (currentStep === 3) {
      dispatch(disableStepAction(1));
      dispatch(disableStepAction(2));
      dispatch(disableStepAction(3));
    }
  }

  const goToPreviousStep = (currentStep: number) => {
    dispatch(changeStepAction(currentStep - 1));
  }

  const handleBuyForChange = (value: string) => {
    dispatch(changeBuyForAction(value));
  }

  const handleShippingChange = (value: string) => {
    dispatch(changeShippingAction(value));
  }

  const [formInstance] = Form.useForm();

  const initialModel = {
    voucher: props.data.voucher,
    vouchers: props.data.vouchers,
    buySteps: {
      steps,
      activeStep: 1
    },
    recipient: initialRecipient,
    booker: initialBookerInfo,
    address: initialAddressInfo,
    formInstance,
    buyFor: BUY_FOR.me,
    shippingMethod: SHIPPING_METHOD.email
  }

  const [model, dispatch] = useReducer(buyVoucherReducer, initialModel);

  // control for Recipient Form
  const [recipientModel, dispatchRecipientModel] = useReducer(recipientFormReducer, initialRecipient);
  const handleRecipientFormChange = (change: ChangeProps) => {
    dispatchRecipientModel(changeField(change));
  };

  // control for Booker Info Form
  const [bookerModel, dispatchBookerModel] = useReducer(bookerInfoFormRducer, initialBookerInfo);
  const handleBookingFormChange = (change: ChangeProps) => {
    dispatchBookerModel(changeField(change));
  };

  // control for Address Form
  const [addressModel, dispatchAddressModelModel] = useReducer(bookerAddressFormRducer, initialAddressInfo);
  const handleAddressFormChange = (change: ChangeProps) => {
    dispatchAddressModelModel(changeField(change));
  };

  useEffect(() => {
    dispatch(changeVoucherAction(props.data.voucher));
  }, [props.data.voucher]);

  useEffect(() => {
    dispatch(updateRecipientAction(recipientModel));
  }, [recipientModel]);

  useEffect(() => {
    dispatch(updateBookerAction(bookerModel));
  }, [bookerModel]);

  useEffect(() => {
    dispatch(updateAddressAction(addressModel));
  }, [addressModel]);

  const [folioId, setFolioId] = useState<string>("");
  const value = useMemo(
    () => ({ folioId, setFolioId }),
    [folioId, setFolioId],
  );

  return (
    // @ts-ignore
    <VoucherContext.Provider value={value}>
      <View
        model={model}
        handleRecipientFormChange={handleRecipientFormChange}
        handleBookingFormChange={handleBookingFormChange}
        handleAddressFormChange={handleAddressFormChange}
        handleBuyForChange={handleBuyForChange}
        handleShippingChange={handleShippingChange}
        onClickNextStep={goToNextStep}
        onClickPreviousStep={goToPreviousStep}
      />
    </VoucherContext.Provider>
  );
};

BuyVoucher.Layout = CouponLayout;

export default BuyVoucher;

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await strapiRequester.fetchVoucherPage();
  const { vouchers } = data?.data?.attributes || {};
  const paths = vouchers?.map((voucher: VoucherProps) => ({ params: { voucherId: voucher.id.toString() } } ));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const { data } = await strapiRequester.fetchVoucherPage();
  const { vouchers } = data?.data?.attributes || [];

  return {
    props: {
      data: {
        voucher: vouchers.find((voucher: VoucherProps) => voucher.id.toString() === context?.params?.voucherId),
        vouchers
      }
    },
  };
};
