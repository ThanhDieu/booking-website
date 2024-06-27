import { periodType } from "@/types/bundle/bundleType";
import dayjs from "dayjs";

/**
 * check length days
 * @param daysOfWeek 
 * @param days 
 * @returns 
 */
export const isSpecialDays = (daysOfWeek?: string[], days = 7) => {
    if (daysOfWeek && daysOfWeek?.length && daysOfWeek?.length < days) {
        return daysOfWeek
    }
    return undefined
}

/**
 * Start date default
 * @param periods 
 * @param daysOfWeek 
 * @returns 
 */
const calculateStartDate = (periods: periodType, daysOfWeek: string[], minStay: number) => {
    const startDate = dayjs.unix(periods.start);
    const endDate = dayjs.unix(periods.end);

    let currentDay = startDate;
    while ((!daysOfWeek.includes(currentDay.format('dddd')) || (daysOfWeek.includes(currentDay.format('dddd')) && !daysOfWeek.includes(currentDay.add(minStay, 'day').format('dddd')))) && currentDay.isBefore(endDate)) {
        currentDay = currentDay.add(1, 'day');
    }

    if (daysOfWeek.includes(currentDay.format('dddd'))) {
        return currentDay;
    } else {
        return null;
    }
};

/**
   * Time default for calendar
   * @param periods
   * @param minStay
   * @returns
   */
export const timeInPeriodsDefault = (periods: periodType[], minStay: number, daysOfWeek?: string[]) => {
    const newPeriod = {
        start: 0,
        end: 0,
    };
    const daysOfWeekByBundle = daysOfWeek || []

    const todayAddOne = dayjs().add(1, 'hours').unix()
    for (let i = 0; i < periods?.length; i++) {
        if (periods[i].end >= dayjs().unix()) {
            const findStartDate = calculateStartDate(periods[i], daysOfWeekByBundle, minStay)
            const startDate = isSpecialDays(daysOfWeek) && findStartDate ? findStartDate?.unix() : periods[i].start;
            newPeriod.start =
                startDate >
                    todayAddOne
                    ? startDate
                    : todayAddOne;
            const dayLength = dayjs(periods[i].end * 1000).diff(dayjs(newPeriod.start * 1000), 'day');
            if (isSpecialDays(daysOfWeekByBundle, minStay)) minStay = daysOfWeekByBundle.length

            if (dayLength <= minStay) {
                newPeriod.end = periods[i].end;
            } else {
                newPeriod.end = dayjs(newPeriod.start * 1000)
                    .add(minStay, 'day')
                    .unix();
            }
            break;
        }
    }
    return newPeriod;
};

export const calculateTotalGuest = (arr: any[]) => {
  const adults = arr.reduce((total: number, current: any) => total + Number(current.adults) * Number(current.count), 0);
  const children = arr.reduce((total: number, current: any) => total + Number(current.children?.length) * Number(current.count), 0);
  return {
    adults,
    children
  }
}
