import { useAppSelector } from '@/store/hooks';
import { App, ConfigProvider } from 'antd';
import { defaultTheme } from '..';
import { useEffect, useMemo } from 'react';
import { ThemeType } from '@/store/slice/themeSlice';
import updateLocale from 'dayjs/plugin/updateLocale';
import dayjs from 'dayjs';

export interface ThemeProviderProps {
  children?: React.ReactNode;
}

const ThemeProvider = (props: ThemeProviderProps) => {
  dayjs.extend(updateLocale);
  dayjs.updateLocale('en', {
    weekStart: 1,
  });
  const { selected: selectedThemeKey, colorPrimary, ...restConfigProps } = useAppSelector(
    (state) => state.themeSlice
  );
  const selectedTheme = useMemo(
    () => ({
      ...defaultTheme[selectedThemeKey],
      token: {
        ...defaultTheme[selectedThemeKey]?.token,
        colorPrimary,
      },
    }),
    [selectedThemeKey, colorPrimary]
  );

  //Change tailwind theme
  useEffect(() => {
    selectedThemeKey === ThemeType.dark
      ? document.documentElement.classList.add('dark')
      : document.documentElement.classList.remove('dark');
  }, [selectedThemeKey]);

  return (
    <>
      <ConfigProvider {...restConfigProps} theme={selectedTheme}>
        <App>{props.children}</App>
      </ConfigProvider>
    </>
  );
};

export default ThemeProvider;
