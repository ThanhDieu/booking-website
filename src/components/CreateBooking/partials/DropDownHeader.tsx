import React, { useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';

interface IProps {
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  showChildren?: boolean;
}

const DropDownHeader = ({ title, subtitle, icon, onClick, showChildren }: IProps) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between mb-1">
        <h2 className="text-2xl font-[lora] font-normal">{title}</h2>
        {/* {icon ? (
          icon
        ) : (
          <div
            onClick={onClick}
            className="w-8 h-8 rounded-[50%] bg-MidGrey my-auto text-center cursor-pointer"
          >
            <Image
              src={require('../../../../public/images/payment/drop-up.svg')}
              height={0}
              alt=""
              className={clsx(
                showChildren && 'rotate-180',
                `w-6 h-8 transition-transform duration-200 ease-in-out`
              )}
            />
          </div>
        )} */}
      </div>
      {subtitle && <p className="text-sm text-secondary-switch">{subtitle}</p>}
    </div>
  );
};

export default DropDownHeader;
