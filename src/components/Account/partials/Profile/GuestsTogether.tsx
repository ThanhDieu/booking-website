import ButtonShare from '@/components/global/ButtonShare';
import Image from 'next/image';
import React, { useState } from 'react';
import GuestCard from './GuestCard';
import styles from './../../Account.module.scss';
import clsx from 'clsx';
import { Calendar } from '@/library';
import { useIbeTranslation } from '@/hooks';

type GuestsTogetherProps = {};

const GuestsTogether = ({}: GuestsTogetherProps) => {
  const [selected, setSelected] = useState<string>('');
  const handleSelect = (tabPaneId: string) => {
    setSelected(tabPaneId);
    selected === tabPaneId && setSelected('');
  };
  const handleDisCard = () => setSelected('');

  const accountPage = useIbeTranslation('accountPage');
  return (
    <div className="grid gap-6 gap-y-6">
      <div className="p-6 grid gap-4 bg-primary-switch rounded-2xl min-h-[156px]">
        <p className={styles.textGuestTile}>
          {accountPage?.profile?.general?.guestsTogether?.guest}
        </p>
        {/*****Check if selected guest by ID to edit *****/}
        {selected === 'guest1' ? (
          <GuestCard onClick={handleDisCard} />
        ) : (
          //***** Input edit guest information if match with selected guest by ID *****//

          <div className="flex flex-row flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-col">
              <p className={clsx('pb-2', styles.bundleTitle)}>Mr. John - Lois Johnson</p>
              <div className="flex items-center gap-2">
                <Calendar />
                <p className={styles.textDate}>02/14/1997</p>
              </div>
            </div>
            <ButtonShare
              onClick={() => handleSelect('guest1')}
              style="outline"
              className={clsx(styles.textBtn)}
              size="medium"
              content={accountPage?.profile?.general?.guestsTogether?.buttonText?.buttonEdit}
            />
          </div>
        )}
      </div>
      {/***** Click to add new guest and fill input *****/}
      <ButtonShare
        size="medium"
        style="dark"
        className={clsx(styles.textBtn, 'w-fit')}
        content={accountPage?.profile?.general?.guestsTogether?.buttonText?.buttonAdd}
      />
    </div>
  );
};

export default GuestsTogether;
