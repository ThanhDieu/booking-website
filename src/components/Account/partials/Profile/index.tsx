import clsx from 'clsx';
import React, { useState } from 'react';
import styles from './../../Account.module.scss';
import GeneralProfile from './GeneralProfile';
import ChangePassword from './ChangePassword';
import { ProfileUpdatePayload } from '@/types/userSliceType/userSlice';
import { useIbeTranslation } from '@/hooks';
import withAuth from '@/Hoc/withAuth/withAuth';

type ProfileProps = {
  profile?: ProfileUpdatePayload;
};

const Profile = ({ profile }: ProfileProps) => {
  const [selected, setSelected] = useState<string>('general');
  const handleSelect = (tabPaneId: string) => setSelected(tabPaneId);

  const accountPage = useIbeTranslation('accountPage');
  return (
    <div className="grid grid-cols-4 gap-6 pt-24">
      <div className={clsx('col-span-4 font-[Lora] text-primary-switch', styles.textHeader)}>
        {accountPage?.login?.profile}
      </div>
      <div className="lg:col-span-1 col-span-4">
        <div className="bg-primary-switch p-6 rounded-2xl">
          <div className="pl-2 grid gap-y-6">
            <p
              onClick={() => handleSelect('general')}
              className={clsx(
                styles.tabPane,
                '',
                selected === 'general'
                  ? `${styles.active} text-PrimaryBlue`
                  : 'text-primary-switch '
              )}
            >
              {accountPage?.profile?.tabTitleGeneral}
            </p>
            <p
              className={clsx(
                styles.tabPane,
                selected === 'password'
                  ? ` ${styles.active} text-PrimaryBlue`
                  : 'text-primary-switch '
              )}
              onClick={() => handleSelect('password')}
            >
              {accountPage?.profile?.tabTitlePassword}
            </p>
          </div>
        </div>
      </div>
      <div className="lg:col-span-3 col-span-4">
        {selected === 'general' && <GeneralProfile profile={profile} />}
        {selected === 'password' && <ChangePassword />}
      </div>
    </div>
  );
};

export default withAuth(Profile);
