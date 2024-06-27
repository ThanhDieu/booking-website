import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';

export interface LayoutProps {
  children: ReactNode;
  data?: any;
  className?: string;
  id?: string;
}

export type NextSheetWidthLayout<P = {}, IP = P> = NextPage<P, IP> & {
  Layout?: (props: LayoutProps) => ReactElement;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextSheetWidthLayout;
};

export interface ErrorLayoutProps {
  statusCode?: number;
  children: ReactNode;
}

export interface CouponLayoutProps {
  children: ReactNode;
}

export type NextErrorLayout<P = {}, IP = P> = NextPage<P, IP> & {
  ErrorLayout?: (props: ErrorLayoutProps) => ReactElement;
};
