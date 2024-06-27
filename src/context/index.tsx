import store from '@/store';
import { Provider } from 'react-redux';
import { SWRConfigX, defaultTheme } from '@/config';
import { ConfigProvider } from 'antd';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { ReactNode } from 'react';
import { AuthProvider } from './auth/authContext';
import PlausibleProvider from 'next-plausible';

let persistor = persistStore(store);

interface AppProviderProps {
  children: ReactNode
}

export default function AppProvider({ children }: AppProviderProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConfigProvider theme={defaultTheme}>
          <SWRConfigX>
            <AuthProvider>
              <PlausibleProvider domain='ibe.orionhms.com'>
                {children}
              </PlausibleProvider>
            </AuthProvider>
          </SWRConfigX>
        </ConfigProvider>
      </PersistGate>
    </Provider>
  );
}
