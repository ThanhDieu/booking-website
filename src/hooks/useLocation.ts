import { PublicConfiguration } from 'swr/_internal';
import useSWR from 'swr';
import { locationSearch } from '@/constants';

/** fetch location and hotel name for search menu */
export const useLocation = (option?: Partial<PublicConfiguration>) => {
  const TIME_REFRESH = 30 * 60 * 1000;

  const { data, error, mutate, isLoading } = useSWR(
    locationSearch.GET_HOTEL_NAME,
    {
      dedupingInterval: TIME_REFRESH,
      revalidateOnFocus: false,
      option,
    }
  );
  return { data, error, isLoading } as const;
};
