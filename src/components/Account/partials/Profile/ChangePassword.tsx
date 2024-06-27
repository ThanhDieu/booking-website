import ButtonShare from '@/components/global/ButtonShare';
import { Input } from 'antd';
import clsx from 'clsx';
import React from 'react';
import styles from './../../Account.module.scss';
import { useIbeTranslation } from '@/hooks';

type ChangePasswordProps = {};

const ChangePassword = ({}: ChangePasswordProps) => {
  const accountPage = useIbeTranslation('accountPage');
  return (
    <div className="bg-primary-switch p-6 rounded-2xl">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12">
          <p className={styles.textBlue}>{accountPage?.profile?.general?.password?.title}</p>
        </div>
        <div className="col-span-12">
          <Input.Password
            disabled={true}
            size="large"
            placeholder={accountPage?.profile?.general?.password?.oldPassword}
          />
        </div>
        <div className="col-span-12 col-start-1">
          <Input.Password
            disabled={true}
            size="large"
            placeholder={accountPage?.profile?.general?.password?.newPassword}
          />
        </div>
        <div className="col-span-12 col-start-1">
          <Input.Password
            disabled={true}
            size="large"
            placeholder={accountPage?.profile?.general?.password?.confirmPassword}
          />
        </div>

        <div className="col-span-12 col-start-1 py-2 gap-6 flex">
          <ButtonShare
            size="medium"
            className={clsx(styles.textBtn, '!cursor-not-allowed')}
            style="dark"
            content={accountPage?.profile?.general?.password?.setPassword}
          />
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
