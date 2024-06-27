/* eslint-disable react-hooks/exhaustive-deps */
import { Wrapper } from '@/components';
import AddonCard from '@/components/Addons/AddonCard';
import OfferIdInvoice from '@/components/Booking/partials/Invoices/OfferIdInvoice';
import { DEFAULT_MAX, DEFAULT_MAX_ROOM } from '@/components/Booking/partials/SelectGuestDropdown';
import BookingStep from '@/components/global/BookingStep';
import Currentcy from '@/components/global/CurrencyComponent';
import ScrollToTop from '@/components/global/ScrollTop';
import BookingInvoice from '@/components/shared/BookingInvoice';
import ToggleButton from '@/components/shared/ToggleButton';
import { pathPage, pathsBooking, pathsService } from '@/constants';
import { useIbeTranslation } from '@/hooks';
import MainLayout from '@/layouts/MainLayout';
import { CheckIcon, FilterIcon } from '@/library';
import { ServiceService } from '@/service/ratePlanService';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setSearchValue } from '@/store/slice/bundleSearchSlice';
import { deleteAddonsService, setAddonsService } from '@/store/slice/invoceSlice';
import { ThemeType } from '@/store/slice/themeSlice';
import { AddonServiceType, ServiceTagsType } from '@/types/addonsType/addonCardType';
import { SearchValueType } from '@/types/bundle/bundleSearch';
import { AddonsSliceType, ServiceAddonsType } from '@/types/invoceSliceType/invoceSliceType';
import { NextSheetWidthLayout } from '@/types/layoutType';
import { calculateTotalGuest } from '@/util/bundle';
import calculator from '@/util/calculator';
import getImagePath from '@/util/getImagePath';
import { querySearchParams, searchParamsFc } from '@/util/searchParams';
import { addItems } from '@/util/service';
import { useLocale } from '@m0-0a/next-intl';
import { Drawer, Spin, Typography } from 'antd';
import clsx from 'clsx';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import useSWR from 'swr';

const AddonsPage: NextSheetWidthLayout = () => {
  const { ref: bottomRef, inView: myElementIsVisible } = useInView();
  const [fixed, setFixed] = useState(false);
  const searchParams = useSearchParams();

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const { searchValue } = useAppSelector((state) => state.bundleSlice);
  const { selected } = useAppSelector((state) => state.themeSlice);
  const { bundlePrice, serviceAddons } = useAppSelector((state) => state.invoiceSlice);
  const { detail, bundles, services } = useAppSelector((state) => state.offerSlice);

  const [itemsService, setItemService] = useState<AddonServiceType[] | undefined>(undefined);
  const [totalCalc, setTotalCalc] = useState<number>(0);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isBookingOffer = router?.asPath?.includes(pathPage.offer);
  const { offerId } = router.query;
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

  const arrivalParams = searchParams.get('arrival');
  const departureParams = searchParams.get('departure');
  const roomsParams = searchParams.get('rooms');
  const adultsParams = searchParams.get('adults');
  const childrenAgeBelowParams = searchParams.get('childrenAgeBelow');
  const countryCodeParams = searchParams.get('countryCode');
  const propertyIdParams = searchParams.get('propertyId');
  const childrenParams = searchParams.get('children');
  const bundleIdParams = searchParams.get('bundleId');

  const { locale } = useLocale();
  const step2 = useIbeTranslation('bookingSteps.step2');
  const nextStepText = useIbeTranslation('general.invoice.buttonText');
  const { propertyId } = router.query;

  const { data: serviceTags } = useSWR(
    `${pathsService.GET_ALL_TAG}?type=services&propertyId=${router.query.propertyId}?status=true`,
    {
      dedupingInterval: 60 * 60 * 1000,
      revalidateOnFocus: false,
    }
  );
  const tags: any[] = serviceTags?.data?.data && serviceTags?.data.data[0]?.data?.map((ele: ServiceTagsType) => {
    return {
      name: ele.name,
      slug: ele.tagId,
    };
  });

  useEffect(() => {
    window.addEventListener('scroll', () =>
      window.scrollY > 100 ? setFixed(true) : setFixed(false)
    );
  }, []);

  useEffect(() => {
    if (bundlePrice && arrivalParams && departureParams && roomsParams) {
      const total = calculator.calcTotalPrice(
        bundlePrice.priceUpgrade,
        Number(roomsParams),
        Number(arrivalParams),
        Number(departureParams),
        serviceAddons.addons
      );
      total && setTotalCalc(total);
    }
  }, [serviceAddons.addons, arrivalParams, bundlePrice, departureParams, roomsParams]);

  useEffect(() => {
    if (propertyId && selectedTags?.length <= 0) {
      fetchAddonService(propertyId?.toString());
    } else if (propertyId && selectedTags?.length > 0) {
      fetchAddonService(propertyId.toString(), selectedTags);
    }
  }, [propertyId, selectedTags, router.pathname]);

  useEffect(() => {
    if (searchParams) {
      const params = searchParamsFc(searchParams);
      dispatch(
        setSearchValue({
          ...searchValue,
          ...params,
          maxRooms: DEFAULT_MAX_ROOM,
          maxPersons: DEFAULT_MAX,
        })
      );
    }
  }, [searchParams]);

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

  const fetchAddonService = async (params: string, tags?: string[]) => {
    try {
      const res = await ServiceService.getService({
        propertyId: params,
        tagIds: tags?.toString(),
        disabled: false,
        perPage: 100,
      });
      if (res?.data?.length && res.data[0]?.data.length) {
        let includedService: any;
        if (isBookingOffer) {
          includedService = (serviceIncluded?.length &&
            serviceIncluded.map(
              (ele: any): ServiceAddonsType => ({
                serviceId: ele?.serviceId,
                price: ele?.overwritePrice,
                serviceName: ele?.name,
                extendedData: {
                  title: ele?.extendedData?.title,
                  name: ele?.extendedData?.name,
                  description: ele?.extendedData?.description,
                },
                mode: ele?.mode,
                count: ele?.count,
              })
            )) ||
            []
        } else {
          includedService = serviceAddons.baseService;
        }
        const dataSort = res.data[0].data.filter(
          (item: AddonServiceType) =>
            !includedService.some((service: any) => service.serviceId === item.extId)
        );
        setItemService(dataSort);
      }
    } catch (err) { }
  };

  /** choose service and dispatch to redux */
  const handleChooseService = (addon: AddonServiceType) => {
    if (searchValue) {
      const data: AddonsSliceType = {
        serviceName: addon.name,
        serviceId: addon.extId,
        price: addon.price,
        mode: addon.mode,
        extendedData: {
          title: addon?.extendedData?.title,
          name: addon?.extendedData?.name,
          description: addon?.extendedData?.description,
        },
        count: adultsParams
          ? Number(adultsParams) + Number(childrenParams || 0)
          : searchValue?.adults + Number(searchValue?.children || 0),
        maxCount: adultsParams
          ? Number(adultsParams) + Number(childrenParams)
          : searchValue?.adults + Number(searchValue?.children || 0),
      };
      dispatch(setAddonsService(data));
    }
  };

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
      return searchValue ? (
        <BookingInvoice
          className="bg-primary-switch"
          id="test_id"
          header="Your Booking"
          arrival={searchValue && searchValue.arrival}
          departure={searchValue && searchValue.departure}
          rooms={bundlePrice && `${bundlePrice.bundlePriceName} @ ${searchValue.rooms}`}
          adults={searchValue.adults}
          child={searchValue.children}
          addonsBase={serviceAddons.baseService}
          addons={serviceAddons.addons}
          total={totalCalc.toString()}
          buttonText={nextStepText}
          onClear={(e) => {
            const serviceStore = serviceAddons.addons.find((ele: any) => ele.serviceId === e);
            if (serviceStore) {
              dispatch(deleteAddonsService(serviceStore.serviceId));
            }
          }}
          onClick={() => {
            const queryParams = querySearchParams({
              countryCode: countryCodeParams || '',
              propertyId: propertyIdParams || '',
              arrival: arrivalParams ? Number(arrivalParams) : undefined,
              departure: departureParams ? Number(departureParams) : undefined,
              rooms: roomsParams ? Number(roomsParams) : 1,
              adults: adultsParams ? Number(adultsParams) : 1,
              children: childrenParams ? Number(childrenParams) : 0,
              childrenAgeBelow: childrenAgeBelowParams?.toString() ?? undefined,
              bundleId: bundleIdParams?.toString(),
            });
            router.push({
              pathname: pathsBooking.CREATE_BOOKING,
              query: queryParams,
            });
            onClose;
          }}
        />
      ) : null
    }
  }, [router.asPath, totalCalc]);

  return (
    <div className="bg-secondary-switch">
      <BookingStep activeStep={2} />
      <Spin spinning={!serviceTags?.data?.data || !itemsService}>
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
            {invoice}
          </Drawer>

          {/* End filter mobile */}

          <div className="flex flex-row justify-start items-center mb-4">
            <Image
              src={require('../../../../public/icons/bed.svg')}
              height={44}
              width={44}
              alt="bed icon"
            />
            <div className="font-[Lora] text-[24px] leading-8 ml-2">{step2?.chooseYourAddons}</div>
          </div>

          {/* filter section */}
          <div className="flex flex-row justify-start mb-6">
            <div
              className="cursor-pointer mr-4"
              onClick={() => {
                setSelectedTags([]);
              }}
            >
              <ToggleButton
                theme={selected === ThemeType.dark ? 'dark' : 'light'}
                text={step2?.all}
                toggled={selectedTags?.length <= 0}
              />
            </div>
            {/* {tags?.map((tag: any, index: number) => (
              <div
                key={`tag-${index}`}
                className="cursor-pointer mr-4"
                onClick={() => {
                  const find = selectedTags.find((ele) => ele === tag.slug);
                  if (find) {
                    setSelectedTags([]);
                    const filterData = selectedTags?.filter((e) => e !== tag.slug);
                    setSelectedTags(filterData);
                  } else {
                    setSelectedTags((pre) => [...pre, tag.slug]);
                  }
                }}
              >
                <ToggleButton
                  theme="light"
                  text={tag?.name}
                  toggled={selectedTags.some((ele) => ele === tag.slug)}
                />
              </div>
            ))} */}
          </div>
          {/* cards section */}
          <div className="grid xl:grid-cols-4 gap-6">
            <div
              className={clsx(
                'col-span-3',
                itemsService && itemsService?.length < 3 ? 'h-[800px]' : ''
              )}
            >
              <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
                {itemsService && itemsService?.length <= 0 && (
                  <div className="h-[800px]">
                    <Typography.Title level={5}>{step2?.noServices}</Typography.Title>
                  </div>
                )}

                {itemsService &&
                  itemsService?.length > 0 &&
                  itemsService?.map((addon: AddonServiceType, index: number) => (
                    <AddonCard
                      key={`card-${index}`}
                      image={addon?.media ? getImagePath(addon?.media[0]) : ''}
                      title={
                        addon?.extendedData?.name && addon?.extendedData?.name?.[locale]
                          ? addon?.extendedData?.name?.[locale]
                          : addon?.extendedData?.name?.en || ''
                      }
                      content={
                        addon?.extendedData?.description &&
                          addon?.extendedData?.description?.[locale]
                          ? addon?.extendedData?.description?.[locale]
                          : addon?.extendedData?.description?.en || addon?.description
                      }
                      isHot={addon?.popular}
                      price={addon.price}
                      serviceId={addon.extId}
                      maxCount={
                        serviceAddons.addons?.find((ele) => ele.serviceId === addon.extId)?.maxCount
                      }
                      quantity={
                        serviceAddons.addons?.find((ele) => ele.serviceId === addon.extId)?.count
                      }
                      isSelected={serviceAddons.addons?.some(
                        (ele) => ele.serviceId === addon.extId
                      )}
                      onClick={() => handleChooseService(addon)}
                    />
                  ))}
              </div>
            </div>

            <div className="col-span-1 hidden xl:block">
              <div
                className={clsx(
                  'transition-all ease-in-out duration-500 w-[258px]',
                  fixed ? 'fixed bottom-0 w-[258px]' : '',
                  myElementIsVisible ? '!absolute !bottom-12' : ''
                )}
              >
                {invoice}
              </div>
            </div>
            {/* total saved addons cost */}
            <div className="col-span-3 p-4 bg-primary-switch flex flex-row items-center justify-end mt-6 rounded-md ">
              <CheckIcon className="text-PrimaryBlue" />
              <div className=" ml-2 mr-1 font-[14px] leading-5">{step2?.youSaved}:</div>
              <div className="text-right leading">
                <Currentcy
                  leading="leading-5"
                  fontSize="text-base"
                  color="text-PrimaryBlue"
                  price={0}
                />
              </div>
            </div>
          </div>
        </Wrapper>
      </Spin>
      <div ref={bottomRef}></div>
    </div>
  );
};

AddonsPage.Layout = MainLayout;

export default AddonsPage;
