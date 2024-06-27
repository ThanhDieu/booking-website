import { pathsTag } from '@/constants';
import { useAppSelector } from '@/store/hooks';
import { ThemeType } from '@/store/slice/themeSlice';
import { ActivityType } from '@/types/bundle/bundleType';
import { useLocale } from '@m0-0a/next-intl';
import useSWR from 'swr';

export default function useFetchActivities() {
  const { locale } = useLocale();
  /** use swr get all activities **/
  const { data: activitiesData } = useSWR(pathsTag.GET_ACTIVITY, {
    dedupingInterval: 60 * 60 * 1000,
    revalidateOnFocus: false,
  });
  /** get current theme **/
  const { selected } = useAppSelector((state) => state.themeSlice);
  const dataActivities: ActivityType[] = activitiesData?.data?.data?.length
    ? activitiesData?.data?.data[0]?.data?.map((ele: ActivityType) => ({
      id: ele?.activityId,
      label: ele?.extendedData?.title
        ? ele?.extendedData?.title?.[locale] || ele?.extendedData?.title?.en
        : ele?.title || ele?.name || '',
      icon: (selected === ThemeType.default ? ele?.dark : ele?.light) || ele?.icon,
    }))
    : [];

  return { dataActivities } as const;
}
