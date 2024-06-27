import clsx from 'clsx';
import styles from '../../Hotel.module.scss';
import ButtonShare from '@/components/global/ButtonShare';
import { Modal } from 'antd';
import { useState } from 'react';
import BoxContent from '@/components/global/BoxContent';
import Currency from '@/components/global/CurrencyComponent';

export type ActivityType = {
  title: string;
  icon: React.ReactNode | React.ReactElement;
};

export interface FooterProps {
  title: string;
  price: number;
  activities: ActivityType[];
}

const SecondaryFooter = ({ title, price, activities }: FooterProps) => {
  const [modal2Open, setModal2Open] = useState(false);

  const showModal = () => {
    setModal2Open(true);
  };

  const handleOk = () => {
    setModal2Open(false);
  };

  const handleCancel = () => {
    setModal2Open(false);
  };
  return (
    <div className="flex flex-col justify-around h-[400px] bg-PrimaryWhite py-[30px] px-[30px]">
      <div className={clsx('flex justify-between pb-6 h-[73px]')}>
        <h2 className={clsx(styles.highlightTitle, 'w-[196px] font-[lora]')}>{title}</h2>
        <div className="flex flex-col justify-between">
          <span
            className={clsx(
              styles.highlightPrice,
              'py-1 mb-auto px-2 rounded-lg border-solid border-[1px] border-PrimaryBlack/10'
            )}
          >
            <Currency price={price} fontSize="text-[12px]" color="text-MidGrey" />
            {/* EUR{price} */}
          </span>
          <p className="text-[12px] text-MidGrey">per person</p>
        </div>
      </div>
      <div>
        {activities?.slice(0, 3)?.map((ele: any, index: number) => {
          return (
            <BoxContent
              style="line"
              label={ele.name}
              icon={ele?.icon}
              key={index}
              height="auto"
              labelStyle="text-[16px] line-clamp-1"
              className={clsx('!px-0 !py-3 flex-row-reverse !justify-end gap-6 !mt-0', {
                '!border-b': activities?.slice(0, 3).length - 1 === index,
              })}
            />
          );
        })}
      </div>
      <div className="pt-5 flex justify-center">
        <ButtonShare
          className="font-bold py-[5px] px-[10px]"
          onClick={showModal}
          style={'outline'}
          content={'See details'}
          size={'thin'}
        />
        <Modal
          title="Coming Soon"
          centered
          open={modal2Open}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>Feature under development</p>
        </Modal>
      </div>
    </div>
  );
};

export default SecondaryFooter;
