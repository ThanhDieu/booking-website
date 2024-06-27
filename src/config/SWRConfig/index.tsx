import serverHttp from '@/clientApi/serverHttp';
import React from 'react';
import { SWRConfig } from 'swr';

interface SWRConfigXProps {
  children?: React.ReactNode | React.ReactElement;
}

const SWRConfigX = ({ children }: SWRConfigXProps) => {
  return (
    <SWRConfig value={{ fetcher: (url) => serverHttp.get(url), shouldRetryOnError: false }}>
      {children}
    </SWRConfig>
  );
};

export default SWRConfigX;
