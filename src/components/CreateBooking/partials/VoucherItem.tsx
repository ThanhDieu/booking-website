import Currency from '@/components/global/CurrencyComponent';
import { XIcon } from '@/library';
import React, { ReactNode } from 'react';

type VoucherItemProps = {
  className?: string;
  price?: number;
  onRemove?: () => void;
};

const VoucherItem = ({ price, className, onRemove }: VoucherItemProps) => {
  return (
    <div className="bg-PrimaryYellow p-1 flex items-center justify-center gap-2 w-full rounded text-sm leading-[18px]">
      <Currency color="text-PrimaryBlack" price={price || 0} />
      <div
        onClick={onRemove}
        className="flex cursor-pointer hover:text-PrimaryRed text-PrimaryBlack"
      >
        <XIcon />
      </div>
    </div>
  );
};

export default VoucherItem;
