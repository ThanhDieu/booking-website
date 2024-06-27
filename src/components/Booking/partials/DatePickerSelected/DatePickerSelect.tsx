/* eslint-disable react-hooks/exhaustive-deps */
import { defaultDaysOfWeek } from '@/constants/bundleConst';
import { currencyType } from '@/constants/paymentConst';
import statusCode from '@/constants/statusCode';
import { useDefaultSearch, useIbeTranslation } from '@/hooks';
import { STATE_TYPE } from '@/hooks/useDefaultSearch';
import { RateService } from '@/service/ratePlanService';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setOpenCalendar, setOpenGuest } from '@/store/slice/commonSlice';
import { periodType } from '@/types/bundle/bundleType';
import { ClientDateType } from '@/types/calendarType/calendar';
import { CalendarStrapiType } from '@/types/homePage';
import { isSpecialDays } from '@/util/bundle';
import { Button, DatePicker, Space } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import moment from 'moment';
import { useRouter } from 'next/router';
import { CellRenderInfo } from 'rc-picker/lib/interface';
import { useEffect, useMemo, useRef, useState } from 'react';
import DateFooter from './DateFooter';
import DateRender from './DateRender';
import { pathsBooking } from '@/constants';

const ONE_THOUSAND = 1000;

const { RangePicker } = DatePicker;
export interface DatePickerSelectProps {
  onClick?: (value: any) => void;
  contentStrapi?: CalendarStrapiType;
}
const DatePickerSelect = ({ onClick, contentStrapi }: DatePickerSelectProps) => {
  const dispatch = useAppDispatch();
  const rangePickerRef = useRef(null);
  const router = useRouter();
  const { isOpenCalendar } = useAppSelector((state) => state.commonSlice);
  const { searchValue } = useAppSelector((state) => state.bundleSlice);
  const { stateData: defaultValue, handleChange: setDefaultValue } = useDefaultSearch(
    undefined,
    STATE_TYPE.Date
  );

  const [timeDefault, setTimeDefault] = useState(0);
  const [dateOnlyClick, setDateOnlyClick] = useState<any>();
  const [showPrice, setShowPrice] = useState<boolean>(true);
  const [fromDate, setFromDate] = useState<number>(moment(new Date()).unix());
  const [dateData, setDateData] = useState<ClientDateType[]>([]);

  useEffect(() => {
    handleFetchCalendar();
  }, [fromDate]);

  /** format hours effect */
  useMemo(() => {
    if (dateData && dateData.length && dateData[0]?.date) {
      const time = moment.unix(dateData[0]?.date).get('hours');
      setTimeDefault(time);
    }
  }, [dateData]);

  /** handle fetch price of calendar from back end */

  // TODO
  const handleFetchCalendar = async () => {
    try {
      const params = {
        fromDate: Number(fromDate - 84600),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      };
      const res = await RateService.getRateCalendar(params);
      if (res.code === statusCode.SUCCESS) {
        setDateData(res.data);
      }
    } catch (err) { }
  };

  const handleShowPrice = (checked: boolean) => {
    setShowPrice(checked);
  };

  const handleRangeChange = (dates: any) => {
    handleBlur();

    dispatch(setOpenCalendar(!isOpenCalendar));
    onClick && onClick(dates);
  };

  const handleScroll = () => {
    dispatch(setOpenCalendar(false));
  };

  const handleBlur = () => {
    if (rangePickerRef?.current) {
      (rangePickerRef.current as any).blur();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  /** render date and pass params */
  const currentDate = (currentDate: Dayjs, info: CellRenderInfo<Dayjs>) => {
    const clientDate = currentDate
      .set('hour', timeDefault)
      .set('minute', 0)
      .set('second', 0);
    return (
      <DateRender
        currentDate={currentDate}
        showPrice={showPrice}
        currency={dateData?.map((crr: ClientDateType) => {
          if (crr.date === clientDate.unix()) {
            if (crr.currency === currencyType.EURO) {
              return '€';
            } else {
              return '$';
            }
          }
        })}
        rateLevel={dateData?.map((ele: ClientDateType) => {
          if (ele.date === clientDate.unix()) {
            return ele.rateLevel;
          }
        })}
        price={dateData?.map((date: ClientDateType) => {
          if (date.date === clientDate.unix()) {
            return date.amount;
          }
        })}
      />
    );
  };

  const checkInTime = (
    periods: periodType[],
    currentTimestamp: number,
    timestamp: number
  ): boolean => {
    const foundPeriod = periods.find(
      (period) =>
        timestamp >=
        dayjs(period.start * ONE_THOUSAND)
          .startOf('day')
          .unix() &&
        timestamp <=
        dayjs(period.end * ONE_THOUSAND)
          .startOf('day')
          .unix()
    );
    const isInTimestamp =
      foundPeriod && currentTimestamp >= foundPeriod?.start && currentTimestamp <= foundPeriod?.end;
    return isInTimestamp || false;
  };
  const availableDayFunc = (chooseDay: number) => {
    const availabeDay = searchValue?.daysOfWeek;
    const breakDay = defaultDaysOfWeek.filter((item) => !availabeDay?.includes(item));

    let limitTime = chooseDay;
    let sorted = [];
    const chooseDayIdx = defaultDaysOfWeek.indexOf(dayjs(chooseDay * ONE_THOUSAND).format('dddd'));
    sorted = defaultDaysOfWeek.slice(chooseDayIdx).concat(defaultDaysOfWeek.slice(0, chooseDayIdx));
    const valueArr = [];
    for (let idx = 0; idx < sorted.length; idx++) {
      if (breakDay.includes(sorted[idx])) {
        limitTime += 86400 * idx;
        break;
      } else {
        valueArr.push(sorted[idx]);
      }
    }
    return { limitTime, availableDay: valueArr };
  };

  const isAvailableDate = (current: number, startDate: number) => {
    let newDate = startDate;
    const minStay = searchValue?.minStay || 1;
    if (current > startDate) {
      newDate = current;
    }
    const addedDate = dayjs(newDate * 1000)
      .add(minStay, 'day')
      .unix();
    const breakDate = availableDayFunc(newDate).limitTime;
    return addedDate < breakDate;
  };

  const disabledDate = (current: dayjs.Dayjs) => {
    const isBeforeCurrentDay = current?.isBefore(dayjs().startOf('day'), 'day');
    const currentTimestamp = current?.startOf('day').unix();
    if (searchValue?.periods && router.pathname === pathsBooking.BUNDLE_DETAIL) {
      const periods = searchValue?.periods;
      const daysOfWeekByBundle = searchValue?.daysOfWeek || [];
      const maxStay = searchValue?.maxStay || 2;
      const minStay = searchValue?.minStay || 1;
      const isInRange = periods.some((period, index) => {
        const startTimestamp = dayjs(period.start * ONE_THOUSAND)
          .startOf('day')
          .unix();
        const endTimestamp = dayjs(period.end * ONE_THOUSAND)
          .endOf('day')
          .unix();
        if (isSpecialDays(daysOfWeekByBundle)) {
          if (
            dayjs(dayjs(currentTimestamp * ONE_THOUSAND)).isSame(
              dayjs(startTimestamp * ONE_THOUSAND),
              'day'
            )
          ) {
            return (
              currentTimestamp >= startTimestamp &&
              currentTimestamp <= endTimestamp &&
              daysOfWeekByBundle.includes(dayjs(current).format('dddd')) &&
              isAvailableDate(
                dayjs()
                  .startOf('day')
                  .unix(),
                startTimestamp
              )
            );
          }
          return (
            currentTimestamp >= startTimestamp &&
            currentTimestamp <= endTimestamp &&
            daysOfWeekByBundle.includes(dayjs(current).format('dddd'))
          );
        }
        return currentTimestamp >= startTimestamp && currentTimestamp <= endTimestamp;
      });

      if (dateOnlyClick && dateData?.length > 0) {
        if (dateOnlyClick[0] && !dateOnlyClick[1]) {
          const startTimestamp = dateOnlyClick[0].unix();
          const checkDisabled =
            !isInRange ||
            !checkInTime(periods, currentTimestamp, startTimestamp) ||
            currentTimestamp >
            dayjs(dayjs(dateOnlyClick[0]).startOf('day'))
              .add(maxStay, 'day')
              .unix() ||
            currentTimestamp <
            dayjs(dayjs(dateOnlyClick[0]).startOf('day'))
              .add(minStay, 'day')
              .unix() ||
            isBeforeCurrentDay;
          if (isSpecialDays(daysOfWeekByBundle)) {
            const availabeDays = availableDayFunc(dateOnlyClick[0].startOf('day').unix());
            return checkDisabled || currentTimestamp > availabeDays?.limitTime;
          }
          return checkDisabled;
        } else if (!dateOnlyClick[0] && dateOnlyClick[1]) {
          const endTimestamp = dateOnlyClick[1].startOf('day').unix();
          return (
            !isInRange ||
            !checkInTime(periods, currentTimestamp, endTimestamp) ||
            currentTimestamp <
            dayjs(dayjs(dateOnlyClick[1]).startOf('day'))
              .subtract(maxStay, 'day')
              .unix() ||
            currentTimestamp >
            dayjs(dayjs(dateOnlyClick[1]).startOf('day'))
              .subtract(minStay, 'day')
              .unix() ||
            isBeforeCurrentDay
          );
        }
      }
      return !isInRange || isBeforeCurrentDay;
    }
    if (dateOnlyClick && dateOnlyClick?.length > 0 && dateOnlyClick[0] && !dateOnlyClick[1]) {
      return (
        isBeforeCurrentDay ||
        currentTimestamp <= dayjs(dayjs(dateOnlyClick[0]).startOf('day')).unix()
      );
    }

    return isBeforeCurrentDay;
  };

  // UI
  const generalButton = useIbeTranslation('general.button');
  const searchMenu = useIbeTranslation('searchMenu');
  return (
    <div className="CustomerDate">
      <RangePicker
        autoFocus={false}
        inputReadOnly
        format={'DD.MM.YYYY'}
        ref={rangePickerRef}
        disabled={!onClick}
        open={isOpenCalendar}
        popupClassName="z-100"
        allowClear={router.pathname !== pathsBooking.BUNDLE_DETAIL}
        placeholder={[
          contentStrapi?.arrivalPlaceholderText || searchMenu?.calendar?.arrivalPlaceHolder,
          contentStrapi?.departurePlaceholderText || searchMenu?.calendar?.departurePlaceHolder,
        ]}
        onPanelChange={(value, mode) => {
          const intialDate = value?.[0]?.unix() || 0;
          if (intialDate > fromDate) {
            const currentDate = dayjs(value?.[0]);
            const beginningOfCurrentMonth = currentDate.startOf('month');
            const beginningOfPreviousMonth = beginningOfCurrentMonth.subtract(1, 'month');
            const unixTimestampOfPreviousMonth = beginningOfPreviousMonth.unix();
            setFromDate(unixTimestampOfPreviousMonth - 84600);
          } else {
            const currentDate = dayjs(value?.[0]);
            const beginningOfCurrentMonth = currentDate.startOf('month');
            const unixTimestampOfPreviousMonth = beginningOfCurrentMonth.unix();
            setFromDate(unixTimestampOfPreviousMonth - 84600);
          }
        }}
        onChange={(dates) => {
          handleRangeChange(dates);
          setDefaultValue(dates);
        }}
        onCalendarChange={(dates) => {
          setDateOnlyClick(dates);
        }}
        onClick={() => {
          if (onClick) {
            dispatch(setOpenCalendar(true));
            dispatch(setOpenGuest(false));
            setDateOnlyClick(undefined);
            setDefaultValue(undefined)
          };
        }}
        className="h-12 px-4 xl:w-[300px] w-[250px] shadow-none"
        placement="topLeft"
        renderExtraFooter={() => {
          return (
            <div className="flex md:flex-row flex-col items-center justify-between">
              <DateFooter
                calendarDescription={contentStrapi?.calendarDescription}
                priorityDescription={contentStrapi?.priorityDescription}
                onChange={handleShowPrice}
              />
              <Button
                size="small"
                disabled={!onClick}
                className="mr-3 !text-[10px]"
                onClick={() => {
                  dispatch(setOpenCalendar(false));
                  onClick && onClick(undefined);
                  handleBlur();
                }}
              >
                {generalButton?.cancel || 'Cancel'}
              </Button>
            </div>
          );
        }}
        cellRender={currentDate}
        disabledDate={disabledDate}
        value={defaultValue}
      />
    </div>
  );
};

export default DatePickerSelect;
