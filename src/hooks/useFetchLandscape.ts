import { pathsTag } from '@/constants';
import { useAppSelector } from '@/store/hooks';
import { ThemeType } from '@/store/slice/themeSlice';
import { LandScapeType } from '@/types/bundle/bundleType';
import { useLocale } from '@m0-0a/next-intl';
import useSWR from 'swr';

export default function useFetchLandscape() {
  const { locale } = useLocale();
  /** swr get all landscape **/
  const { data: landScapeData } = useSWR(pathsTag.GET_LANDSCAPE, {
    dedupingInterval: 60 * 60 * 1000,
    revalidateOnFocus: false,
  });
  /** get current theme **/
  const { selected } = useAppSelector((state) => state.themeSlice);

  const dataLandScape: LandScapeType[] = landScapeData?.data?.data?.length
    ? landScapeData?.data?.data[0]?.data?.map((ele: LandScapeType) => ({
      id: ele?.landscapeId,
      label: ele?.extendedData?.title
        ? ele?.extendedData?.title?.[locale] || ele?.extendedData?.title?.en
        : ele?.title || ele?.name || '',
      icon: selected === ThemeType.default ? ele?.icons?.dark : ele?.icons?.light,
    }))
    : [];

  return { dataLandScape } as const;
}
