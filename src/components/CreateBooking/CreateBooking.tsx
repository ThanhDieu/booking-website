/* eslint-disable react-hooks/exhaustive-deps */
import { pathPage } from '@/constants';
import { genderType, paymentGuaranteeType } from '@/constants/paymentConst';
import { methodData } from '@/constants/paymentMethodData';
import regexModel from '@/constants/regex';
import statusCode from '@/constants/statusCode';
import { useIbeTranslation } from '@/hooks';
import useTopCountries from '@/hooks/useTopCountries';
import { FilterIcon, MenuDropDownIcon } from '@/library';
import { BookingService } from '@/service/bookingService';
import { FinanceService } from '@/service/financeService';
import { IbeVoucherService } from '@/service/voucherService';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  addAdditionalGuest,
  addBookerSlice,
  addPrimaryGuest,
  addReservationPayloadSlice,
  addReservationSlice,
} from '@/store/slice/bookingSlice';
import { setSearchValue } from '@/store/slice/bundleSearchSlice';
import { addCountryCode, addExpiresAt, addFolios } from '@/store/slice/foliosSlice';
import { addPaidList, resetPaidSlice } from '@/store/slice/paidSlice';
import { ThemeType } from '@/store/slice/themeSlice';
import {
  addVoucher,
  removeVoucher,
  resetVoucher,
  setIsCheckingVoucher,
} from '@/store/slice/voucherSlice';
import { SearchValueType } from '@/types/bundle/bundleSearch';
import { CountryCodeType } from '@/types/createBooking/PaymentType';
import { BookingType } from '@/types/modelType/bookerModelType';
import { AdditionalGuest, ReservationPayloadType } from '@/types/modelType/reservationModelType';
import { VoucherBEPayloadType } from '@/types/voucherSliceType/voucherSliceType';
import { calculateTotalGuest } from '@/util/bundle';
import calculator from '@/util/calculator';
import { querySearchParams } from '@/util/searchParams';
import { useLocale } from '@m0-0a/next-intl';
import { Checkbox, Drawer, Form, Input, Select, message } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import clsx from 'clsx';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import OfferIdInvoice from '../Booking/partials/Invoices/OfferIdInvoice';
import BookingStep from '../global/BookingStep';
import ButtonShare, { ButtonStyle } from '../global/ButtonShare';
import PaymentButtons from '../global/PaymentButtons';
import ScrollToTop from '../global/ScrollTop';
import { Wrapper } from '../global/Wrapper';
import BookingInvoice from '../shared/BookingInvoice';
import NewPaymentMethodCard from './partials/NewPaymentMethod';
import SSL from './partials/SSL';
import VoucherItem from './partials/VoucherItem';

const { Option } = Select;
const newMessageAnt = message;

const CreateBooking = () => {
  const { selected } = useAppSelector((state) => state.themeSlice);
  const { booker: offerBooker, bundles, detail, services } = useAppSelector((state) => state.offerSlice);

  const { ref: bottomRef, inView: myElementIsVisible } = useInView();
  const searchParams = useSearchParams();
  const [fixed, setFixed] = useState(false);

  const router = useRouter();
  const isBookingOffer = router?.asPath?.includes(pathPage.offer);
  const { offerId } = router.query;
  /** redux state */
  const { searchValue } = useAppSelector((state) => state.bundleSlice);
  const { serviceAddons, bundlePrice } = useAppSelector((state) => state.invoiceSlice);
  const { locationList } = useAppSelector((state) => state.commonSlice);
  const { profile } = useAppSelector((state) => state.userSlice);
  const { isCheckingVoucher, voucher } = useAppSelector((state) => state.voucherSlice);
  const { locale } = useLocale();
  const { booker, primaryGuest, additionalGuest, reservationPayload } = useAppSelector(
    (state) => state.bookingSlice
  );

  // Render prefered country name on top
  const modifiedCountries = useTopCountries();

  const countryCodeParams = searchParams.get('countryCode');
  const propertyIdParams = searchParams.get('propertyId');
  const arrivalParams = searchParams.get('arrival');
  const departureParams = searchParams.get('departure');
  const roomsParams = searchParams.get('rooms');
  const adultsParams = searchParams.get('adults');
  const childrenParams = searchParams.get('children');
  const childrenAgeBelow = searchParams.get('childrenAgeBelow');
  const bundleIdParams = searchParams.get('bundleId');

  const dispatch = useAppDispatch();

  /** app state */
  const [bookerIsGuest, setBookerIsGuest] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<string>(paymentGuaranteeType.Prepayment);
  const [guestNumber, setguestNumber] = useState<number>(Number(roomsParams));
  const [customePhoneNumber, setCustomePhoneNumber] = useState<string>('');

  /** voucher */
  const [voucherCode, setVoucherCode] = useState<string | undefined>();

  /** check faild */
  const [checkFaild, setCheckFaild] = useState<{ booking: boolean; getFoliosId: boolean }>({
    booking: false,
    getFoliosId: false,
  });

  /** set policy state */
  const [isCheckedPolicy, setIsCheckedPolicy] = useState(false);
  /** loading control state */
  const [loadingBooking, setLoadingBooking] = useState<boolean>(false);
  const [createMessage, setCreateMessage] = useState<{ status: string; message: string }>();
  /** state calc total price */
  const [totalPiceCalc, setTotalPriceCalc] = useState<string>('0');
  const [totalPriceOffer, setTotalPriceOffer] = useState<number>(0);
  // filter mobile
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) {
      document.body.style.overflow = '';
    } else {
      document.body.style.overflow = 'hidden';
    }
  }, [open]);
  const onClose = () => {
    setOpen(false);
  };
  const step3 = useIbeTranslation('bookingSteps.step3');
  const giftVoucher = step3?.giftVoucher;
  const bookerInfor = step3?.booker;
  const payment = step3?.payment;
  const address = step3?.address;
  const notice = step3?.notice;
  const popupBooking = step3?.popupBooking;
  const message = useIbeTranslation('general.message');

  useEffect(() => {
    dispatch(resetVoucher());
    window.addEventListener('scroll', () =>
      window.scrollY > 0 ? setFixed(true) : setFixed(false)
    );
  }, []);

  /** set booker is guest or not */
  const handleSetBookerIsGuest = (e: CheckboxChangeEvent): void => {
    setBookerIsGuest(e.target.checked);
  };

  /** set Phone number format**/
  const handlePhoneChange = (
    value: string,
    country: any,
    event: React.ChangeEvent<HTMLInputElement>,
    formattedValue: string
  ) => {
    const formattedPhoneNumber: string = `+(${country.dialCode})${formattedValue
      .replace(`+${country.dialCode}`, '')
      .replace('(', '')
      .replace(')', '')}`;
    setCustomePhoneNumber(formattedPhoneNumber);
  };
  /** remove +() phone number from profile**/
  const profilePhoneNumber = profile?.phoneNumber
    ?.replace('+', '')
    ?.replace('(', '')
    ?.replace(')', '');

  useEffect(() => {
    dispatch(resetPaidSlice());
    if (bundlePrice && searchValue) {
      const totalVoucher = voucher?.map((item) => item.voucherData.value);
      const calcValue = calculator?.calcTotalPrice(
        bundlePrice.priceUpgrade,
        roomsParams ? Number(roomsParams) : searchValue.rooms,
        arrivalParams ? Number(arrivalParams) : searchValue.arrival,
        departureParams ? Number(departureParams) : searchValue.departure,
        serviceAddons.addons,
        totalVoucher
      );
      setTotalPriceCalc(calcValue?.toString());
    }

    if (primaryGuest) {
      setBookerIsGuest(true);
    }

    roomsParams && setguestNumber(Number(roomsParams));
    /** if body is overflow hidden remove it */
    if (document.querySelector('.body-overflow-hidden')) {
      document.body.classList.remove('body-overflow-hidden');
    }
  }, [serviceAddons, router, bundlePrice, searchValue, voucher]);

  useEffect(() => {
    if (detail && offerId && voucher && serviceAddons) {
      let totalPriceOffer = detail.price - detail.discount;
      const voucherDiscount = voucher?.reduce((total: number, item: VoucherBEPayloadType) => total + item.voucherData.value, 0);
      totalPriceOffer = totalPriceOffer - voucherDiscount;
      const addonsAmount = calculator.calcAddonsPrice(detail.arrival, detail.departure, serviceAddons.addons);
      setTotalPriceOffer(totalPriceOffer - voucherDiscount + addonsAmount);
    }
  }, [offerId, detail, voucher, serviceAddons]);

  useEffect(() => {
    if (isBookingOffer && bundles) {
      const totalRoom = bundles.reduce((total: number, currentBundle: any) => total + currentBundle?.count || 0, 0);
      setguestNumber(totalRoom);
    }
  }, [isBookingOffer, bundles]);

  /** async get folios Id after asyncCreateBooking func  */
  // ATTENTION! REFACTORED FOLIOS ID TO RESERVATION ID, BUT KEEPING THE NAME TO AVOID BUGS
  const asyncGetFoliosId = async (bookingId: string) => {
    setLoadingBooking(true);
    try {
      const res = await FinanceService.getFolios({ bookingId });
      const folios = res?.folios?.length && res.folios;
      if (folios) {
        /** create folios */
        const mapFolios = folios.map((ele: any) => ({
          id: ele.id.replace('-1', ''),
          balance: {
            amount: ele.balance.amount,
            currency: ele.balance.currency,
          },
        }));
        dispatch(addFolios(mapFolios));

        /** check if add voucher and balance equal zero */
        for (let i in folios) {
          if (folios[i].balance.amount >= 0) {
            const newPaid = {
              foliosId: folios[i].id,
              balance: {
                amount: folios[i].balance.amount,
                currency: folios[i].balance.currency,
              },
            };
            dispatch(addPaidList(newPaid));
          }
        }

        /** set expiresDate payment (the last day user can pay with this invoice) */
        if (searchValue || departureParams) {
          const expiresDate = dayjs
            .unix(searchValue?.departure ?? Number(departureParams))
            .toISOString();
          dispatch(addExpiresAt(expiresDate));
        }
        setTimeout(() => {
          setCreateMessage({
            status: 'success',
            message: popupBooking?.sucessReservation,
          });
        }, 300);
        setTimeout(() => {
          if (isBookingOffer) {
            router.push({
              pathname: `/${pathPage.summary}/`,
              query: `offerId=${offerId}`,
            });
          } else {
            const queryParams = querySearchParams({
              countryCode: countryCodeParams || '',
              propertyId: propertyIdParams || '',
              arrival: arrivalParams ? Number(arrivalParams) : undefined,
              departure: departureParams ? Number(departureParams) : undefined,
              rooms: roomsParams ? Number(roomsParams) : 1,
              adults: adultsParams ? Number(adultsParams) : 1,
              children: childrenParams ? Number(childrenParams) : 0,
              childrenAgeBelow: childrenAgeBelow?.toString() ?? undefined,
              bundleId: bundleIdParams?.toString(),
            });
            router.push({
              pathname: `/${pathPage.summary}`,
              query: queryParams,
            });
          }
        }, 500);
      }
    } catch (err) {
      setCreateMessage({
        status: 'error',
        message: popupBooking?.getFoliostFail,
      });
      setCheckFaild({ ...checkFaild, getFoliosId: true });
    } finally {
      setLoadingBooking(false);
    }
  };

  /** async create booking after submit **/
  const asyncCreateBooking = async (data: BookingType) => {
    try {
      const res = await BookingService.createBooking({ createBooking: data });
      if (res.code === statusCode.SUCCESS) {
        const responsPaload: ReservationPayloadType = {
          bookingId: res.data[0].id,
          reservationIds: res.data[0].reservationIds,
        };
        await dispatch(addReservationPayloadSlice(responsPaload));
        await asyncGetFoliosId(responsPaload.bookingId);
      }
      if (res.code === statusCode.SEVER_ERROR) {
        setLoadingBooking(false);
        setCreateMessage({
          status: 'error',
          message: res.errors,
        });
      }
    } catch (err) {
      setLoadingBooking(false);
      if (404) {
        setCreateMessage({
          status: 'error',
          message: popupBooking?.notFound,
        });
      } else {
        setCreateMessage({
          status: 'error',
          message: popupBooking?.serverError,
        });
      }
      setCheckFaild({ ...checkFaild, booking: true });
      setLoadingBooking(false);
    }
  };

  /** handle on finish create booker and reservation **/
  const handleOnfinish = async (value: any) => {
    setLoadingBooking(true);
    setCreateMessage({ status: 'pending', message: popupBooking?.description });
    if (searchValue && bundlePrice || isBookingOffer) {
      const {
        bookerTitle,
        bookerFistName,
        bookerLastName,
        bookerPhoneNumber,
        bookerEmail,
        street,
        postalCode,
        city,
        country,
      } = value;
      const title =
        bookerTitle === genderType.MALE ? 'MR' : bookerTitle === genderType.OTHER ? 'Other' : 'MS';

      /** intialize booker */
      const booker = {
        title,
        gender: bookerTitle,
        firstName: bookerFistName,
        lastName: bookerLastName,
        phone: bookerPhoneNumber,
        email: bookerEmail,
        address: {
          addressLine1: street,
          postalCode: postalCode.toString(),
          city,
          countryCode: country,
        },
      };

      const additionalGuests: AdditionalGuest[] = Array.from(
        {
          length: guestNumber - 1,
        },
        (_, index) => ({
          title: value['additionalTitle' + (index + 1)] === genderType.MALE ? 'MR' : 'MS',
          firstName: value['additionalFirstName' + (index + 1)],
          lastName: value['additionalLastName' + (index + 1)],
          phoneNumber: value['additionalPhoneNumber' + (index + 1)],
        })
      );

      /** initialize reservation */
      let reservations: any;
      if (isBookingOffer && bundles?.length) {
        reservations = [];
        bundles.forEach((bundle, index) => {
          for (let i = 0; i < bundle.count; ++i) {
            const reservation = {
              bundlePriceId: bundle?.bundlePriceId,
              timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
              arrival: detail?.arrival && Number(detail.arrival),
              departure: detail?.arrival && Number(detail.departure),
              adults: bundle?.adults,
              childrenAges:
                bundle?.children && bundle.children.length
                  ? bundle.children
                    ?.toString()
                    .split(',')
                    .map((num: string) => parseInt(num))
                  : [],
              primaryGuest:
                index === 0
                  ? {
                    title: value.primaryGuestTitle
                      ? value.primaryGuestTitle === genderType.MALE
                        ? 'MR'
                        : value.primaryGuestTitle === genderType.OTHER
                          ? 'Other'
                          : 'MS'
                      : value.title === genderType.MALE
                        ? 'MR'
                        : value.primaryGuestTitle === genderType.OTHER
                          ? 'Other'
                          : 'MS',
                    firstName: value.primaryGuestFistName
                      ? value.primaryGuestFistName
                      : bookerFistName,
                    lastName: value.primaryGuestLastName
                      ? value.primaryGuestLastName
                      : bookerLastName,
                    email: value.primaryGuestEmail ? value.primaryGuestEmail : bookerEmail,
                    phoneNumber: value.primaryGuestPhoneNumber
                      ? value.primaryGuestPhoneNumber
                      : bookerPhoneNumber,
                  }
                  : {
                    title: additionalGuests[index - 1]?.title,
                    firstName: additionalGuests[index - 1]?.firstName,
                    lastName: additionalGuests[index - 1]?.lastName,
                    email: value.primaryGuestEmail ? value.primaryGuestEmail : bookerEmail,
                    phoneNumber: additionalGuests[index - 1]?.phoneNumber,
                  },
              additionalGuests: additionalGuests?.slice(
                Number(adultsParams) - 1,
                additionalGuests?.length
              ),
              channelCode: 'AltoVita',
              services: index === 0 && i === 0 ? [...(serviceAddons?.addons || []), ...(services || [])].map((ele: any) => ({
                serviceId: ele.serviceId || ele.extId,
                count: ele.count,
              })) : [],
              guaranteeType: paymentMethod,
            };
            reservations.push(reservation);
          }
        });
      } else if (!isBookingOffer && searchValue && bundlePrice) {
        reservations = Array.from({ length: Number(roomsParams) }, (_, index) => {
          return {
            bundlePriceId: bundlePrice.bundlePriceId,
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            arrival: searchValue.arrival ? searchValue.arrival : Number(arrivalParams),
            departure: searchValue.departure ? searchValue.departure : Number(departureParams),
            adults: searchValue.adults,
            childrenAges:
              searchValue?.childrenAgeBelow && searchValue.childrenAgeBelow?.length
                ? searchValue?.childrenAgeBelow
                  ?.toString()
                  .split(',')
                  .map((num: string) => parseInt(num))
                : [],
            primaryGuest:
              index === 0
                ? {
                  title: value.primaryGuestTitle
                    ? value.primaryGuestTitle === genderType.MALE
                      ? 'MR'
                      : value.primaryGuestTitle === genderType.OTHER
                        ? 'Other'
                        : 'MS'
                    : value.title === genderType.MALE
                      ? 'MR'
                      : value.primaryGuestTitle === genderType.OTHER
                        ? 'Other'
                        : 'MS',
                  firstName: value.primaryGuestFistName
                    ? value.primaryGuestFistName
                    : bookerFistName,
                  lastName: value.primaryGuestLastName
                    ? value.primaryGuestLastName
                    : bookerLastName,
                  email: value.primaryGuestEmail ? value.primaryGuestEmail : bookerEmail,
                  phoneNumber: value.primaryGuestPhoneNumber
                    ? value.primaryGuestPhoneNumber
                    : bookerPhoneNumber,
                }
                : {
                  title: additionalGuests[index - 1]?.title,
                  firstName: additionalGuests[index - 1]?.firstName,
                  lastName: additionalGuests[index - 1]?.lastName,
                  email: value.primaryGuestEmail ? value.primaryGuestEmail : bookerEmail,
                  phoneNumber: additionalGuests[index - 1]?.phoneNumber,
                },
            additionalGuests: additionalGuests?.slice(
              Number(adultsParams) - 1,
              additionalGuests?.length
            ),
            channelCode: 'AltoVita',
            services: serviceAddons?.addons?.map((ele: any) => ({
              serviceId: ele.serviceId,
              count: ele.count,
            })),
            guaranteeType: paymentMethod,
          };
        });
      }

      /** if voucher length more than reservations length */

      // if (
      //   Array.isArray(voucher) &&
      //   voucher?.length &&
      //   reservations?.length &&
      //   voucher.length > reservations.length
      // ) {
      //   /** filter remaining voucher */
      //   let remainingVoucher = voucher.filter(
      //     (e) => !reservations.some((i: any) => i.vouchers.some((v: string) => v === e.code))
      //   );
      //   /** add voucher remaining to reservation */
      //   if (remainingVoucher?.length) {
      //     for (let index in remainingVoucher) {
      //       reservations[index]?.vouchers?.push(remainingVoucher[index].code);
      //     }
      //   }
      // }
      /** initialzation payload booking */
      let data: BookingType = {
        booker: booker,
        bookerComment: value.bookerComment,
        reservations: reservations,
        vouchers: voucher.map((v: VoucherBEPayloadType) => v.code)
      };
      if (isBookingOffer) {
        data = { ...data, offerId: String(offerId) }
      }
      /** call function asyncCreateBooking run after get all feild*/
      await asyncCreateBooking(data);

      if (booker && reservations) {
        /** dispatch action add infomation to redux */
        dispatch(
          addBookerSlice({ ...booker, note: value.bookerComment, phone: customePhoneNumber })
        );
        dispatch(addReservationSlice(reservations));
        const contryCurrency = modifiedCountries.find((ele: any) => ele.countryCode === 'DE');
        dispatch(addCountryCode(contryCurrency?.countryCode));

        /** intialize addistion guest */
        const additionalGuests = Array.from({ length: guestNumber - 1 }, (_, index) => ({
          title: value['additionalTitle' + (index + 1)],
          firstName: value['additionalFirstName' + (index + 1)],
          lastName: value['additionalLastName' + (index + 1)],
          phone: value['additionalPhoneNumber' + (index + 1)],
        }));
        dispatch(addAdditionalGuest(additionalGuests));

        /** intialize primaryguest */
        if (bookerIsGuest) {
          const primaryGuest = {
            title: value.primaryGuestTitle,
            firstName: value.primaryGuestFistName,
            lastName: value.primaryGuestLastName,
            email: value.primaryGuestEmail,
            phone: value.primaryGuestPhoneNumber,
          };
          dispatch(addPrimaryGuest(primaryGuest));
        }
      }
    }
  };

  /** handle select country **/
  const handleSelectPayment = (value: string) => {
    setPaymentMethod(value);
  };

  /** add voucher action */
  const handleAddVoucher = async () => {
    dispatch(setIsCheckingVoucher(true));
    if (!voucherCode) {
      newMessageAnt.error('please input your voucher code');
    }
    if (voucherCode && (propertyIdParams || isBookingOffer && detail?.property?.extId)) {
      try {
        const res = await IbeVoucherService.checkIbeVoucher({
          code: voucherCode,
          propertyId: propertyIdParams || detail.property.extId,
        });

        if (res.code === statusCode.SEVER_ERROR) {
          newMessageAnt.error(res?.errors[0]);
          return;
        }
        if (res.code === statusCode.SUCCESS) {
          const findExist = voucher.find((ele) => ele.voucherId === res.data[0].voucherId);
          if (findExist) {
            newMessageAnt.error('your voucher is added');
            return;
          }
          newMessageAnt.success('add voucher successfully');
          dispatch(addVoucher(res.data[0]));
        }
      } catch (err) {
      } finally {
        setVoucherCode(undefined);
        dispatch(setIsCheckingVoucher(false));
      }
    }
  };

  const classPhoneInputCustom =
    selected === ThemeType.dark ? `!bg-[#0E1013]  text-[#fff]  !border-0` : '';

  useEffect(() => {
    if (isBookingOffer && detail && bundles?.length) {
      const guest = calculateTotalGuest(bundles?.map((bd) => ({ ...bd, number: (bd?.children?.length + bd?.adults) })))
      dispatch(setSearchValue({
        ...searchValue,
        rooms: bundles?.length || 1,
        arrival: detail?.arrival || searchValue?.arrival,
        departure: detail?.departure || searchValue?.departure,
        adults: guest?.adults || searchValue?.adults,
        children: guest?.children || searchValue?.children,
        propertyId: detail?.property?.extId || searchValue?.propertyId,
        countryCode: detail?.property?.location?.countryCode || searchValue?.countryCode,
      } as SearchValueType))
    }
  }, [isBookingOffer, detail, bundles]);

  // useEffect(() => {
  //   if (offerId) dispatch(thunkGetOfferDetail(offerId as string)).then((res: any) => {
  //     !res?.payload && router.push(`/${pathPage.notFound}`);
  //   })
  // }, [offerId])

  const invoice = useMemo(() => {
    const isOfferPage = router.asPath.includes(pathPage.offer);
    if (isOfferPage) {
      return <>
        {/* booking invoice */}
        <div className="col-span-1 pl-6 hidden xl:block">
          <div
            className={clsx(
              'transition-all ease-in-out duration-500 w-[258px]',
              fixed ? 'fixed bottom-0' : '',
              myElementIsVisible ? '!absolute !bottom-12' : ''
            )}
          >
            <OfferIdInvoice />
          </div>
        </div>
      </>
    } else {
      return <BookingInvoice
        id="test_id"
        header="Your Booking"
        arrival={searchValue && searchValue.arrival}
        departure={searchValue && searchValue.departure}
        voucherData={voucher}
        rooms={
          searchValue &&
          bundlePrice &&
          `${bundlePrice?.bundlePriceName} @ ${searchValue?.rooms}`
        }
        adults={searchValue?.adults}
        child={searchValue?.children}
        addonsBase={serviceAddons.baseService}
        addons={serviceAddons.addons}
        total={totalPiceCalc}
        subTotal={calculator
          .calcTotalPrice(
            bundlePrice?.priceUpgrade,
            roomsParams ? Number(roomsParams) : searchValue?.rooms,
            arrivalParams ? Number(arrivalParams) : searchValue?.arrival,
            departureParams ? Number(departureParams) : searchValue?.departure,
            serviceAddons.addons
          )
          .toString()}
      />
    }
  }, [router.asPath, totalPiceCalc]);

  return (
    <>
      <BookingStep activeStep={3} />
      <Wrapper>
        <ScrollToTop />
        {/* filter mobile  */}
        <div
          className="xl:hidden fixed left-0 top-36 z-40 bg-primary-switch w-fit p-4 rounded-md flex"
          onClick={() => setOpen(!open)}
        >
          <FilterIcon />
        </div>
        <Drawer title placement={'left'} onClose={onClose} open={open}>
          {invoice}
        </Drawer>
        {/* End filter mobile  */}
        <Form key={detail?.offerId || "booker-form-key"} onFinish={handleOnfinish} scrollToFirstError className="grid xl:grid-cols-4 gap-6">
          <div className="grid col-span-3 gap-y-8 p-6 bg-primary-switch rounded-lg">
            <div className="my-4">
              <SSL />
            </div>
            <div className="grid grid-cols-12 gap-4">
              {/****** Voucher ******/}
              <div className="flex xl:flex-row flex-col xl:items-center items-start justify-between col-span-12">
                <h2 className="text-xl font-[lora] font-normal">{giftVoucher?.title}</h2>
                <Link
                  href={'/vouchers'}
                  className="flex items-center justify-start gap-2 hover:text-HoverBlue blue-text-switch"
                >
                  {giftVoucher?.help}
                </Link>
              </div>
              <Form.Item className="xl:col-span-10 col-span-12 mb-0 ">
                <Input
                  value={voucherCode}
                  onChange={(value) => setVoucherCode(value.target.value)}
                  size="large"
                  placeholder={giftVoucher?.placeholder}
                  disabled={!isBookingOffer && Number(totalPiceCalc) === 0}
                />
              </Form.Item>
              <ButtonShare
                onClick={handleAddVoucher}
                spin={isCheckingVoucher}
                size="medium"
                className="xl:col-span-2 col-span-12 text-primary-switch"
                content={giftVoucher?.buttonText}
                style={ButtonStyle.SURFACE}
                disable={
                  !voucherCode
                  || !isBookingOffer && Number(totalPiceCalc) <= 0
                  || isBookingOffer && Number(totalPriceOffer) <= 0
                }
              />
              {voucher?.length > 0 && (
                <div className="col-span-12">
                  <div className="col-span-12 grid grid-cols-12 gap-x-4">
                    {/* map voucher */}
                    {voucher.map((ele: VoucherBEPayloadType) => {
                      return (
                        <div key={ele.voucherId} className="w-fit">
                          <VoucherItem
                            onRemove={() => dispatch(removeVoucher(ele.voucherId))}
                            price={ele?.voucherData?.value}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
            {/****** Booker’s information ******/}
            <div className="grid grid-cols-12 gap-4">
              <h2 className="col-span-12 text-xl font-[lora] font-normal">{bookerInfor?.title}</h2>

              <Form.Item
                initialValue={offerBooker?.gender?.toLowerCase() || profile?.gender?.toLowerCase() || booker?.gender?.toLowerCase()}
                rules={[{ required: false, message: message?.required }]}
                name="bookerTitle"
                className="xl:col-span-2 col-span-12 !mb-0"
              >
                <Select
                  suffixIcon={<MenuDropDownIcon />}
                  placeholder={bookerInfor?.placeholder?.title}
                  size="large"
                >
                  <Option value={genderType.MALE}>{bookerInfor?.gender?.male}</Option>
                  <Option value={genderType.FEMALE}>{bookerInfor?.gender?.female}</Option>
                  <Option value={genderType.OTHER}>{bookerInfor?.gender?.other}</Option>
                </Select>
              </Form.Item>

              <Form.Item
                initialValue={offerBooker?.firstName || booker?.firstName || profile?.firstName}
                rules={[
                  { required: true, message: message?.required },
                  {
                    pattern: regexModel.validateInputPattern,
                    message: message?.doesNotMatch,
                  },
                ]}
                name="bookerFistName"
                className="xl:col-span-5 col-span-6 !mb-0"
              >
                <Input size="large" placeholder={bookerInfor?.placeholder?.firstName} />
              </Form.Item>

              <Form.Item
                initialValue={offerBooker?.lastName || booker?.lastName || profile?.lastName}
                rules={[
                  { required: true, message: message?.required },
                  {
                    pattern: regexModel.validateInputPattern,
                    message: message?.doesNotMatch,
                  },
                ]}
                name="bookerLastName"
                className="xl:col-span-5 col-span-6 !mb-0"
              >
                <Input size="large" placeholder={bookerInfor?.placeholder?.lastName} />
              </Form.Item>

              <Form.Item
                initialValue={offerBooker?.phone || booker?.phone || profile?.phoneNumber}
                rules={[
                  { required: true, message: message?.required },

                  { min: 10, message: `${message?.min} 10` },
                ]}
                name="bookerPhoneNumber"
                className="xl:col-span-5 col-span-6 xl:col-start-3"
              >
                <PhoneInput
                  preferredCountries={["de", "at", "it", "nl", "dk"]}
                  buttonClass={classPhoneInputCustom}
                  dropdownClass={clsx('!bg-[rgb(40,46,54)]', classPhoneInputCustom)}
                  inputClass={clsx(classPhoneInputCustom, '!h-10')}
                  country={'de'}
                  value={customePhoneNumber}
                  onChange={handlePhoneChange}

                />
              </Form.Item>

              <Form.Item
                initialValue={offerBooker?.email || booker?.email || profile?.email}
                rules={[{ required: true, message: message?.required }]}
                name="bookerEmail"
                className="xl:col-span-5 col-span-6 !mb-0"
              >
                <Input size="large" placeholder={bookerInfor?.placeholder?.email} type="email" />
              </Form.Item>

              {/**** Booker as a guest ****/}
              <div className="col-span-12">
                <div>
                  <Checkbox
                    checked={bookerIsGuest}
                    onChange={handleSetBookerIsGuest}
                    className="col-span-12 mb-2"

                  >
                    {bookerInfor?.placeholder?.checkbox}
                  </Checkbox>
                </div>

                {bookerIsGuest && (
                  <div className={clsx('col-span-12 transition-all duration-500 overflow-hidden')}>
                    <div className="grid grid-cols-12 gap-4">
                      <h2 className="col-span-12 text-xl font-[lora] font-normal">
                        {bookerInfor?.primaryGuest}
                      </h2>
                      <Form.Item
                        initialValue={primaryGuest?.title}
                        rules={[{ required: false, message: message?.required }]}
                        name="primaryGuestTitle"
                        className="xl:col-span-2 col-span-12 !mb-0"
                      >
                        <Select
                          suffixIcon={<MenuDropDownIcon />}
                          placeholder={bookerInfor?.placeholder?.title}
                          size="large"
                        >
                          <Option value={genderType.MALE}>{bookerInfor?.gender?.male}</Option>
                          <Option value={genderType.FEMALE}>{bookerInfor?.gender?.female}</Option>
                          <Option value={genderType.OTHER}>{bookerInfor?.gender?.other}</Option>
                        </Select>
                      </Form.Item>

                      <Form.Item
                        initialValue={primaryGuest?.firstName}
                        rules={[
                          { required: true, message: message?.required },
                          {
                            pattern: regexModel.validateInputPattern,
                            message: message?.doesNotMatch,
                          },
                        ]}
                        name="primaryGuestFistName"
                        className="xl:col-span-5 col-span-6 !mb-0"
                      >
                        <Input size="large" placeholder={bookerInfor?.placeholder?.firstName} />
                      </Form.Item>

                      <Form.Item
                        initialValue={primaryGuest?.lastName}
                        rules={[
                          { required: true, message: message?.required },
                          {
                            pattern: regexModel.validateInputPattern,
                            message: message?.doesNotMatch,
                          },
                        ]}
                        name="primaryGuestLastName"
                        className="xl:col-span-5 col-span-6 !mb-0"
                      >
                        <Input size="large" placeholder={bookerInfor?.placeholder?.lastName} />
                      </Form.Item>

                      <Form.Item
                        initialValue={primaryGuest?.phone}
                        rules={[
                          { required: true, message: message?.required },
                          {
                            pattern: regexModel.validateNumber,
                            message: message?.number,
                          },
                          { min: 10, message: `${message?.min} 10` },
                        ]}
                        name="primaryGuestPhoneNumber"
                        className="xl:col-span-5 col-span-6 !mb-0 xl:col-start-3"
                      >
                        <PhoneInput
                          preferredCountries={["de", "at", "it", "nl", "dk"]}
                          country={'de'}
                          buttonClass={classPhoneInputCustom}
                          dropdownClass={clsx('!bg-[rgb(40,46,54)]', classPhoneInputCustom)}
                          inputClass={clsx(classPhoneInputCustom, '!h-10')}
                        />
                      </Form.Item>

                      <Form.Item
                        initialValue={primaryGuest?.email}
                        rules={[{ required: true, message: message?.required }]}
                        name="primaryGuestEmail"
                        className="xl:col-span-5 col-span-6 !mb-0"
                      >
                        <Input size="large" placeholder={bookerInfor?.placeholder?.email} />
                      </Form.Item>
                    </div>
                  </div>
                )}
                {/** additional guest */}
                {(searchValue && searchValue?.adults * searchValue?.rooms > 1 || isBookingOffer) && (
                  <div
                    className={clsx('col-span-12 transition-all duration-500 overflow-hidden mt-2')}
                  >
                    {/** mapping additional guest */}
                    {guestNumber &&
                      Array.from({ length: guestNumber - 1 }, (_, index) => {
                        return (
                          <div key={index} className="grid grid-cols-12 gap-4">
                            <h2 className="col-span-12 text-xl font-[lora] font-normal mt-2">
                              {`${bookerInfor?.guest} ${index + 2} `}
                            </h2>
                            <Form.Item
                              initialValue={additionalGuest[index]?.title}
                              rules={[{ required: false, message: message?.required }]}
                              name={`additionalTitle${index + 1}`}
                              className="xl:col-span-2 col-span-12 !mb-0"
                            >
                              <Select
                                suffixIcon={<MenuDropDownIcon />}
                                placeholder={bookerInfor?.placeholder?.title}
                                size="large"
                              >
                                <Option value={genderType.MALE}>{bookerInfor?.gender?.male}</Option>
                                <Option value={genderType.FEMALE}>
                                  {bookerInfor?.gender?.female}
                                </Option>
                                <Option value={genderType.OTHER}>
                                  {bookerInfor?.gender?.other}
                                </Option>
                              </Select>
                            </Form.Item>

                            <Form.Item
                              initialValue={additionalGuest[index]?.firstName}
                              rules={[
                                { required: true, message: message?.required },
                                {
                                  pattern: regexModel.validateInputPattern,
                                  message: message?.doesNotMatch,
                                },
                              ]}
                              name={`additionalFirstName${index + 1}`}
                              className="xl:col-span-5 col-span-6 !mb-0"
                            >
                              <Input
                                size="large"
                                placeholder={bookerInfor?.placeholder?.firstName}
                              />
                            </Form.Item>

                            <Form.Item
                              initialValue={additionalGuest[index]?.lastName}
                              rules={[
                                { required: true, message: message?.required },
                                {
                                  pattern: regexModel.validateInputPattern,
                                  message: message?.doesNotMatch,
                                },
                              ]}
                              name={`additionalLastName${index + 1}`}
                              className="xl:col-span-5 col-span-6 !mb-0"
                            >
                              <Input
                                size="large"
                                placeholder={bookerInfor?.placeholder?.lastName}
                              />
                            </Form.Item>

                            <Form.Item
                              initialValue={additionalGuest[index]?.phone}
                              rules={[
                                { required: true, message: message?.required },
                                {
                                  pattern: regexModel.validateNumber,
                                  message: message?.number,
                                },
                                { min: 10, message: `${message?.min} 10` },
                              ]}
                              name={`additionalPhoneNumber${index + 1}`}
                              className="xl:col-span-5 col-span-6 !mb-0 xl:col-start-3"
                            >
                              <PhoneInput
                                preferredCountries={["de", "at", "it", "nl", "dk"]}
                                buttonClass={classPhoneInputCustom}
                                dropdownClass={clsx('!bg-[rgb(40,46,54)]', classPhoneInputCustom)}
                                inputClass={clsx(classPhoneInputCustom, '!h-10')}
                                country={"de"}
                              />
                            </Form.Item>
                          </div>
                        );
                      })}
                    <div>
                      {guestNumber < Number(adultsParams) * Number(roomsParams) && !isBookingOffer && (
                        <span
                          onClick={() => {
                            if (guestNumber < Number(adultsParams) * Number(roomsParams)) {
                              setguestNumber((current) => (current += 1));
                            }
                          }}
                          className="block py-1 border border-dashed border-switch rounded-md text-center cursor-pointer"
                        >
                          + {bookerInfor?.buttonText?.add}
                        </span>
                      )}
                      {guestNumber > Number(roomsParams) && !isBookingOffer && (
                        <span
                          onClick={() => {
                            if (guestNumber > Number(roomsParams)) {
                              setguestNumber((current) => (current -= 1));
                            }
                          }}
                          className="mt-2 block py-1 border border-dashed border-switch rounded-md text-center cursor-pointer"
                        >
                          - {bookerInfor?.buttonText?.descrement}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/****** Address ******/}
            <div className="grid grid-cols-12 gap-4">
              <h2 className="col-span-12 text-xl font-[lora] font-normal">{address?.title}</h2>

              <Form.Item
                initialValue={offerBooker?.address?.addressLine1 || booker?.address?.addressLine1 || profile?.addressLine1}
                rules={[{ required: true, message: message?.required }]}
                name="street"
                className="col-span-12 !mb-0"
              >
                <Input placeholder={address?.placeholder?.street} size="large" />
              </Form.Item>

              <Form.Item
                initialValue={offerBooker?.address?.postalCode || booker?.address?.postalCode || profile?.postalCode}
                rules={[
                  { required: true, message: message?.required },
                  { pattern: regexModel.validateNumber, message: message?.number },
                ]}
                name="postalCode"
                className="xl:col-span-2 col-span-12 !mb-0"
              >
                <Input size="large" placeholder={address?.placeholder?.postalCode} />
              </Form.Item>

              <Form.Item
                initialValue={offerBooker?.address?.countryCode || booker?.address?.countryCode || profile?.countryCode}
                rules={[{ required: true, message: message?.required }]}
                name="country"
                className="xl:col-span-5 col-span-6 !mb-0"
              >
                <Select
                  suffixIcon={<MenuDropDownIcon />}
                  size="large"
                  showSearch
                  placeholder={address?.placeholder?.country}
                  optionFilterProp="children"
                  filterOption={(input, option: any) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                  }
                  options={modifiedCountries?.map((ele: CountryCodeType) => ({
                    label: ele.countryName,
                    value: ele.countryCode,
                  }))}

                />
              </Form.Item>

              <Form.Item
                initialValue={offerBooker?.address?.city || booker?.address?.city || profile?.location}
                name="city"
                className="xl:col-span-5 col-span-6 !mb-0"
              >
                <Input placeholder={address?.placeholder?.province} size="large" />
              </Form.Item>
            </div>

            {/****** Note ******/}
            <div className="grid grid-cols-12 gap-4">
              <h2 className="text-xl font-[lora] font-normal col-span-12">{step3?.note}</h2>
              <Form.Item initialValue={offerBooker?.note || booker?.note} name="bookerComment" className="col-span-12">
                <Input.TextArea rows={5} />
              </Form.Item>
            </div>

            {/****** Payment ******/}

            <div className="grid grid-cols-12 gap-4">
              <div className='invisible h-0'>
                <h2 className="text-xl font-[lora] font-normal col-span-12">{payment?.title}</h2>
                <NewPaymentMethodCard
                  // disable={[methodData[0].value, methodData[1].value]}
                  defaultValue={methodData[0].value}
                  onClick={(value) => handleSelectPayment(value)}
                  data={methodData}
                />
              </div>
            </div>

            {/****** Acept ******/}
            <Form.Item
              name={'policy'}
              rules={[
                {
                  required: !isCheckedPolicy,
                  message: message?.readOurPolicy,
                },
              ]}
            >
              <Checkbox
                checked={isCheckedPolicy}
                onChange={(e) => {
                  setIsCheckedPolicy(e.target.checked);
                }}
                style={{ lineHeight: '32px' }}
              >
                <div className="flex gap-1 text-sm leading-[18px]">{step3?.acceptCheckbox}</div>
              </Checkbox>
            </Form.Item>
            {/* WARNING missing content */}
            <div className="p-4 bg-secondary-switch flex flex-col gap-y-2 rounded-lg">
              {notice?.length
                ? notice.map((item: { title: string; description: string }, index: number) => (
                  <p key={index} className="text-xs text-primary-switch font-light">
                    <span className="font-normal">{item?.title}</span>: {item?.description}
                  </p>
                ))
                : ''}
            </div>
            <div className='flex flex-col'>
              <PaymentButtons disabled={loadingBooking} />
              {
                createMessage?.message ?
                  (
                    createMessage.status === 'error' ?
                      <div className='self-end mt-2 text-[14px] leading-[18px] font-normal !text-[#ff4d4f]'>{createMessage?.message.toString()}</div> :
                      <div className='self-end mt-2 text-[14px] leading-[18px] font-normal text-grey-switch'>{createMessage?.message.toString()}</div>
                  ) : ""
              }
            </div>
          </div>

          {/* booking invoice */}

          <div className="col-span-1 hidden xl:block">
            <div
              className={clsx(
                'transition-all ease-in-out duration-500 w-[258px]',
                fixed ? 'fixed bottom-0' : '',
                myElementIsVisible ? '!absolute !bottom-12' : ''
              )}
            >
              {invoice}
            </div>
          </div>
        </Form>
        {/*  modle */}
        {/* <Modal
          title={popupBooking?.title}
          open={isOpenModal}
          onCancel={handleCancel}
          footer={[
            (checkFaild.booking || checkFaild.getFoliosId) && (
              <ButtonShare
                onClick={async () => {
                  if (checkFaild.booking) {
                    setIsOpenModal(false);
                    setCheckFaild({ ...checkFaild, booking: false });
                  } else if (checkFaild.getFoliosId) {
                    if (reservationPayload) {
                      await asyncGetFoliosId(reservationPayload.bookingId);
                    }
                    setCheckFaild({ ...checkFaild, getFoliosId: false });
                  }
                }}
                key={1}
                size="small"
                content={'Retry'}
              />
            ),
          ]}
        >
          {loadingBooking && (
            <div className="flex flex-col items-center justify-center py-10">
              <Image
                className="w-10 h-10"
                src={require('../../assets/loading-gif.gif')}
                alt={'...'}
                width={0}
                height={0}
              />
              <p className="mt-4 text-PrimaryBlue text-[18px]">{popupBooking?.description} ...</p>
            </div>
          )}
          {!loadingBooking && <p>{createMessage?.message}</p>}
        </Modal> */}
        <div className="w-0" ref={bottomRef}></div>
      </Wrapper>
    </>
  );
};

export default CreateBooking;
