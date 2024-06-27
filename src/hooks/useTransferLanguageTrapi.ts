/* eslint-disable react-hooks/exhaustive-deps */
import { useLocale } from '@m0-0a/next-intl';
import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';

export default function useTransferLanguageTrapi(fecthRequest: (locale?: string | undefined) => Promise<AxiosResponse<any, any>> ) {
  const [stateData, setStateData] = useState<any>();
  const { locale } = useLocale();
  useEffect(() => {
    const handleFetch = async () => {
      try {
        const response = await fecthRequest(locale);
        if (response.status === 200) {
          if (response.data?.data?.attributes) {
            const origin = JSON.parse(JSON.stringify(response.data.data.attributes));
            setStateData(origin);
          }
        }
      } catch (err) {
      }
    };
    handleFetch();

  }, [locale]);

  return { stateData };
}
