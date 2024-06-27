import { pathsTag } from '@/constants';
import { useAppSelector } from '@/store/hooks';
import { ThemeType } from '@/store/slice/themeSlice';
import { SpecialBundlesType } from '@/types/bundle/bundleType';
import { useLocale } from '@m0-0a/next-intl';
import useSWR from 'swr';

export default function useFetchSpecialOffer() {
  const { locale } = useLocale()
  /** swr get all spcial bunble */
  const { data: specialBundle } = useSWR(pathsTag.GET_SPECIAL_BUNDLE, {
    dedupingInterval: 60 * 60 * 1000,
    revalidateOnFocus: false,
  });
  /** get current theme **/
  const { selected } = useAppSelector((state) => state.themeSlice);
  const dataSpecialOffer: SpecialBundlesType[] = specialBundle?.data?.data?.length
    ? specialBundle?.data?.data[0]?.data?.map((ele: SpecialBundlesType) => ({
      id: ele.specialBundleId,
      label: ele?.extendedData?.title ? (ele?.extendedData?.title?.[locale] || ele?.extendedData?.title?.en) : (ele?.title || ele?.name || ''),
      icon: selected === ThemeType.default ? ele?.icons?.dark : ele?.icons?.light,
    }))
    : [];

  return { dataSpecialOffer } as const;
}