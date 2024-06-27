/* eslint-disable react-hooks/exhaustive-deps */
import { pathPage, pathsBooking } from '@/constants';
import { useIbeTranslation } from '@/hooks';
import { InvoiceRightIcon, XIcon } from '@/library';
import Invoice from '@/types/addonsType/invoiceType';
import { ServiceAddonsType } from '@/types/invoceSliceType/invoceSliceType';
import { useLocale } from '@m0-0a/next-intl';
import clsx from 'clsx';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import ButtonShare from '../global/ButtonShare';
import Currency from '../global/CurrencyComponent';
import styles from './BookingInvoice.module.scss';
import dayjs from 'dayjs';
import calculator from '@/util/calculator';

const BookingInvoice = ({
  header,
  arrival,
  departure,
  rooms,
  adults,
  child,
  addonsBase,
  addons,
  total,
  subTotal,
  disable,
  buttonText,
  voucherData,
  onClick,
  onClear,
  onDispatch,
  className,
  voucher,
  offerDetail
}: Invoice) => {
  const [items, setItems] = useState<{ title: string; contents: string[] }[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const dataInvoice = useIbeTranslation('general.invoice');
  const discountText = useIbeTranslation('bookingSteps.step4.roomsAndOffersInfo.discount');
  const paymentText = useIbeTranslation('bookingSteps.step4.popupBooking.buttonText.payment');
  const offerText = useIbeTranslation('offer')
  const nights_translate = dataInvoice?.list?.nights;
  const roomType_translate = dataInvoice?.list?.roomType;
  const guests_translate = dataInvoice?.list?.guests;
  const adults_translate = dataInvoice?.list?.adults;
  const children_translate = dataInvoice?.list?.children;
  const { locale } = useLocale();

  /** check is booking page to hide X icon **/
  const router = useRouter();
  const isBookingPage = router?.asPath?.includes(pathsBooking.CREATE_BOOKING);
  const isBookingOffer = router?.asPath?.includes(pathPage.offer);

  const newAddons = useMemo(()=> {
    const newArr = addons ? [...addons] : [];
    return newArr?.reverse()
  }, [addons])

  useEffect(() => {
    if (rooms && departure && arrival && adults) {
      let itemsToShow = [
        {
          title: `${moment
            .duration(
              moment(moment.unix(departure).format('DD.MM.YYYY'), 'DD.MM.YYYY').diff(
                moment(moment.unix(arrival).format('DD.MM.YYYY'), 'DD.MM.YYYY')
              )
            )
            .asDays()} ${nights_translate}`,
          contents: [
            `${moment.unix(arrival).format('DD.MM.YYYY')}`,
            `${moment.unix(departure).format('DD.MM.YYYY')} `,
          ],
        },
        {
          title: `${roomType_translate}`,
          contents: Array.isArray(rooms) ? rooms : [`${rooms}`],
        },
        {
          title: `${guests_translate}`,
          contents: [`${adults} @ ${adults_translate}`, `${child} @ ${children_translate}`],
        },
      ];
      setItems(itemsToShow);
    }
    total && setTotalPrice(Number(total));
  }, [
    arrival,
    departure,
    rooms,
    adults,
    child,
    total,
    nights_translate,
    roomType_translate,
    guests_translate,
    adults_translate,
    children_translate,
  ]);

  return (
    <div className={clsx('p-6 bg-primary-switch rounded-lg', className)}>
      <div className="mb-5 font-[Lora] text-[24px] leading-8 text-primary-switch">
        {dataInvoice?.title || header}
      </div>

      {/* details */}
      <div className="flex flex-col divide-y border-switch  divide-solid">
        {items?.map((item, index) => (
          <div className="first:pt-0 py-5 border-x-0 border-switch " key={`item-${index}`}>
            <div className="mb-2 text-[14px] leading-[18px] font-normal text-grey-switch">
              {item.title}
            </div>

            {/* each section has different display style */}
            {index === 0 && (
              <div className="flex flex-row text-[14px] leading-[18px] gap-1 text-primary-switch">
                {item?.contents[0]}
                <InvoiceRightIcon />
                {item?.contents[1]}
              </div>
            )}
            {index === 1 && (
              <div
                key={`addon-${index}`}
                className="mb-2 last:mb-0 text-[14px] leading-[18px] font-normal "
              >
                {item.contents?.map((room, index) => {
                  return <div key={index}
                    className="mt-4 first-of-type:mt-0 grid grid-cols-5"
                    title={room.split('@')[0]}
                  >
                    <span className="justify-self-start text-primary-switch ">
                      {room.split('@')[1]} x
                    </span>
                    <span className={clsx(styles.textDesc, 'col-span-4 text-primary-switch')}>
                      {room.split('@')[0]}
                    </span>
                  </div>
                })}

              </div>
            )}
            {index === 2 && (
              <div className="text-[14px] leading-[18px] text-primary-switch">
                <div className="grid grid-cols-5 text-primary-switch">
                  <span className="justify-self-start text-primary-switch">
                    {item.contents[0].split('@')[0]} x
                  </span>

                  <span className={clsx(styles.textDesc, 'col-span-4 text-primary-switch')}>
                    {item.contents[0].split('@')[1]}
                  </span>
                </div>
                <div className="grid grid-cols-5 mt-4 text-primary-switch">
                  <span className="justify-self-start text-primary-switch">
                    {item.contents[1].split('@')[0]} x
                  </span>
                  <span className={clsx(styles.textDesc, 'col-span-4 text-primary-switch')}>
                    {item.contents[1].split('@')[1]}
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}

        <div
          className={clsx(
            'first:pt-0 py-5 border-x-0 border-switch',
            addonsBase && addonsBase?.length >= 3 ? 'overflow-y-scroll h-28 hide-scrollbar' : ''
          )}
        >
          {voucher && (
            <div className="mb-2 text-[14px] leading-[18px] font-normal text-primary-switch">
              <div className="text-grey-switch">{dataInvoice?.list?.voucher}</div>
              <div className="mt-3 h-5 text-[14px] leading-[18px] cursor-default flex flex-row text-primary-switch">
                <p className="justify-self-start text-primary-switch flex flex-row">{1} x</p>
                <p className="ml-2 textDesc-1 text-primary-switch">{voucher}</p>
              </div>
            </div>
          )}
          {!voucher && (
            <div className="mb-2 text-[14px] leading-[18px] font-normal text-grey-switch">
              {dataInvoice?.list?.included}
            </div>
          )}
          {addonsBase?.map((ele: ServiceAddonsType, index: number) => {
            return (
              <div
                key={index}
                className="mt-3 grid grid-cols-5 h-5 text-[14px] leading-[18px] cursor-default text-primary-switch"
                title={ele.serviceName}
              >
                <span className="justify-self-start text-primary-switch">{ele.count} x</span>
                <span className="col-span-4 textDesc-1 text-primary-switch">
                  {ele?.extendedData?.name && ele?.extendedData?.name?.[locale]
                    ? ele?.extendedData?.name?.[locale]
                    : ele?.extendedData?.name?.en || ele?.serviceName}
                </span>
              </div>
            );
          })}
        </div>

        {newAddons && newAddons?.length > 0 && (
          <div
            className={clsx(
              'first:pt-0 py-5 border-x-0 border-switch ',
              newAddons?.length > 2 ? 'overflow-y-scroll h-28 hide-scrollbar' : ''
            )}
          >
            <div className="mb-2 text-[14px] leading-[18px] font-normal text-grey-switch">
              {dataInvoice?.list?.addOns}
            </div>
            {newAddons?.map((ele: ServiceAddonsType, index: number) => {
              return (
                <div
                  key={index}
                  className={clsx(
                    'mt-3 h-5 text-[14px] text-primary-switch leading-[18px] grid grid-cols-5',
                    styles.service
                  )}
                  title={ele?.serviceName}
                >
                  <span className="textDesc-1 text-primary-switch"> {ele?.count} x</span>{' '}
                  <span className="col-span-3 textDesc-1 text-primary-switch">
                    {' '}
                    {ele?.extendedData?.name && ele?.extendedData?.name?.[locale]
                      ? ele?.extendedData?.name?.[locale]
                      : ele?.extendedData?.name?.en || ele?.serviceName}
                  </span>
                  <div
                    className={clsx(
                      isBookingPage && 'hidden',
                      'cursor-pointer justify-self-end self-center col-span-1 col-start-5'
                    )}
                  >
                    <span
                      onClick={() => {
                        if (onClear) {
                          onClear(ele?.serviceId);
                        } else if (onDispatch) {
                          onDispatch(ele);
                        }
                      }}
                      className={clsx(
                        styles.btnDeleteService,
                        'text-primary-switch bg-primary-switch'
                      )}
                    >
                      <XIcon />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* sub total */}
        {voucherData && subTotal && (
          <div className="py-5 border-x-0 border-switch flex items-center justify-between">
            <div className="text-[14px] leading-5 text-secondary-switch">{dataInvoice?.total}</div>
            {/* map voucher */}
            <div className="text-right">
              <Currency price={Number(subTotal)} fontSize={'text-base'} leading={'leading-5'} />
            </div>
          </div>
        )}

        {/* discount */}
        {offerDetail ?
          <div className="py-5 border-x-0 border-switch">
            <div className=" flex items-center justify-between">
              {/* need translate */}
              <div className="text-[14px] leading-5 text-secondary-switch">{offerText?.invoice?.total}</div>
              <div className="text-right">
                <Currency price={isBookingOffer ? 
                  Number(offerDetail.price) + (addons ? calculator.calcAddonsPrice(offerDetail.arrival, offerDetail.departure, addons) : 0) : 
                  Number(totalPrice)} fontSize={'text-lg'} leading={'leading-[26px]'} />
              </div>
            </div>
            <div className=" flex items-center justify-between">
              {/* need translate */}
              <div className="text-[14px] leading-5 text-secondary-switch">{offerText?.invoice?.discount}</div>
              <div className="text-right">
                <Currency price={-offerDetail?.discount} fontSize={'text-lg'} leading={'leading-[26px]'} />
              </div>
            </div>
          </div>
          : ''
        }

        {voucherData && Array.isArray(voucherData) && voucherData?.length > 0 && (
          <div className="py-5 border-x-0 border-switch">
            <div className="text-[14px] leading-5 text-secondary-switch">{discountText}</div>
            {/* map voucher */}
            {voucherData.map((voucher, i) => (
              <div key={i} className=" flex flex-col items-start py-2" title={voucher?.code}>
                <p>{voucher?.code?.slice(0, 6)}....</p>
                <div className="flex items-center gap-1">
                  -
                  <Currency
                    price={voucher?.voucherData?.value}
                    fontSize={'text-base'}
                    leading={'leading-5'}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* total */}
        <div className="py-5 border-x-0 border-switch">
          <div className=" flex flex-col items-start">
            <div className="text-[14px] leading-5 text-secondary-switch">{paymentText}</div>
            <div className="text-right">
              <Currency price={totalPrice} fontSize={'text-xl'} leading={'leading-[26px]'} />
            </div>
          </div>
          <div className="text-[12px] text-primary-switch leading-4 pt-1">
            {dataInvoice?.taxFee}
          </div>
        </div>
      </div>

      {/* process button */}
      {buttonText && (
        <ButtonShare
          disable={disable}
          onClick={onClick}
          size="large"
          style="dark"
          content={dataInvoice?.buttonText || buttonText}
          className="w-full disabled:cursor-not-allowed"
        />
      )}
      {offerDetail?.validity && <p className='text-[red] italic mt-3 text-[12px]'>{`${offerText?.invoice?.valid} ${dayjs(offerDetail?.validity * 1000).format('DD.MM.YYYY')}`}</p>}
    </div>
  );
};

export default BookingInvoice;
