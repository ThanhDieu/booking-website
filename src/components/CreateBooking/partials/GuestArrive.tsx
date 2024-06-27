import ButtonShare from '@/components/global/ButtonShare';
import React from 'react';
import { GuestArriveProps } from '../@types';

const GuestArrive = ({ title, subTitle, dataContent, onClick }: GuestArriveProps) => {
  return (
    <div className="bg-primary-switch mt-2 p-4 border border-solid border-switch rounded-md">
      <div className="flex justify-between items-center">
        <div className="w-3/4">
          <h3 className="text-[20px] font-medium">{title}</h3>
          <p className="text-[14px] font-normal text-PrimaryBlack">{subTitle}</p>
        </div>
        <div className="text-right w-1/4">
          <ButtonShare onClick={onClick && onClick} className="!p-2" content="Close" />
        </div>
      </div>
      <div>{dataContent}</div>
    </div>
  );
};

export default GuestArrive;
