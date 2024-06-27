import ButtonShare from '@/components/global/ButtonShare';
import About from '@/pages/about';
import { useAppSelector } from '@/store/hooks';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, ComponentType } from 'react';
type IsAuthProps = {
  isAuth: boolean;
  children: React.ReactNode;
};

const withAuth = <P extends Record<string, unknown>>(WrappedComponent: ComponentType<P>) => {
  const WithAuthComponent = (props: P) => {
    const router = useRouter();
    const { profile } = useAppSelector((state) => state.userSlice);

    useEffect(() => {
      if (!profile) {
        router.push('/'); // Redirect to the home page if not authenticated
      }
    }, []);

    return <WrappedComponent {...props} />;
  };

  return WithAuthComponent;
};

export default withAuth;
