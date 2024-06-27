/* eslint-disable react-hooks/exhaustive-deps */
import ButtonShare from '@/components/global/ButtonShare';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  addCreatePayment,
  addPaidList,
  addPaymentLinkList,
  setOpenModal,
} from '@/store/slice/paidSlice';
import { PaymentLinkType } from '@/types/createBooking/PaymentType';
import { FoliosPayloadType } from '@/types/foliosSliceType/foliosSlice';
import clsx from 'clsx';
import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { PaidListType, PaymentLinkListType } from '@/types/foliosSliceType/paidSlice';
import { CheckCircleFilled } from '@ant-design/icons';
import { message } from 'antd';
import { pathSocket, pathsBooking } from '@/constants';

import Currency from '@/components/global/CurrencyComponent';
import { CreateAdyenPaymentLinkService } from '@/service/financeService';

type PaymentItemProps = {
  onClose?: (value: boolean) => void;
  jsonFile?: {
    title: string;
    bookingId: string;
    balance: string;
    description: string;
    fail: string;
    serverError: string;
    sucessPayment: string;
    payMessage: string;
    CannotPayMore: string;
    getLinkFail: string;
    buttonText: {
      payment: string;
      next: string;
      retry: string;
    };
  };
};

const PaymentItem = ({ onClose, jsonFile }: PaymentItemProps) => {
  const router = useRouter();
  const socket = new WebSocket(pathSocket.SOCKET_GET_PAYMENT);

  /** redux state */
  const { booker } = useAppSelector((state) => state.bookingSlice);
  const { folios, countryCode, expiresAt } = useAppSelector((state) => state.foliosSlice);
  const { paymentLinkList, paidList, createPayment } = useAppSelector((state) => state.paidSlice);
  const dispatch = useAppDispatch();
  const [isCallApi, setIsCallApi] = useState(false);

  const [aleartMessage, setAleartMessage] = useState<{ message: string; status: string }>();
  const [watchingPayment, setWatchingPayment] = useState<{
    createPayment: boolean;
    getLink: boolean;
    afterPaid: boolean;
  }>({
    createPayment: false,
    getLink: false,
    afterPaid: false,
  });

  useEffect(() => {
    const checkPaid = paidList.every((ele) => Number(ele.balance.amount) === 0);
    if (folios && checkPaid && paidList.length >= folios?.length) {
      (() => router.push(pathsBooking.THANKYOU))();
    }
  }, [paidList]);

  /** watching paid */
  const [paymentProcessing, setPaymentProcessinsg] = useState<string[]>([]);

  useEffect(() => {
    socket.onopen = () => { };
    socket.onmessage = async (event) => {
      if (event.data) {
        paymentLinkList.forEach((item: PaymentLinkListType) => {
          if (item.paymentId === event.data) {
            const paidItem = {
              foliosId: event.data,
              balance: {
                currency: '',
                amount: 0,
              },
            };
            dispatch(addPaidList(paidItem));
          }
        });
      }
    };

    return () => {
      socket.close();
    };
  }, [paymentLinkList, socket]);

  /** watching paid list */
  useEffect(() => {
    if (paidList?.length > 0) {
      paidList?.map((ele) => {
        const foliosId = paymentProcessing?.length
          ? paymentProcessing.filter((i) => i !== ele.foliosId)
          : [];
        setPaymentProcessinsg(foliosId);
      });
    }
  }, [paidList]);

  /**
   * handle get payment
   * after create payment you need to call this function to get payment link
   *
   */
  const autoGetPayment = async (amount: number, currency: string, foliosId: string) => {
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
        dispatch(addPaymentLinkList(linkPayment));
        return linkPayment;
      }
      return { getLink: "" }
    } catch (err) {
      setWatchingPayment({ ...watchingPayment, getLink: true });
      setAleartMessage({ message: 'pup', status: 'error' });
      return { getLink: "" }
    }
  };

  /**
   * handle payment link
   * first time need to call payment and after that get link to pay
   */
  const handlePayment = async (amount: number, currency: string, foliosId: string) => {
    if (isCallApi) return { getLink: "" };
    try {
      if (booker && expiresAt && countryCode) {
        const res = await CreateAdyenPaymentLinkService.createAdyenPaymentLink({
          createPaymentLink: {
            amount: { amount: amount * 100, currency },
            reference: foliosId,
          },
        });

        if (res) {
          dispatch(addCreatePayment(res));
        }

        const paymentLink = await autoGetPayment(amount, currency, foliosId);
        return paymentLink;
      }
      return { getLink: "" }
    } catch (err) {
      if ((err as any)?.response?.status === 422) {
        jsonFile && setAleartMessage({ message: jsonFile?.CannotPayMore, status: 'error' });
      } else {
        jsonFile && setAleartMessage({ message: jsonFile.fail, status: 'error' });
      }
      setWatchingPayment({ ...watchingPayment, createPayment: true });
      return { getLink: "" }
    } finally {
      setIsCallApi(false);
    }
  };

  /**
   * handle payment": this function is an action it will check what function need to run first.
   * when click payment this funcition is run.
   * */
  const handlePaymentAction = useCallback(
    async (amount: number, currency: string, foliosId: string) => {
      setAleartMessage(undefined);
      const findLink = paymentLinkList.some((ele) => ele.foliosId === foliosId);
      if (findLink) {
        return autoGetPayment(amount, currency, foliosId);
      } else if (!findLink) {
        setIsCallApi(true);
        return handlePayment(amount, currency, foliosId);
      }
    },
    [paymentLinkList]
  );

  const GetLinkButton = (props: { ele: FoliosPayloadType }) => {
    const { ele } = props;

    const [paymentLink, setPaymentLink] = useState<string>("");

    const getPaymentLink = async () => {
      const amount = Math.abs(ele.balance.amount);
      return handlePaymentAction(amount, ele.balance.currency, ele.id);
    }

    useEffect(() => {
      getPaymentLink().then(res => setPaymentLink(res?.getLink));
    }, [ele]);

    return <ButtonShare
      onClick={() => {window.open(paymentLink, '_blank')}}
      spin={paymentLink === ""}
      disable={paymentLink === ""}
      size="small"
      content={paymentLink ? (jsonFile?.buttonText?.payment ?? 'Payment') : ""}
    />
  }

  return (
    <div>
      {/* payment item */}
      {folios?.map((ele: FoliosPayloadType, index: number) => {
        return (
          <div
            key={index}
            className=" flex justify-between items-center py-4 !border-b border-solid border-b-Border border-t-0 border-l-0 border-r-0"
          >
            <div>
              <p>
                {jsonFile?.bookingId}: {ele?.id}
              </p>
              <div className="flex items-center gap-2">
                <p>{jsonFile?.balance ?? 'Balance'}: </p>
                <Currency
                  color={ele?.balance?.amount < 0 ? '!text-[#ff4d4f]' : 'text-primary-switch'}
                  price={
                    paidList.length > 0 && paidList.find((paid) => paid.foliosId === ele.id)
                      ? Number(paidList.find((paid) => paid.foliosId === ele.id)?.balance?.amount)
                      : Number(ele?.balance?.amount)
                  }
                />
              </div>
            </div>
            {paidList.findIndex((i) => i.foliosId === ele.id) === -1 && <GetLinkButton ele={ele} />}

            {paidList.find((e: PaidListType, index: number) => e.foliosId === ele.id) && (
              <div>
                <CheckCircleFilled className="text-[#4be11a] text-2xl" />
              </div>
            )}
          </div>
        );
      })}

      {aleartMessage && (
        <p
          className={clsx('mt-4', {
            '!text-[#ff4d4f]': aleartMessage.status === 'error',
            '!text-[#06f887]': aleartMessage.status !== 'error',
          })}
        >
          {aleartMessage.message}
        </p>
      )}
    </div>
  );
};

export default PaymentItem;
