/* eslint-disable react-hooks/exhaustive-deps */
import DropDownContainer from '../CreateBooking/partials/DropDownContainer';
import DropDownContent from '../CreateBooking/partials/DropDownContent';
import InfoContainer from '../CreateBooking/partials/InfoContainer';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useRouter } from 'next/router';
import BookingStep from '../global/BookingStep';
import ScrollToTop from '../global/ScrollTop';
import { Wrapper } from '../global/Wrapper';
import { addPaidList, addPaymentLinkList } from '@/store/slice/paidSlice';
import ButtonShare from '../global/ButtonShare';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useIbeTranslation } from '@/hooks';
import { PropertyService } from '@/service/cmsStrapiService';
import { useSearchParams } from 'next/navigation';
import { ThemeType } from '@/store/slice/themeSlice';
import { pathPage, pathSocket, pathsBooking } from '@/constants';
import { CreateAdyenPaymentLinkService, FinanceService } from '@/service/financeService';
import { FoliosPayloadType } from '@/types/foliosSliceType/foliosSlice';
import { BundlePriceType, ServiceAddonsType } from '@/types/invoceSliceType/invoceSliceType';
import { calculateTotalGuest } from '@/util/bundle';
import { setSearchValue } from '@/store/slice/bundleSearchSlice';
import { SearchValueType } from '@/types/bundle/bundleSearch';
import { addItems } from '@/util/service';
import { querySearchParams } from '@/util/searchParams';

const Confirmation = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const propertyId = searchParams.get('propertyId');
  const isBookingOffer = router.asPath.includes(pathPage.offer);
  const { folios } = useAppSelector((state) => state.foliosSlice);
  const { paidList, paymentLinkList } = useAppSelector((state) => state.paidSlice);
  const { detail, bundles, services } = useAppSelector((state) => state.offerSlice);
  const [paidAll, setPaidAll] = useState(false);
  const [clickedPayment, setClickedPayment] = useState(false);
  const checkPaid = Boolean(paidList.length) && paidList.every((ele) => Number(ele.balance.amount) >= 0) && folios && paidList.length >= folios?.length;
  const arrivalParams = searchParams.get('arrival');
  const departureParams = searchParams.get('departure');
  const roomsParams = searchParams.get('rooms');
  const adultsParams = searchParams.get('adults');
  const childrenAgeBelowParams = searchParams.get('childrenAgeBelow');
  const countryCodeParams = searchParams.get('countryCode');
  const propertyIdParams = searchParams.get('propertyId');
  const childrenParams = searchParams.get('children');
  const bundleIdParams = searchParams.get('bundleId');
  const offerIdParams = searchParams.get('offerId');

  useEffect(() => {
    if (paidAll) {
      (() => {
        const params: SearchValueType = {
          countryCode: countryCodeParams || '',
          propertyId: propertyIdParams || '',
          arrival: arrivalParams ? Number(arrivalParams) : undefined,
          departure: departureParams ? Number(departureParams) : undefined,
          rooms: roomsParams ? Number(roomsParams) : 1,
          adults: adultsParams ? Number(adultsParams) : 1,
          children: childrenParams ? Number(childrenParams) : 0,
          childrenAgeBelow: childrenAgeBelowParams?.toString() ?? undefined,
          offerId: offerIdParams ? offerIdParams?.toString() : undefined,
          bundleId: bundleIdParams ? bundleIdParams?.toString() : undefined

        }

        const queryParams = querySearchParams(params);

        router.push({
          pathname: pathsBooking.THANKYOU,
          query: queryParams,
        });
      })();
    }
  }, [paidAll, router, adultsParams, arrivalParams, roomsParams, countryCodeParams, bundleIdParams, departureParams, childrenParams, childrenAgeBelowParams, propertyIdParams]);

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
        dispatch(addPaymentLinkList(linkPayment));
        return linkPayment;
      }
      return { getLink: "" }
    } catch (error) {
      return { getLink: "" }
    }
  }, []);

  // check if is paid all
  useEffect(() => {
    if (!clickedPayment) {
      return;
    }
    try {
      // fetch folios again to check if payment have been made
      if (folios && folios.length) {
        FinanceService.getFolios({ bookingId: folios[0].id?.replaceAll("-1", "") }).then((res) => {
          if (res?.folios?.length) {
            for (let i in res.folios) {
              if (res.folios[i].balance.amount >= 0) {
                const newPaid = {
                  foliosId: res.folios[i].id,
                  balance: {
                    amount: res.folios[i].balance.amount,
                    currency: res.folios[i].balance.currency,
                  },
                };
                dispatch(addPaidList(newPaid));
              }
            }
          }
        });
      }

      if (checkPaid) {
        setPaidAll(true);
      }
    } catch (error) { }
  }, [clickedPayment, folios, checkPaid]);

  useEffect(() => {
    // create only one payment link        
    const amount = folios?.reduce((total: number, folio: FoliosPayloadType) => total + (folio?.balance?.amount || 0), 0);
    const currency = folios && folios[0]?.balance.currency;
    const bookingId = folios && folios[0]?.id.replaceAll("-1", "");
    if (amount && currency && bookingId) {
      createPaymentLink(Math.abs(amount), currency, bookingId);
    }
  }, [createPaymentLink, folios]);

  // open web socket and wait for payment to complete
  useEffect(() => {
    let socket: any;
    const openSocketCondition = clickedPayment && !checkPaid && paymentLinkList?.length === 1;
    if (openSocketCondition) {
      socket = new WebSocket(pathSocket.SOCKET_GET_PAYMENT);
      socket.onmessage = async (event: any) => {
        if (event.data && !event?.data?.includes('iam') && folios?.length && event?.data === folios[0].id?.replaceAll("-1", "")) {
          const res = await FinanceService.getFolios({ bookingId: event.data });
          if (res?.folios?.every((ele: FoliosPayloadType) => Number(ele.balance.amount) >= 0)) {
            setPaidAll(true);
          }
        }
      };
    }
    return () => {
      if (openSocketCondition) {
        socket.close();
      }
    };
  }, [clickedPayment, checkPaid, paymentLinkList, folios]);

  const fetchHotelDetail = useCallback(async (propertyId: string) => {
    try {
      const response = await PropertyService.getProperties({ filters: { code: propertyId } });
      if (response && response.data && Array.isArray(response.data)) {
        const { attributes } = response.data[0];
        if (attributes?.media && attributes?.media) {
          setPropertyStrapi({
            blackLogo: response?.data[0].attributes?.media?.data[0].attributes?.url,
            whiteLogo: response?.data[0].attributes?.media?.data[1].attributes?.url,
          });
        }
      }
    } catch (err) { }
  }, []);

  useEffect(() => {
    if (isBookingOffer && detail?.property?.extId) {
      fetchHotelDetail(detail?.property?.extId);
    }
  }, [isBookingOffer, detail, fetchHotelDetail]);

  /** state rudux */
  const { searchValue } = useAppSelector((state) => state.bundleSlice);
  const { bundlePrice, serviceAddons } = useAppSelector((state) => state.invoiceSlice);

  const { voucher } = useAppSelector((state) => state.voucherSlice);
  const bundlePrices: BundlePriceType[] = isBookingOffer ? bundles && bundles.map((offerBundle: any) => ({
    bundleId: offerBundle?.bundle?.bundleId || "",
    bundleName: offerBundle?.bundle?.name || "",
    bundlePriceName: offerBundle?.name || "",
    price: offerBundle?.initialPrice || 0,
    bundlePriceId: offerBundle?.bundlePriceId || "",
    currency: offerBundle?.bundle?.currency,
    count: offerBundle?.count || 1,
  })) || [] :
    (bundlePrice && [bundlePrice] || []);

  /** Check current theme **/
  const { selected } = useAppSelector((state) => state.themeSlice);

  /**set state property */
  const [propertyStrapi, setPropertyStrapi] = useState({ blackLogo: '', whiteLogo: '' });

  const dispatch = useAppDispatch();

  const step4 = useIbeTranslation('bookingSteps.step4');
  const stayInfo = step4?.stayInfo;
  const roomsAndOffersInfo = step4?.roomsAndOffersInfo;
  useEffect(() => {
    if (propertyId) {
      fetchHotelDetail(propertyId);
    }
  }, [fetchHotelDetail, propertyId]);

  const serviceIncluded = useMemo(() => {
    let bundleServices: ServiceAddonsType[] = []
    if (bundles)
      bundles?.forEach(bundles => {
        bundles?.bundle?.bundleServices?.forEach((bundleService: any) => {
          const service = {
            serviceId: bundleService.serviceId,
            price: bundleService.overwritePrice,
            serviceName: bundleService.name,
            count: bundles.adults,
            mode: bundleService.mode
          }
          bundleServices = addItems(bundleServices, service)
        })
      })
    if (services) {
      services.forEach((ele: any) => {
        const service = {
          serviceId: ele?.extId,
          price: ele?.price,
          serviceName: ele?.name,
          extendedData: {
            title: ele?.extendedData?.title,
            name: ele?.extendedData?.name,
            description: ele?.extendedData?.description,
          },
          mode: ele?.mode,
          count: ele?.count,
        }
        bundleServices = addItems(bundleServices, service);
      })
    }
    return bundleServices
  }, [bundles, services])

  useEffect(() => {
    if (isBookingOffer && detail && bundles?.length) {
      const guest = calculateTotalGuest(bundles?.map((bd: any) => ({ ...bd, number: (bd?.children?.length + bd?.adults) })))
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

  return (
    <>
      <BookingStep activeStep={4} />
      <Wrapper>
        <ScrollToTop />

        <div className="flex flex-wrap justify-between items-center">
          <h2 className="font-[lora] text-4xl leading-[48px]">{step4?.title}</h2>
          <ButtonShare
            spin={!checkPaid && paymentLinkList?.length === 0 || clickedPayment}
            disable={!checkPaid && paymentLinkList?.length === 0}
            onClick={() => {
              setClickedPayment(true);
              if (paymentLinkList[0]?.getLink) {
                window.open(paymentLinkList[0].getLink, '_blank');
              }
            }}
            content={(paymentLinkList.length || checkPaid) && step4?.buttonText?.next}
            size="medium"
            style="dark"
          />
        </div>
        <div className="grid grid-cols-3 mt-6 gap-8">
          <div className="xl:col-span-2 col-span-3 flex flex-col gap-x-6">
            <DropDownContainer title={roomsAndOffersInfo?.title}>
              <DropDownContent
                voucherData={voucher}
                bundles={bundlePrices}
                searchValue={searchValue}
                serviceAddons={!isBookingOffer ? serviceAddons : { addons: serviceAddons.addons, baseService: serviceIncluded }}
                content={{ ...roomsAndOffersInfo }}
                offerDiscount={detail?.discount}
              />
            </DropDownContainer>
          </div>
          {/* <Modal
            cancelText="payment later"
            title={popupBooking?.title}
            open={openModal}
            footer={null}
          >
            <PaymentItem jsonFile={popupBooking} />
            <p className="mt-2">{popupBooking?.description}</p>
          </Modal> */}

          <div className="xl:col-span-1 col-span-3 bg-primary-switch p-4 rounded-lg">
            <InfoContainer
              content={{ stayInfo }}
              logo={
                selected === ThemeType.default ? propertyStrapi.blackLogo : propertyStrapi.whiteLogo
              }
            />
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default Confirmation;
