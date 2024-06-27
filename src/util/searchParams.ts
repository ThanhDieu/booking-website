import { SearchValueType } from '@/types/bundle/bundleSearch';
import { ReadonlyURLSearchParams } from 'next/navigation';

export const isNull = 'null'
export const searchParamsFc = (
  searchParams: ReadonlyURLSearchParams,
  searchParams2?: SearchValueType
) => {
  const countryCode = searchParams2?.countryCode || searchParams.get('countryCode');
  const propertyId = searchParams2?.propertyId || searchParams.get('propertyId');
  const arrival = searchParams2?.arrival || searchParams.get('arrival');
  const departure = searchParams2?.departure || searchParams.get('departure');
  const adults = searchParams2?.adults || searchParams.get('adults');
  const rooms = searchParams2?.rooms || searchParams.get('rooms');
  const children = searchParams2?.children || searchParams.get('children');
  const childrenAgeBelow = searchParams2?.childrenAgeBelow || searchParams.get('childrenAgeBelow');
  const landscape = searchParams2?.landscape || searchParams.get('landscape');
  const activities = searchParams2?.activities || searchParams.get('activities');
  const mainActivity = searchParams2?.mainActivity || searchParams.get('mainActivity');
  const specialBundle = searchParams2?.specialBundle || searchParams.get('specialBundle');
  const bundleId = searchParams2?.bundleId || searchParams.get('bundleId');
  const unitGroupId = searchParams2?.unitGroupId || searchParams.get('unitGroupId');
  const offerId = searchParams2?.offerId || searchParams.get('offerId');

  const params = {
    countryCode: countryCode && countryCode !== isNull ? countryCode : undefined,
    propertyId: propertyId && propertyId !== isNull ? propertyId : undefined,
    arrival: arrival ? Number(arrival) : undefined,
    departure: departure ? Number(departure) : undefined,
    adults: Number(adults || 1),
    rooms: Number(rooms || 1),
    children: Number(children || 0),
    childrenAgeBelow:
      childrenAgeBelow && childrenAgeBelow?.toString()?.split(',')?.length
        ? childrenAgeBelow?.toString()?.split(',').map((item: string) => Number(item || 0))
        : undefined,
    landscape: landscape || undefined,
    activities:
      activities && activities?.toString()?.split(',')?.length
        ? activities?.toString()?.split(',').map((item: string) => item)
        : undefined,
    mainActivity: mainActivity || undefined,
    specialBundle: specialBundle || undefined,
    bundleId: bundleId || undefined,
    unitGroupId: unitGroupId || undefined,
    offerId: offerId || undefined,
  };
  return params;
};

export const querySearchParams = (searchParams: SearchValueType) => {
  const countryCode = searchParams?.countryCode && searchParams?.countryCode !== isNull ? `&countryCode=${searchParams?.countryCode}` : '';
  const propertyId = searchParams?.propertyId && searchParams?.propertyId !== isNull ? `&propertyId=${searchParams?.propertyId}` : '';
  const arrival = searchParams?.arrival ? `&arrival=${searchParams?.arrival}` : '';
  const departure = searchParams?.departure ? `&departure=${searchParams?.departure}` : '';
  const adults = searchParams?.adults;
  const rooms = searchParams?.rooms;
  const children = searchParams?.children;
  const childrenAgeBelow = searchParams?.childrenAgeBelow && searchParams?.childrenAgeBelow?.length
    ? `&childrenAgeBelow=${searchParams.childrenAgeBelow.toString()}`
    : '';
  const landscape = searchParams?.landscape ? `&landscape=${searchParams?.landscape}` : '';
  const activities = searchParams?.activities && searchParams.activities?.length
    ? `&activities=${searchParams?.activities?.toString()}`
    : '';
  const specialBundle = searchParams?.specialBundle
    ? `&specialBundle=${searchParams?.specialBundle?.toString()}`
    : '';
  const bundleId = searchParams?.bundleId ? `&bundleId=${searchParams?.bundleId}` : '';
  const offerId = searchParams?.offerId ? `&offerId=${searchParams?.offerId}` : '';
  const unitGroupId = searchParams?.unitGroupId ? `&unitGroupId=${searchParams?.unitGroupId}` : '';
  const mainActivity = searchParams?.mainActivity ? `&mainActivity=${searchParams?.mainActivity}` : '';

  return `adults=${adults}&rooms=${rooms}&children=${children}${countryCode}${propertyId}${arrival}${departure}${childrenAgeBelow}${activities}${landscape}${specialBundle}${bundleId}${unitGroupId}${mainActivity}${offerId}`;
};
