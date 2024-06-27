import { useAppSelector } from '@/store/hooks';
import { useState, useEffect } from 'react';

interface Country {
  countryCode: string;
  countryName: string;
}
export default function useTopCountries(): Country[] {
  const { locationList } = useAppSelector((state) => state.commonSlice);
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
      const topCountryCodes = ["DE", "AT","IT","NL","DK"];
      function moveCountriesToTop(countryCodes: string[], countriesArray: Country[]): Country[] {
          const topCountries = countriesArray.filter(country => countryCodes.includes(country.countryCode));
          const otherCountries = countriesArray.filter(country => !countryCodes.includes(country.countryCode));
          return [...topCountries, ...otherCountries];
      }
      const modifiedCountries = moveCountriesToTop(topCountryCodes, locationList);
      setCountries(modifiedCountries);
  }, []);

  return countries;
}