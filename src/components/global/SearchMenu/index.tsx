/* eslint-disable react-hooks/exhaustive-deps */
import DatePickerSelect from '@/components/Booking/partials/DatePickerSelected/DatePickerSelect';
import Locations from '@/components/Booking/partials/Locations/Locations';
import SearchButton from '@/components/Booking/partials/SearchButton/SearchButton';
import SelectGuestDropdown, {
  DEFAULT_MAX,
  DEFAULT_MAX_ROOM,
} from '@/components/Booking/partials/SelectGuestDropdown';
import { pathPage, pathsBooking } from '@/constants';
import { defaultParamsSearch } from '@/constants/bundleConst';
import { useIbeTranslation } from '@/hooks';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { resetBookingSlice } from '@/store/slice/bookingSlice';
import {
  addChildrendAge,
  setNearbyCalendarDate,
  setNearbyGuest,
  setSearchValue,
} from '@/store/slice/bundleSearchSlice';
import { setOpenCalendar, setOpenGuest, setOpenLocation } from '@/store/slice/commonSlice';
import { resetFoliosSlice } from '@/store/slice/foliosSlice';
import { resetInvoiceSlice } from '@/store/slice/invoceSlice';
import { resetPaidSlice } from '@/store/slice/paidSlice';
import { SearchValueType } from '@/types/bundle/bundleSearch';
import { GuestRoomsType, LocationSearchType } from '@/types/calendarType/calendar';
import { deepEqual } from '@/util/object';
import { isNull, querySearchParams, searchParamsFc } from '@/util/searchParams';
import clsx from 'clsx';
import dayjs, { Dayjs } from 'dayjs';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface Props {
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchMenu = ({ setOpen }: Props) => {
  const [fixed, setFixed] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { searchValue } = useAppSelector((state) => state.bundleSlice);
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState<SearchValueType>({
    ...defaultParamsSearch,
    countryCode: '',
    propertyId: '',
    arrival: 0,
    departure: 0,
    childrenAgeBelow: [],
  });

  const searchMenu = useIbeTranslation('searchMenu');

  const isHotelPage = router.asPath.includes(`/${pathPage.hotel}/`);
  const isHomePage = router.asPath === pathPage.home || /^(\/#(?!contact\/#|account\/#|booking-history\/#))/i.test(router.asPath); ;
  const isTopicPage = router.asPath.includes(`/${pathPage.topic}/`);

  let scrollDown: number;
  if (isHotelPage || isHomePage || isTopicPage) {
    scrollDown = 750;
  } else {
    scrollDown = 0;
  }

  // FUNCTION
  const handleChooseLocation = (value: LocationSearchType) => {
    setSearch({
      ...search,
      countryCode: value.countryCode || isNull,
      propertyId: value.propertyId || isNull,
    });
    if (
      router?.pathname !== pathPage.home &&
      router?.pathname !== `/${pathPage.hotel}/${pathPage.hotelId}` &&
      router?.pathname !== `/${pathPage.topic}/${pathPage.slug}/${pathPage.hotelId}`
    )
      handleSearch({
        ...search,
        countryCode: value.countryCode || isNull,
        propertyId: value.propertyId || isNull,
      });
  };
  const getGuestVal = (guestValue: GuestRoomsType) => {
    const searchData: GuestRoomsType = {
      room: search.rooms,
      adult: search.adults,
      children: search.children,
      childrenAgeBelow: search.childrenAgeBelow,
    };
    if (!deepEqual(searchData, guestValue)) {
      setSearch({
        ...search,
        rooms: guestValue.room,
        adults: guestValue.adult,
        children: guestValue.children,
        childrenAgeBelow: guestValue.childrenAgeBelow,
      });
      if (
        router?.pathname !== pathPage.home &&
        router?.pathname !== `/${pathPage.hotel}/${pathPage.hotelId}` &&
        router?.pathname !== `/${pathPage.topic}/${pathPage.slug}/${pathPage.hotelId}`
      )
        handleSearch({
          ...search,
          rooms: guestValue.room,
          adults: guestValue.adult,
          children: guestValue.children,
          childrenAgeBelow: guestValue.childrenAgeBelow,
        });

      dispatch(
        setNearbyGuest({
          rooms: guestValue.room ?? 1,
          adults: guestValue.adult ?? 1,
          children: guestValue.children ?? 0,
          childrenAge: guestValue.childrenAgeBelow?.toString() ?? undefined,
        })
      );
    }
  };

  const handleSelectedDate = (value: Dayjs[]) => {
    const startDate = value && value?.length && value[0] ? value[0].unix() + 60 * 60 : undefined; // get current time a make it in feauture time;
    const endDate =
      value && value?.length && value[1]
        ? dayjs(value[1])
          .endOf('day')
          .unix()
        : undefined;

    setSearch({ ...search, arrival: startDate, departure: endDate });
    if (
      router?.pathname !== pathPage.home &&
      router?.pathname !== `/${pathPage.hotel}/${pathPage.hotelId}` &&
      router?.pathname !== `/${pathPage.topic}/${pathPage.slug}/${pathPage.hotelId}`
    )
      handleSearch({ ...search, arrival: startDate, departure: endDate });
    if (startDate && endDate) {
      dispatch(setNearbyCalendarDate({ arrival: startDate, departure: endDate }));
      // dispatch(setOpenGuest(true));
    }
  };
  const handleSearch = (searchData = search) => {
    let queryParams: any = {
      adults: searchData.adults,
      rooms: searchData.rooms,
      children: searchData.children,
    };
    let newActivities = []
    if (searchValue?.mainActivity) newActivities.push(searchValue.mainActivity)
    if (searchData?.propertyId !== isNull && searchValue?.propertyId) queryParams.propertyId = searchValue.propertyId;
    if (searchData?.countryCode !== isNull && searchValue?.countryCode) queryParams.countryCode = searchValue.countryCode;

    if (searchData?.countryCode) queryParams.countryCode = searchData.countryCode;
    if (searchData?.propertyId) queryParams.propertyId = searchData.propertyId;
    if (searchData?.arrival) queryParams.arrival = searchData.arrival;
    if (searchData?.departure) queryParams.departure = searchData.departure;
    if (searchData?.childrenAgeBelow && searchData.childrenAgeBelow?.length) queryParams.childrenAgeBelow = searchData.childrenAgeBelow.toString();
    if (searchData?.activities && searchData.activities?.length) newActivities = [...newActivities, ...searchData.activities]
    if (newActivities?.length) queryParams.activities = newActivities.toString();
    if (searchData?.landscape) queryParams.landscape = searchData.landscape.toString();
    if (searchData?.specialBundle) queryParams.specialBundle = searchData.specialBundle.toString();
    if (searchData?.unitGroupId) queryParams.unitGroupId = searchData.unitGroupId;

    if (router?.pathname === pathsBooking.BUNDLE_DETAIL) {
      dispatch(
        setSearchValue({
          ...searchValue,
          ...queryParams,
        })
      );
      router.replace({
        pathname: `/${pathPage.result}/${router?.query?.bundleId}`,
        query: queryParams,
      });
    } else {
      dispatch(
        setSearchValue({
          ...searchValue,
          ...queryParams,
          maxPersons: DEFAULT_MAX,
          maxRooms: DEFAULT_MAX_ROOM,
        })
      );
      router.push(`/${pathPage.result}/all?${querySearchParams(queryParams)}`);
    }

    dispatch(addChildrendAge(queryParams?.childrenAgeBelow || ''));

    //clear store
    dispatch(setOpenLocation(false));
    dispatch(setOpenCalendar(false));
    dispatch(setOpenGuest(false));
    dispatch(resetInvoiceSlice());
    dispatch(resetPaidSlice());
    dispatch(resetFoliosSlice());
    dispatch(resetBookingSlice());
  };

  // LIFE
  useEffect(() => {
    window.addEventListener('scroll', () =>
      window.scrollY > scrollDown ? setFixed(true) : setFixed(false)
    );
  }, [router.asPath]);

  useEffect(() => {
    const params = searchParamsFc(searchParams);
    let newParams = {
      maxPersons: DEFAULT_MAX,
      maxRooms: DEFAULT_MAX_ROOM,
      propertyId: params?.propertyId || searchValue?.propertyId,
      countryCode: params?.countryCode || searchValue?.countryCode
    };
    setSearch(params);

    if (router?.pathname === pathsBooking.BUNDLE_DETAIL) {
      newParams = {
        ...newParams,
        maxPersons: searchValue?.maxPersons || DEFAULT_MAX,
        maxRooms: searchValue?.maxRooms || DEFAULT_MAX_ROOM,
      };
    }

    if (router.pathname === pathPage.home) {
      dispatch(setOpenCalendar(false));
      dispatch(setSearchValue({
        ...searchValue, ...params,
        maxPersons: DEFAULT_MAX,
        maxRooms: DEFAULT_MAX_ROOM,
      }));
    } else {
      dispatch(setSearchValue({ ...searchValue, ...params, ...newParams }));
    }

  }, [router.query]);

  // useEffect(() => {
  //   if (
  //     Object.values(pathsBooking).includes(router.pathname) &&
  //     router.pathname !== pathsBooking.BUNDLE_DETAIL &&
  //     router.pathname !== pathsBooking.OFFER_DETAIL
  //   ) {
  //     const params = searchParamsFc(searchParams);
  //     if ((!bundlePrice?.bundleId ||
  //       (bundlePrice?.bundleId && bundlePrice?.bundleId !== searchParams?.get('bundleId')))
  //     ) {
  //       if (router.pathname !== pathsBooking.THANKYOU) {
  //         if (searchParams?.get('bundleId')) {
  //           router.push({
  //             pathname: `/${pathPage.result}/${params.bundleId}`,
  //             query: querySearchParams(params),
  //           })
  //         } else if (searchParams?.get('offerId')) {
  //           router.push({
  //             pathname: `/${pathPage.booking}/${pathPage.offer}/${params.offerId}`,
  //           });
  //         }

  //       }
  //     }
  //     if (
  //       (router.pathname === pathsBooking.THANKYOU && !reservationPayload?.bookingId) ||
  //       !bundlePrice?.bundleId
  //     ) {
  //       router.push({
  //         pathname: `/${pathPage.result}/all`,
  //         query: querySearchParams(params),
  //       });
  //     }
  //   }
  // }, [router.pathname, searchParams]);

  return (
    <div
      className={clsx(
        'duration-500 ease-in-out z-40 bg-primary-switch lg:bottom-12  lg:h-fit w-full lg:w-fit',
        isHotelPage ? 'hotelPageSearchWrapper' : 'homePageSearchWrapper',
        !isHomePage &&
        !isHotelPage &&
        !isTopicPage &&
        'fixedSearch lg:!fixed !rounded-none !bottom-[unset] mx-auto top-20',
        fixed
          ? '!top-0 fixedSearch lg:!fixed !rounded-none !bottom-[unset] mx-auto duration-500 ease-in-out'
          : ''
      )}
    >
      <div
        className={clsx(
          'duration-500 ease-in-out flex lg:flex-row flex-col px-4 gap-4 place-items-start',
          isHotelPage || isTopicPage
            ? 'hotelPageSearchContent lg:w-[1000px]'
            : 'homePageSearchContent xl:w-[1200px]',
          fixed && 'mx-auto !justify-between',
          (fixed || (!isHomePage && !isHotelPage && !isTopicPage)) &&
          '!justify-between mx-auto !px-0'
        )}
      >
        {!isHotelPage && !isTopicPage && (
          <div className="flex flex-col justify-around">
            <p className="text-secondary-switch pb-4">{searchMenu?.location?.title}</p>
            <div className="i shadow-b">
              <Locations onClick={(searchValue?.offerId || router?.pathname === pathsBooking.BUNDLE_DETAIL) ? undefined : handleChooseLocation} />
            </div>
          </div>
        )}
        <div className="flex flex-col justify-around">
          <p className="text-secondary-switch pb-4">{searchMenu?.calendar?.title}</p>
          <DatePickerSelect
            contentStrapi={searchMenu?.calendar?.title}
            onClick={searchValue?.offerId ? undefined : handleSelectedDate}
          />
        </div>
        <div className="flex flex-col justify-around">
          <p className="text-secondary-switch pb-4">{searchMenu?.guestAndRoom?.title}</p>

          <SelectGuestDropdown
            contentStrappi={searchMenu?.guestAndRoom?.title}
            onClick={searchValue?.offerId ? undefined : getGuestVal}
            isBookingOffer={router?.asPath?.includes(pathPage.offer)}
          />
        </div>
        <SearchButton
          onClick={searchValue?.offerId ? undefined : () => {
            handleSearch();
            setOpen && setOpen(false);
          }}
        />
      </div>
    </div>
  );
};

export default SearchMenu;
