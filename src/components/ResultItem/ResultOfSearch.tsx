/* eslint-disable react-hooks/exhaustive-deps */
import { Wrapper } from '@/components';
import ScrollToTop from '@/components/global/ScrollTop';
import { pathPage } from '@/constants';
import { defaultParamsSearch } from '@/constants/bundleConst';
import { useIbeTranslation } from '@/hooks';
import { FilterIcon } from '@/library';
import { BundleService } from '@/service/bundleService';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setBundleLoading } from '@/store/slice/statusSlice';
import { SearchValueType } from '@/types/bundle/bundleSearch';
import { BundleType } from '@/types/bundle/bundleType';
import { isSpecialDays, timeInPeriodsDefault } from '@/util/bundle';
import { querySearchParams, searchParamsFc } from '@/util/searchParams';
import { Drawer, Spin, Typography } from 'antd';
import clsx from 'clsx';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ButtonShare from '../global/ButtonShare';
import FilterBar from './partials/FilterBar';

const BundleCard = dynamic(() => import('@/components/ResultItem/partials/BundleCard'));
const LoadingItem = dynamic(() => import('@/components/global/LoadingItem/LoadingItem'));

const RESULT_DATA = {
  person: 'person',
  filter: 'filter',
  all: 'all',
  nearby: 'nearby',
  bundle: 'bundle',
};

const ReasultOfSearch = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  /** store */
  const { isBundleLoading } = useAppSelector((state) => state.statusSlice);
  const { bundleList, appFilter } = useAppSelector((state) => state.commonSlice);
  const dispatch = useAppDispatch();
  /** initial state */
  const [items, setItems] = useState<BundleType[]>([]);
  const [newFilterItems, setNewFilterItems] = useState<BundleType[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [searchData, setSearchData] = useState<SearchValueType>({
    ...defaultParamsSearch,
    countryCode: '',
    propertyId: '',
    childrenAgeBelow: [],
  });
  const [attributeSearch, setAttributeSearch] = useState<{
    [key: string]: boolean;
  }>({
    isNearby: false,
    personsExceed: false,
  });

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

  // translate
  const resultPage = useIbeTranslation('resultPage');
  const generalButton = useIbeTranslation('general.button');
  const bookingSteps = useIbeTranslation('bookingSteps.step0');

  //search params
  const countryCodeParam = searchParams.get('countryCode');
  const propertyIdParam = searchParams.get('propertyId');
  const activitiesParam = searchParams.get('activities');
  const adultsParam = searchParams.get('adults');
  const roomsParam = searchParams.get('rooms');
  const childrenParam = searchParams.get('children');
  const arrivalParam = searchParams.get('arrival');
  const departureParam = searchParams.get('departure');
  const landscapeParam = searchParams.get('landscape');
  const specialBundleParam = searchParams.get('specialBundle');
  const childrenAgeBelowParam = searchParams.get('childrenAgeBelow');
  const unitGroupIdParam = searchParams.get('unitGroupId');

  // change router
  const handleChangeLocation = (
    {
      countryCode = countryCodeParam || searchData.countryCode,
      propertyId = propertyIdParam || searchData.propertyId,
      arrival = arrivalParam ? Number(arrivalParam) : undefined,
      departure = departureParam ? Number(departureParam) : undefined,
      adults = adultsParam ? Number(adultsParam) : searchData.adults || 1,
      rooms = roomsParam ? Number(roomsParam) : searchData.rooms || 1,
      children = childrenParam ? Number(childrenParam) : searchData.children,
      childrenAgeBelow = childrenAgeBelowParam
        ? childrenAgeBelowParam.split(',')
        : searchData.childrenAgeBelow,
      landscape = landscapeParam || searchData.landscape,
      activities = activitiesParam ? activitiesParam.split(',') : searchData.activities,
      specialBundle = specialBundleParam || searchData.specialBundle,
      unitGroupId = unitGroupIdParam || searchData.unitGroupId
    }: SearchValueType,
    isRefreshLink?: boolean
  ) => {
    const query: SearchValueType = {
      adults,
      rooms,
      children,
      childrenAgeBelow,
    };

    if (countryCode) query.countryCode = countryCode;
    if (propertyId) query.propertyId = propertyId;
    if (departure) query.departure = departure;
    if (arrival) query.arrival = arrival;
    if (unitGroupId) query.unitGroupId = unitGroupId;
    if (landscape) query.landscape = landscape;
    if (activities && activities?.length) query.activities = activities
    if (specialBundle) query.specialBundle = specialBundle

    if (isRefreshLink) {
      router.replace(`/${pathPage.result}/all?${querySearchParams(query)}`);
    }
    setSearchData(query);
  };

  /** func get all bundle by data search */
  const fetchAllResult = async (dataSearch: SearchValueType, controller?: AbortController) => {
    dispatch(setBundleLoading(true));
    try {
      const res = await BundleService.searchBundles(dataSearch, { signal: controller?.signal });
      if (res?.data?.length) {
        setItems(res.data[0].data);
        setNewFilterItems(res.data[0].data);
        setAttributeSearch({
          isNearby: res.data[0]?.isNearby,
          personsExceed: res.data[0]?.personsExceed,
        });
        setMaxPrice(0);
        dispatch(setBundleLoading(false));
      } else {
        setAttributeSearch({
          isNearby: true,
          personsExceed: true,
        });
        dispatch(setBundleLoading(false));
      }
    } catch (err) {
      dispatch(setBundleLoading(false));
    } finally {
      dispatch(setBundleLoading(false));
    }
  };

  /** effect watching router params a get use search params hook to set inital search value **/
  useEffect(() => {
    if (Object.values(router.query).length) {
      const params = searchParamsFc(searchParams, router.query as any);
      handleChangeLocation(params, false);
    } else if (router.pathname === `/${pathPage.result}`) {
      handleChangeLocation(defaultParamsSearch, false);
    }
  }, [router.query]);

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        const params = await searchParamsFc(searchParams, router.query as any);
        fetchAllResult(
          { ...params, timezone: Intl.DateTimeFormat().resolvedOptions().timeZone },
          controller
        );
      } catch (err) { }
    })();

    return () => {
      controller.abort();
    };
  }, [
    countryCodeParam,
    propertyIdParam,
    activitiesParam,
    adultsParam,
    roomsParam,
    childrenParam,
    arrivalParam,
    departureParam,
    landscapeParam,
    childrenAgeBelowParam,
    unitGroupIdParam,
    specialBundleParam
  ]);


  // UI
  const renderTextNodata = (type: string) => {
    switch (type) {
      case RESULT_DATA.all:
        return (
          <div className="pb-4 border-b border-solid border-LightGrey border-t-0 border-r-0 border-l-0 mb-4">
            <Typography.Title className="font-[lora] !mb-0 !font-medium" level={4}>
              {resultPage?.allBundles}
            </Typography.Title>
          </div>
        );
      case RESULT_DATA.filter:
        return (
          <div className="lg:px-20 px-4 lg:py-10 py-2 items-center justify-between gap-5">
            <p className="font-normal text-center">{resultPage?.noFilterMatched}</p>
          </div>
        );
      case RESULT_DATA.nearby:
        return (
          <div className="pb-4 border-b border-solid border-LightGrey border-t-0 border-r-0 border-l-0 mb-4">
            <p>{`${bookingSteps?.noResult}`}</p>
          </div>
        );
      case RESULT_DATA.bundle:
        return (
          <div className="lg:px-20 px-4 lg:py-10 py-2 items-center justify-between gap-5">
            <p className="font-normal text-center">{`${resultPage?.noResultMatched}`}</p>
          </div>
        );
      case RESULT_DATA.person:
        return (
          <div className="lg:px-20 px-4 lg:py-10 py-2 items-center justify-between gap-5">
            <p className="font-normal text-center">{resultPage?.noPeopleAndContact}</p>
            <div className="flex justify-center gap-6 py-2">
              <ButtonShare
                content={generalButton?.contact || 'Contact us'}
                style="outline"
                size="medium"
                onClick={() => router.push(`/${pathPage.contact}`)}
              />
            </div>
          </div>
        );
      default:
        return '';
    }
  };

  const renderContent = (newBundleList: BundleType[], newIsNearby?: Boolean, isAll?: Boolean) => {
    return (
      <div className="mb-5">
        <>
          {!isAll
            ? renderTextNodata(
              items?.length && !newFilterItems?.length && maxPrice > 0
                ? RESULT_DATA.bundle
                : newIsNearby
                  ? RESULT_DATA.nearby
                  : ''
            )
            : ''}
          {renderTextNodata(isAll ? RESULT_DATA.all : '')}
        </>
        <div className="grid xl:grid-cols-2 grid-cols-1 gap-6">
          {newBundleList?.map((ele: BundleType, index: number) => {
            const defaultTime = timeInPeriodsDefault(
              ele?.periods,
              ele?.minimumStay || 1,
              isSpecialDays(ele?.daysOfWeek)
            );
            return (
              <div key={index}>
                <BundleCard
                  key={index}
                  filterActivity={appFilter?.activities}
                  data={ele}
                  paramsSearch={
                    !isAll && searchData.arrival && searchData.departure && searchData.rooms
                      ? searchData
                      : {
                        countryCode: ele?.property?.location?.countryCode,
                        propertyId: ele.property.extId,
                        adults: isAll ? 1 : searchData.adults || 1,
                        rooms: isAll ? 1 : searchData.rooms || 1,
                        children: isAll ? 0 : searchData.children || 0,
                        childrenAgeBelow: isAll ? [] : searchData.childrenAgeBelow || [],
                        arrival: defaultTime?.start || undefined,
                        departure: defaultTime?.end || undefined,
                      }
                  }
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <section className="bg-secondary-switch">
      <Wrapper>
        <Spin spinning={isBundleLoading}>
          <ScrollToTop />
          <div className="w-full pt-11"></div>
          {/* filter mobile */}
          <div
            className="lg:hidden fixed top-36 left-0 z-40 bg-primary-switch w-fit p-4 rounded-md flex"
            onClick={() => setOpen(!open)}
          >
            <FilterIcon />
          </div>
          <Drawer title placement={'left'} onClose={onClose} open={open}>
            <FilterBar dataList={items} price={{
              maxPrice,
              setMaxPrice,
              setNewFilterItems,
            }} drawer={{
              open, setOpen
            }} search={{
              handleChangeLocation, searchData
            }} />
          </Drawer>
          <div
            className={clsx(
              'lg:hidden absolute left-0 overflow-hidden w-full duration-500 rounded-md',
              open ? 'h-full visible bg-primary-switch top-0 z-30' : 'h-0 invisible'
            )}
          ></div>
          {/* end filter mobile */}
          <div className="grid lg:grid-cols-3 grid-cols-1 gap-6">
            <div className="lg:col-span-1 pr-6 hidden lg:block">
              <FilterBar dataList={items} price={{
                maxPrice,
                setMaxPrice,
                setNewFilterItems,
              }} search={{
                handleChangeLocation, searchData
              }} />
            </div>

            <div className="col-span-1 lg:col-span-2">
              {isBundleLoading &&
                (!items || !items?.length) &&
                (!bundleList || !bundleList?.length) ? (
                <div className="grid xl:grid-cols-2 grid-cols-1 gap-6">
                  <LoadingItem className="w-full" />
                  <LoadingItem />
                  <LoadingItem />
                  <LoadingItem />
                </div>
              ) : items?.length ? (
                renderContent(newFilterItems || items, attributeSearch?.isNearby)
              ) : attributeSearch?.personsExceed ? (
                renderTextNodata(RESULT_DATA.person)
              ) : (searchData?.activities && searchData.activities?.length) || searchData.landscape ? (
                renderTextNodata(RESULT_DATA.filter)
              ) : searchData?.arrival && searchData?.departure && searchData?.countryCode ? (
                renderTextNodata(RESULT_DATA.bundle)
              ) : (
                ''
              )}
              {bundleList?.length ? renderContent(bundleList, true, true) : ''}
            </div>
          </div>
        </Spin>
      </Wrapper>
    </section>
  );
};

export default ReasultOfSearch;
