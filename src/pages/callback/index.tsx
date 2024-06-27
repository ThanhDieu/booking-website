import { NextSheetWidthLayout } from '@/types/layoutType';
import React, { useEffect } from 'react';
import ConfirmationPageProps from '@/types/ComfirmationPage';
import EmtyLayout from '@/layouts/EmtyLayout';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useAppDispatch } from '@/store/hooks';
import axios from 'axios';
import {
  asyncThunkFetchProfile,
  thunkFetchActivitiesHistory,
  thunkFetchHistoryBooking,
} from '@/store/slice/userSlice';
import { message } from 'antd';

const CallBackPage: NextSheetWidthLayout = (props: ConfirmationPageProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const getLogin = async () => {
    try {
      const code = router.query.code;
      const callbackUri = process.env.NEXT_PUBLIC_CALLBACK_URI;
      const zitadel = process.env.NEXT_PUBLIC_CALLBACK_URI;

      if (code && callbackUri) {
        const res = await axios({
          url: `${zitadel}/oauth/v2/token?code=${code}&grant_type=authorization_code&redirect_uri=${callbackUri}`,
          method: 'GET',
        });

        // WARNING
        if (res.status === 200) {
          const currentUnixTime = Math.floor(Date.now() / 1000);
          const newUnixTime = currentUnixTime + Number(res.data.expires_in);

          localStorage.setItem('access-token', res.data.access_token);
          localStorage.setItem('token-expires-in', String(newUnixTime));
          const oldPath = localStorage.getItem('path-login');
          dispatch(asyncThunkFetchProfile());
          dispatch(thunkFetchActivitiesHistory());
          dispatch(thunkFetchHistoryBooking());

          if (oldPath) {
            router.push(JSON.parse(oldPath));
            localStorage.removeItem('path-login');
          } else {
            router.push(JSON.parse('/'));
          }
        }
      }
    } catch (err) {
      message.error('Login Faild!');
      router.push('/');
    }
  };

  useEffect(() => {
    getLogin();
  }, [router.query.code]);

  return (
    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
      <div>
        <Image src={require('../../assets/loading-gif.gif')} alt="loading" width={70} height={70} />
        <h4 className="mt-4 opacity-30">Login...</h4>
      </div>
    </div>
  );
};

CallBackPage.Layout = EmtyLayout;

export default CallBackPage;
