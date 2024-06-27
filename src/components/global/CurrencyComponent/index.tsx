import clsx from 'clsx';
import React from 'react';

const currencyModel = {
  EUR: 'EUR',
  USD: 'USD',
  VND: 'VND',
};

type CurrencyProps = {
  price?: number;
  color?: string;
  fontSize?: string;
  leading?: string;
  fontWeight?: string;
};

const Currency = ({ price, color, fontSize, leading, fontWeight }: CurrencyProps) => {
  return (
    <div className="flex flex-row gap-2 justify-end items-center text-primary-switch">
      <div
        className={clsx(
          fontSize && fontSize,
          color ? color : 'text-primary-switch',
          leading && leading,
          fontWeight && fontWeight
        )}
      >
        {price?.toLocaleString('de-DE', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </div>
      <div
        className={clsx(
          fontSize && fontSize,
          color ? color : 'text-primary-switch',
          leading && leading,
          fontWeight && fontWeight
        )}
      >
        {currencyModel.EUR}
      </div>
    </div>
  );
};

export default Currency;
