/* eslint-disable react-hooks/exhaustive-deps */
import { Wrapper } from '@/components';
import BundleIdInvoice from '@/components/Booking/partials/Invoices/BundleIdInvoice';
import ImageBox from '@/components/Room/partials/ImageBox';
import PriceBadge from '@/components/Room/partials/PriceBadge';
import RoomCard from '@/components/Room/partials/RoomCard';
import AvatarCard from '@/components/global/AvatarCard';
import BookingStep from '@/components/global/BookingStep';
import BoxContent, { StyleBox } from '@/components/global/BoxContent';
import ButtonShare from '@/components/global/ButtonShare';
import Currency from '@/components/global/CurrencyComponent';
import ScrollToTop from '@/components/global/ScrollTop';
import { pathPage } from '@/constants';
import messageErrors from '@/constants/alertConst';
import { EmptyImage } from '@/constants/imageUrl';
import statusCode from '@/constants/statusCode';
import { useIbeTranslation } from '@/hooks';
import MainLayout from '@/layouts/MainLayout';
import { BedIcon, Calendar, FilterIcon, InfoIcon } from '@/library';
import { BundleService } from '@/service/bundleService';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setSearchValue } from '@/store/slice/bundleSearchSlice';
import { setOpenCalendar } from '@/store/slice/commonSlice';
import { setBundleLoading } from '@/store/slice/statusSlice';
import { ThemeType } from '@/store/slice/themeSlice';
import { SearValueDetailType } from '@/types/bundle/bundleSearch';
import {
  ActivityType,
  BundleDetailType,
  BundlePricesType,
  BundlesServicesType,
  TagsType,
} from '@/types/bundle/bundleType';
import { ServiceAddonsType } from '@/types/invoceSliceType/invoceSliceType';
import { NextSheetWidthLayout } from '@/types/layoutType';
import { isSpecialDays, timeInPeriodsDefault } from '@/util/bundle';
import calculator from '@/util/calculator';
import getImagePath from '@/util/getImagePath';
import { querySearchParams } from '@/util/searchParams';
import { StarFilled } from '@ant-design/icons';
import { useLocale } from '@m0-0a/next-intl';
import { Drawer, Spin, Typography } from 'antd';
import clsx from 'clsx';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
const { Text } = Typography;

const RoomsPage: NextSheetWidthLayout = () => {
  const { ref: bottomRef, inView: myElementIsVisible } = useInView();
  const [fixed, setFixed] = useState(false);
  const [open, setOpen] = useState(false);
  const { locale } = useLocale();
  const step1 = useIbeTranslation('bookingSteps.step1');

  /** redux */
  const { searchValue } = useAppSelector((state) => state.bundleSlice);
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const { isBundleLoading } = useAppSelector((state) => state.statusSlice);
  const { selected } = useAppSelector((state) => state.themeSlice);

  /** page state  **/
  const [items, setItems] = useState<BundleDetailType>();
  const [initialPrice, setInitialPrice] = useState<number>(0);
  const [priceUpgrade, setPriceUpgrade] = useState<number>(0);
  const [totalPriceOfCalc, setTotalPriceOfCalc] = useState<number>(0);
  const [serviceIncluded, setServiceIncluded] = useState<any>();

  const [rooms, setRooms] = useState<string>('');
  const router = useRouter();
  const [imgBundle, setImgBundle] = useState<any[]>([]);
  const [bundlePriceId, setBundlePriceId] = useState<string>('');

  const icon =
    selected === ThemeType.default ? items?.landscape?.icons?.light : items?.landscape?.icons?.dark;
  const { bundleId } = router.query;
  /** searchParams value */
  const arrivalParams = searchParams.get('arrival');
  const departureParams = searchParams.get('departure');
  const roomsParams = searchParams.get('rooms');
  const adultsParams = searchParams.get('adults');
  const childrenAgeBelowParams = searchParams.get('childrenAgeBelow');

  /** get detail bundle wit params */
  const fetchBundleDetail = async (data: SearValueDetailType, signal?: AbortSignal) => {
    dispatch(setBundleLoading(true));
    try {
      const res = await BundleService.searchBundleById(data, { signal });

      if (res && res.code === statusCode.SUCCESS && res?.data && res.data?.length) {
        const newData = res?.data[0];
        setItems(newData);
        const bundleLatest = newData?.bundlePrices?.length
          ? newData?.bundlePrices[newData.bundlePrices.length - 1]
          : [];
        const newParams = {
          ...searchValue,
          adults: data.adults,
          children: data.children?.length,
          childrenAgeBelow: data.children,
          periods: newData?.periods,
          rooms: data.rooms,
          arrival: data.arrival,
          departure: data.departure,
          countryCode: newData?.property?.location?.countryCode || searchValue?.countryCode || '',
          propertyId: newData?.property?.extId || searchValue?.propertyId || '',
          maxStay: newData?.maximumStay,
          minStay: newData?.minimumStay,
          maxPersons: bundleLatest?.unitGroup?.maxPersons,
          maxRooms: bundleLatest?.unitGroup?.availableUnits,
          daysOfWeek: newData?.daysOfWeek,
          bundleId: bundleId?.toString(),
        };
        if ((!data.departure || !data.arrival) && newData?.periods) {
          const defaulTime = timeInPeriodsDefault(
            newData?.periods,
            newData?.minimumStay,
            isSpecialDays(newData?.daysOfWeek)
          );
          const newTimeParams = {
            ...newParams,
            arrival: defaulTime.start,
            departure: defaulTime.end,
          };
          dispatch(setSearchValue(newTimeParams));
          router.replace(`/${pathPage.result}/${bundleId}?${querySearchParams(newTimeParams)}`);
        } else {
          dispatch(setSearchValue(newParams));
        }

        if (newData?.bundlePrices?.length && newData?.bundlePrices[0]?.bundlePriceId)
          setBundlePriceId(res.data[0].bundlePrices[0].bundlePriceId);

        const imageBunddle = newData?.media?.map((ele: string) => {
          return res?.data ? getImagePath(ele) : EmptyImage;
        });
        imageBunddle && setImgBundle(imageBunddle);

        const serviceCalc: ServiceAddonsType[] = res.data[0].bundleServices?.map(
          (ele: BundlesServicesType) => ({
            count: searchValue ? searchValue.rooms : roomsParams,
            mode: ele.mode,
            price: ele.overwritePrice,
            serviceId: ele.serviceId,
            serviceName: ele.name,
          })
        );
        setServiceIncluded(serviceCalc);
        dispatch(setBundleLoading(false));
      } else if (
        res &&
        res.code == statusCode.SEVER_ERROR &&
        res.errors[0] === messageErrors.notFound
      ) {
        router.push(`/${pathPage.notFound}`);
      } else {
        dispatch(setOpenCalendar(true));
        dispatch(setBundleLoading(false));
      }
    } catch (err) {
      // router.push(`/${pathPage.notFound}`);
      dispatch(setBundleLoading(false));
    }
  };

  /** effect watching get bundle detail  */
  useEffect(() => {
    const controller = new AbortController();
    if (bundleId) {
      const data: SearValueDetailType = {
        id: bundleId.toString(),
        adults: Number(adultsParams || 1),
        rooms: Number(roomsParams || 1),
        children: childrenAgeBelowParams
          ? childrenAgeBelowParams.split(',').map((ele: string) => Number(ele))
          : [],
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      };
      if (arrivalParams) data.arrival = Number(arrivalParams);
      if (departureParams) data.departure = Number(departureParams);
      fetchBundleDetail(data, controller.signal);
    }

    return () => {
      controller.abort();
    };
  }, [router.asPath, bundleId]);

  useEffect(() => {
    if (!searchValue) {
      if (arrivalParams && departureParams && roomsParams && arrivalParams) {
        const searchData = {
          countryCode: items?.property?.location?.countryCode ?? '',
          propertyId: items?.property?.extId ?? '',
          arrival: Number(arrivalParams),
          departure: Number(departureParams),
          adults: Number(adultsParams),
          rooms: Number(roomsParams),
          children: Number(childrenAgeBelowParams?.length) - 1,
          childrenAgeBelow: childrenAgeBelowParams,
        };
        dispatch(setSearchValue(searchData));
      }
    }
    const calculate = calculator.calcTotalPrice(
      priceUpgrade,
      searchValue?.rooms,
      searchValue?.arrival,
      searchValue?.departure
    );
    setTotalPriceOfCalc(calculate);
  }, [priceUpgrade, items, serviceIncluded, searchValue]);

  /** initializing total price for bundle */
  useEffect(() => {
    if (items && searchValue && items?.bundlePrices?.length) {
      const initial = calculator.calcPriceOfBundle(
        items?.bundlePrices[0]?.originalPrice,
        searchValue?.arrival || 0,
        searchValue?.departure || 0,
        serviceIncluded
      );
      setInitialPrice(initial);
      setPriceUpgrade(initial);
      setRooms(`${items?.bundlePrices[0].name} @ ${searchValue?.rooms}`);
    }
  }, [bundleId, items, serviceIncluded]);

  // filter mobile
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

  useEffect(() => {
    window.addEventListener('scroll', () =>
      window.scrollY > 0 ? setFixed(true) : setFixed(false)
    );
  }, []);

  return (
    <>
      <BookingStep activeStep={1} />
      <div className="bg-secondary-switch">
        <Spin spinning={!items || isBundleLoading}>
          <Wrapper>
            <ScrollToTop />
            {/* filter mobile */}
            <div
              className="xl:hidden fixed left-0 top-36 z-40 bg-primary-switch w-fit p-4 rounded-md flex"
              onClick={() => setOpen(!open)}
            >
              <FilterIcon />
            </div>
            <Drawer title placement={'left'} onClose={onClose} open={open}>
              <BundleIdInvoice
                bundlePriceId={{
                  state: bundlePriceId,
                  setState: setBundlePriceId,
                }}
                initialPrice={{
                  state: initialPrice,
                  setState: setInitialPrice,
                }}
                rooms={{
                  state: rooms,
                  setState: setRooms,
                }}
                data={{
                  state: items,
                  setState: setItems as any,
                }}
                priceUpgrade={{
                  state: priceUpgrade,
                  setState: setPriceUpgrade,
                }}
                totalPriceOfCalc={{
                  state: totalPriceOfCalc,
                  setState: setTotalPriceOfCalc,
                }}
              />
            </Drawer>

            {/* End filter mobile */}
            <div className="grid xl:grid-cols-4 gap-6">
              <div className="col-span-3">
                <RoomCard
                  media={<ImageBox data={imgBundle} />}
                  bundleDetailText={step1}
                  overview={
                    <div className="flex flex-col gap-4">
                      <div>
                        <div className="flex gap-2">
                          <div className="w-fit bg-SecondaryYellow p-2 flex gap-1 rounded items-center justify-center">
                            <Calendar className="text-PrimaryBlack" />
                            <p className="text-PrimaryBlack text-xs leading-4">
                              {step1?.bundleDetail?.minimumStay}{' '}
                              <span className="font-medium">
                                {items?.minimumStay || 1} {step1?.bundleDetail?.days}
                              </span>
                            </p>
                          </div>
                          <div className="w-fit bg-SecondaryYellow p-2 flex gap-1 rounded items-center justify-center">
                            <Calendar className="text-PrimaryBlack" />
                            <p className="text-PrimaryBlack text-xs leading-4">
                              {`${step1?.bundleDetail?.maximumStay} `}
                              <span className="font-medium">
                                {`${items?.maximumStay || 30} `} {step1?.bundleDetail?.days}
                              </span>
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-between items-center pt-2 pb-4 gap-4">
                          <h3 className="font-[Lora] text-2xl mb-3 font-normal !capitalize textDesc-3">
                            {items?.extendedData?.title && items?.extendedData?.title?.[locale]
                              ? items?.extendedData?.title?.[locale]
                              : items?.extendedData?.title?.en || items?.name}
                          </h3>
                          <div className="flex justify-end">
                            <div className="w-[50px] h-[50px] bg-icon-switch shadow-md flex justify-center items-center rounded">
                              <Image
                                className="w-6 h-6 object-cover transition-all"
                                src={icon ? getImagePath(icon) : EmptyImage}
                                alt="..."
                                width={0}
                                height={0}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-row gap-4 p-2 bg-secondary-switch rounded cursor-pointer">
                          <AvatarCard
                            propertyId={items?.property.extId}
                            className="!p-0"
                            src={
                              items?.property?.media
                                ? getImagePath(items?.property?.media[0])
                                : EmptyImage
                            }
                            style="horizontal"
                            content={
                              <>
                                <p className="flex-wrap text-base leading-5">
                                  {locale && items?.property?.extendedData?.name?.[locale]
                                    ? items?.property?.extendedData?.name?.[locale]
                                    : items?.property?.extendedData?.name?.en || items?.name}
                                </p>
                                <p className="flex-wrap text-xs py-1">
                                  {items?.property.city}, {items?.property.country}
                                </p>
                                <StarFilled className="text-PrimaryBlue" />
                                <StarFilled className="text-PrimaryBlue" />
                                <StarFilled className="text-PrimaryBlue" />
                                <StarFilled className="text-PrimaryBlue" />
                              </>
                            }
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        {items?.activities?.slice(0, 3)?.map((ele: ActivityType, index: number) => {
                          return (
                            <BoxContent
                              style={StyleBox.BOX}
                              label={ele?.extendedData?.title?.[locale] || ele?.name}
                              icon={
                                (selected === ThemeType.default ? ele?.dark : ele?.light) ||
                                ele?.icon
                              }
                              key={index}
                              height="auto"
                              labelStyle="text-[16px] textDesc-1"
                              className={clsx('!py-2 flex-row-reverse !justify-end gap-6 !mt-0', {
                                '!border-b': items?.activities?.slice(0, 3)?.length - 1 === index,
                              })}
                            />
                          );
                        })}
                        <PriceBadge className="flex flex-row justify-between gap-2 items-center p-3">
                          <div className="flex flex-row justify-start gap-2">
                            <InfoIcon />
                            <Text className="!mb-0">{step1?.bundleDetail?.overwritePrice}</Text>
                          </div>
                          <Currency
                            price={initialPrice}
                            fontSize={'text-2xl'}
                            leading={'leading-8'}
                          />
                        </PriceBadge>
                      </div>
                    </div>
                  }
                  detail={
                    (items && items.description) ||
                    (items?.activities && items?.activities?.length > 3) ? (
                      <div>
                        {items?.description && (
                          <div
                            className="py-4"
                            dangerouslySetInnerHTML={{
                              __html: `${
                                items?.extendedData?.description &&
                                items?.extendedData?.description?.[locale]
                                  ? items?.extendedData?.description?.[locale]
                                  : items?.extendedData?.description?.en
                              }`,
                            }}
                          ></div>
                        )}
                        <div className="grid grid-cols-12 gap-4">
                          {items?.activities?.slice(3)?.map((ele: ActivityType, index: number) => {
                            return (
                              <div className="col-span-6" key={index}>
                                <BoxContent
                                  style={StyleBox.BOX}
                                  label={ele.name}
                                  icon={
                                    (selected === ThemeType.default ? ele?.dark : ele?.light) ||
                                    ele?.icon
                                  }
                                  height="auto"
                                  labelStyle="text-[16px] textDesc-1"
                                  className={clsx(
                                    '!py-2 flex-row-reverse !justify-end gap-6 !mt-0'
                                  )}
                                />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ) : null
                  }
                />

                <div className="flex flex-row justify-start items-center mt-14 mb-[30px]">
                  <div className="bg-PrimaryBlue min-w-[44px] w-11 h-11 rounded-[50%] flex items-center justify-center">
                    <BedIcon className="text-PrimaryWhite w-6 h-6" />
                  </div>
                  <div className="font-[Lora] text-[24px] leading-8 ml-2">
                    {step1?.bundleDetail?.chooseYourRoom ?? 'Choose your room'}
                  </div>
                </div>

                {items?.bundlePrices?.map((bundle: BundlePricesType, index: number) => {
                  return (
                    <div className="w-full" key={index}>
                      <div>
                        <RoomCard
                          bundleDetailText={step1}
                          media={
                            <ImageBox
                              data={bundle?.unitGroup?.media?.map((ele: any) => {
                                return bundle?.unitGroup ? getImagePath(ele) : EmptyImage;
                              })}
                            />
                          }
                          overview={
                            <div className="flex flex-col gap-4">
                              <div>
                                <div className="font-[Lora] text-2xl mb-3">
                                  {bundle?.unitGroup?.extendedData?.name?.[locale]
                                    ? bundle?.unitGroup?.extendedData?.name?.[locale]
                                    : bundle?.unitGroup?.extendedData?.name?.en ??
                                      bundle?.unitGroup?.name}
                                </div>
                                <div className="flex flex-row gap-4 mr-4 items-center">
                                  <div className="rounded-[500px] bg-secondary-switch  px-4 py-1">
                                    {bundle?.unitGroup?.size}sqm
                                  </div>
                                  <div className="text-PrimaryRed">
                                    {bundle?.unitGroup?.availableUnits >= 10
                                      ? ''
                                      : step1?.room?.only}{' '}
                                    {bundle?.unitGroup?.availableUnits} {step1?.room?.roomLeft}!
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-col gap-2">
                                <div className="grid grid-cols-2 gap-3">
                                  {bundle?.unitGroup.tags
                                    ?.slice(0, 4)
                                    .map((item: any, i: number) => {
                                      return (
                                        <div
                                          className="border-solid rounded border border-PrimaryBlack/10 w-full flex flex-row p-5 justify-between items-center"
                                          key={i}
                                        >
                                          <p className="text-[14px]">{item.title}</p>
                                          {item.icon && (
                                            <Image
                                              src={item.icon ? getImagePath(item.icon) : EmptyImage}
                                              height={26}
                                              width={26}
                                              alt="attribute icon"
                                            />
                                          )}
                                        </div>
                                      );
                                    })}
                                </div>
                                <PriceBadge className="flex flex-row justify-between gap-2 items-center p-3">
                                  <div className="flex flex-row justify-start gap-2">
                                    <InfoIcon />
                                    <Text className="!mb-0">{step1?.room?.perNight}</Text>
                                  </div>
                                  <div className="flex gap-2 leading-[48px] text-primary-switch">
                                    <p className="text-2xl leading-8 text-primary-switch">
                                      {searchValue &&
                                      calculator.calcPriceOfBundle(
                                        bundle.originalPrice,
                                        searchValue?.arrival || 0,
                                        searchValue?.departure || 0,
                                        serviceIncluded
                                      ) -
                                        priceUpgrade >=
                                        0
                                        ? '+'
                                        : '-'}
                                    </p>
                                    {searchValue && (
                                      <Currency
                                        price={Math.abs(
                                          calculator.calcPriceOfBundle(
                                            bundle.originalPrice,
                                            searchValue?.arrival || 0,
                                            searchValue?.departure || 0,
                                            serviceIncluded
                                          ) - priceUpgrade
                                        )}
                                        fontSize={'text-2xl'}
                                        leading={'leading-8'}
                                      />
                                    )}
                                  </div>
                                </PriceBadge>
                                <div className="mt-3 flex flex-row justify-end items-center">
                                  <div className="text-PrimaryPrimaryBlue mr-8">
                                    {step1?.room?.freeCancel || 'Free cancellation'}
                                  </div>
                                  {/* process button */}
                                  {bundle.bundlePriceId !== bundlePriceId ? (
                                    <ButtonShare
                                      size="large"
                                      className="!font-medium !py-[13px]"
                                      content={step1?.room?.buttonText || 'Book this room'}
                                      style={'outline'}
                                      onClick={() => {
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                        if (searchValue) {
                                          const total = calculator.calcPriceOfBundle(
                                            bundle.originalPrice,
                                            searchValue.arrival || 0,
                                            searchValue.departure || 0,
                                            serviceIncluded
                                          );
                                          setPriceUpgrade(total);
                                        }
                                        setBundlePriceId(bundle.bundlePriceId);
                                        // doing rooms
                                        setRooms(`${bundle?.name} @ ${searchValue?.rooms} `);
                                      }}
                                    />
                                  ) : (
                                    ''
                                  )}
                                </div>
                              </div>
                            </div>
                          }
                          detail={
                            (bundle && bundle?.unitGroup?.description) ||
                            (bundle && bundle?.unitGroup?.tags?.length > 3 && (
                              <div>
                                {bundle?.unitGroup?.description && (
                                  <div
                                    className="py-4"
                                    dangerouslySetInnerHTML={{
                                      __html: `${
                                        bundle?.unitGroup?.extendedData?.description?.[locale]
                                          ? bundle?.unitGroup?.extendedData?.description?.[locale]
                                          : bundle?.unitGroup?.extendedData?.description?.en ??
                                            bundle?.unitGroup?.description
                                      }`,
                                    }}
                                  ></div>
                                )}
                                <div className="grid grid-cols-12 gap-4">
                                  {bundle?.unitGroup?.tags
                                    ?.slice(4)
                                    ?.map((tag: TagsType, index: number) => {
                                      return (
                                        <div className="col-span-6" key={index}>
                                          <BoxContent
                                            style={StyleBox.BOX}
                                            label={tag.title}
                                            icon={tag.icon}
                                            height="auto"
                                            labelStyle="text-[16px] textDesc-1"
                                            className={clsx(
                                              '!py-2 flex-row-reverse !justify-end gap-6 !mt-0'
                                            )}
                                          />
                                        </div>
                                      );
                                    })}
                                </div>
                              </div>
                            ))
                          }
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* booking invoice */}
              <div className="col-span-1 pl-6 hidden xl:block">
                <div
                  className={clsx(
                    'transition-all ease-in-out duration-500',
                    fixed ? 'fixed bottom-0 w-[258px]' : '',
                    myElementIsVisible ? '!absolute !bottom-12' : ''
                  )}
                >
                  <BundleIdInvoice
                    bundlePriceId={{
                      state: bundlePriceId,
                      setState: setBundlePriceId,
                    }}
                    initialPrice={{
                      state: initialPrice,
                      setState: setInitialPrice,
                    }}
                    rooms={{
                      state: rooms,
                      setState: setRooms,
                    }}
                    data={{
                      state: items,
                      setState: setItems as any,
                    }}
                    priceUpgrade={{
                      state: priceUpgrade,
                      setState: setPriceUpgrade,
                    }}
                    totalPriceOfCalc={{
                      state: totalPriceOfCalc,
                      setState: setTotalPriceOfCalc,
                    }}
                  />
                </div>
              </div>
            </div>
          </Wrapper>
        </Spin>
        <div ref={bottomRef}></div>
      </div>
    </>
  );
};

RoomsPage.Layout = MainLayout;

export default RoomsPage;
