/* eslint-disable react-hooks/exhaustive-deps */
import { useAppSelector } from '@/store/hooks';
import { isNull } from '@/util/searchParams';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

type StateType = 'location' | 'date' | 'guest';
export const DATE_FORMAT_1 = 'DD.MM.YYYY';
export const STATE_TYPE: { [key: string]: StateType } = {
  Location: 'location',
  Date: 'date',
  Guest: 'guest',
};

export default function useDefaultSearch(
  dependency: any = [],
  type: StateType = STATE_TYPE.Location,
  initValue?: any
) {
  const { searchValue } = useAppSelector((state) => state.bundleSlice);
  const [stateData, setStateData] = useState<any>(initValue);

  const handleChange = (e: any) => {
    setStateData(e);
  };

  useEffect(() => {
    if (searchValue) {
      if (dependency && dependency?.length && dependency[0] && type === STATE_TYPE.Location) {
        const locationList = dependency[0];
        if (searchValue?.countryCode && searchValue?.countryCode !== isNull) {
          const defaultCountry: any = locationList.find((item: any) =>
            item.value.includes(`${searchValue?.countryCode}@`)
          );
          if (searchValue?.propertyId && searchValue?.propertyId !== isNull) {
            const defaultProperty = defaultCountry?.children?.find((item: any) =>
              item.value.includes(searchValue?.propertyId)
            );
            setStateData(defaultProperty?.value);
          } else {
            setStateData(defaultCountry?.value);
          }
        } else {
          setStateData(null);
        }
      }
      if (type === STATE_TYPE.Date) {
        setStateData(
          searchValue?.arrival && searchValue?.departure
            ? [
              dayjs(dayjs(Number(searchValue?.arrival) * 1000), DATE_FORMAT_1),
              dayjs(dayjs(Number(searchValue?.departure) * 1000), DATE_FORMAT_1),
            ]
            : undefined
        );
      }
      if (type === STATE_TYPE.Guest) {
        setStateData({
          room: searchValue?.rooms || 1,
          adult: searchValue?.adults || 1,
          children: searchValue?.children || 0,
          childrenAgeBelow:
            searchValue?.children > 0 && searchValue?.childrenAgeBelow?.length
              ? searchValue?.childrenAgeBelow
              : [],
        });
      }
    } else {
      setStateData(initValue);
    }
  }, [searchValue, ...dependency]);

  return { stateData, handleChange };
}
