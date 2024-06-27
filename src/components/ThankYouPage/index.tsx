/* eslint-disable react-hooks/exhaustive-deps */
import Image from 'next/image';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ButtonShare from '../global/ButtonShare';
import Link from 'next/link';
import { DownloadIcon } from '@/library';
import { Wrapper } from '../global/Wrapper';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useIbeTranslation } from '@/hooks';
import getImagePath from '@/util/getImagePath';
import { ThemeType } from '@/store/slice/themeSlice';
import { EmptyImage } from '@/constants/imageUrl';
import ReactToPrint from 'react-to-print';
import InfoContainer from '../CreateBooking/partials/InfoContainer';
import { PropertyService } from '@/service/cmsStrapiService';
import DropDownContainer from '../CreateBooking/partials/DropDownContainer';
import DropDownContent from '../CreateBooking/partials/DropDownContent';
import { BundlePriceType, ServiceAddonsType } from '@/types/invoceSliceType/invoceSliceType';
import { useRouter } from 'next/router';
import { pathPage } from '@/constants';
import { addItems } from '@/util/service';
import { calculateTotalGuest } from '@/util/bundle';
import { SearchValueType } from '@/types/bundle/bundleSearch';
import { setSearchValue } from '@/store/slice/bundleSearchSlice';

const ThankYouPage = () => {
  const router = useRouter();
  const [propertyStrapi, setPropertyStrapi] = useState({ blackLogo: '' });
  const componentRef = useRef(null);
  const dispatch = useAppDispatch();
  const { reservationPayload, booker } = useAppSelector((state) => state.bookingSlice);
  const { bundlePrice, serviceAddons } = useAppSelector((state) => state.invoiceSlice);
  const { searchValue } = useAppSelector((state) => state.bundleSlice);
  const { selected } = useAppSelector((state) => state.themeSlice);
  const { detail, bundles, services } = useAppSelector((state) => state.offerSlice);
  const thankYou = useIbeTranslation('thankYouPage');
  const step4 = useIbeTranslation('bookingSteps.step4');
  const stayInfo = step4?.stayInfo;
  const roomsAndOffersInfo = step4?.roomsAndOffersInfo;
  const propertyId = searchValue?.propertyId
  const { voucher } = useAppSelector((state) => state.voucherSlice);
  const isBookingOffer = router.asPath.includes(pathPage.offer);
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
  const fetchHotelDetail = useCallback(async (propertyId: string) => {
    try {
      const response = await PropertyService.getProperties({ filters: { code: propertyId } });
      if (response && response.data && Array.isArray(response.data)) {
        const { attributes } = response.data[0];
        if (attributes?.media && attributes?.media) {
          setPropertyStrapi({
            blackLogo: response?.data[0].attributes?.media?.data[0].attributes?.url,
          });
        }
      }
    } catch (err) { }
  }, []);
  useEffect(() => {
    if (propertyId) {
      fetchHotelDetail(propertyId);
    }
  }, [fetchHotelDetail, propertyId]);
  useEffect(() => {
    if (isBookingOffer && detail?.property?.extId) {
      fetchHotelDetail(detail?.property?.extId);
    }
  }, [isBookingOffer, detail, fetchHotelDetail]);

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
  return (
    <Wrapper className="pt-0">
      <div className="bg-primary-switch py-6 rounded-2xl">
        <div className="flex flex-col items-center gap-y-8">
          <div className="flex flex-col gap-4 items-center justify-center">
            <Image
              src={
                selected === ThemeType.default
                  ? getImagePath('/uploads/Dark_b3b60f2f91.png')
                  : selected === ThemeType.dark
                    ? getImagePath('/uploads/white_Logo_03b734f213.png')
                    : EmptyImage
              }
              alt=""
              width={0}
              height={0}
              className="w-fit h-14"
            />
            <p className="font-[Lora] text-5xl leading-[60px] text-center">
              {thankYou?.title || 'Thank you for booking'}
            </p>
            <p className="leading-[20px]">
              {thankYou?.content?.bookingID || 'Booking ID'}:{' '}
              <span>{reservationPayload?.bookingId}</span>
            </p>
          </div>
          <div className="flex flex-col gap-y-2 items-center text-center">
            <p>
              {thankYou?.content?.email || 'We sent the detail to email'}: {booker?.email}
            </p>
            <p>
              {thankYou?.content?.download ||
                'Additionally, you can download your invoice for your records'}
            </p>
          </div>
            <ReactToPrint
              trigger={() => <div className="flex flex-col gap-y-2 items-center">
                <ButtonShare
                  style="dark"
                  size="large"
                  content={
                    <p className="flex">
                      {thankYou?.buttonText?.download || 'Download invoice'}
                      <DownloadIcon />
                    </p>
                  }
                />
              </div>}
              content={() => componentRef.current}
            />
            <Link className="font-medium text-PrimaryBlue hover:text-HoverBlue" href="/">
                  {thankYou?.buttonText?.home || 'Go home'}
            </Link>
          <div style={{ display: 'none' }}>
            <div ref={componentRef}>
              <Wrapper className='grid grid-cols-5 gap-8 bg-primary-switch'>
                <div className='col-span-3'>
                  <DropDownContainer
                    className='!p-0'
                    title={roomsAndOffersInfo?.title}>
                    <DropDownContent
                      voucherData={voucher}
                      bundles={bundlePrices}
                      searchValue={searchValue}
                      serviceAddons={!isBookingOffer ? serviceAddons : { addons: serviceAddons.addons, baseService: serviceIncluded }}
                      content={{ ...roomsAndOffersInfo }}
                      offerDiscount={detail?.discount} />
                  </DropDownContainer>
                </div>
                <div className='col-span-2 p-6'>
                  <InfoContainer content={{ stayInfo }}
                    logo={propertyStrapi.blackLogo} />
                </div>
              </Wrapper>
            </div>
          </div>
          <div>
            <p>
              {thankYou?.help || 'If you have any issues'},{' '}
              <Link className="text-PrimaryBlue hover:text-HoverBlue" href={'/contact'}>
                {thankYou?.buttonText?.contact || 'contact us'}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default ThankYouPage;
