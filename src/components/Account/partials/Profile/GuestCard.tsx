import ButtonShare from '@/components/global/ButtonShare';
import { DatePicker, Input } from 'antd';
import clsx from 'clsx';
import styles from './../../Account.module.scss';
import { useIbeTranslation } from '@/hooks';

import React from 'react';

type GuestCardProps = { onClick: () => void };

const GuestCard = ({ onClick }: GuestCardProps) => {
  const accountPage = useIbeTranslation('accountPage');
  return (
    <div className="grid grid-cols-12 gap-4 h-[153px]">
      <div className="col-span-2">
        <Input size="large" placeholder="Title" />
      </div>
      <div className="col-span-5">
        <Input size="large" placeholder="First name" />
      </div>
      <div className="col-span-5">
        <Input size="large" placeholder="Last name" />
      </div>
      <div className="col-span-12">
        <DatePicker size={'large'} placeholder="Date of birth" className="w-full" />
      </div>
      <div className="col-span-12 flex gap-4">
        <ButtonShare
          style="dark"
          className={styles.textBtn}
          size="medium"
          content={accountPage?.profile?.general?.guestsTogether?.buttonText?.buttonSave}
        />

        <ButtonShare
          onClick={onClick}
          style="surface"
          className={clsx(styles.textBtn)}
          size="medium"
          content={accountPage?.profile?.general?.guestsTogether?.buttonText?.buttonDiscard}
        />
      </div>
    </div>
  );
};

export default GuestCard;
