import { EmptyImage } from '@/constants/imageUrl';
import getImagePath from '@/util/getImagePath';
import { CheckOutlined } from '@ant-design/icons';
import clsx from 'clsx';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
type CardDataType = {
  value: string;
  title?: string;
  label: string | React.ReactNode | any;
};
type NewPaymentMethodCardProps = {
  onClick?: (value: string) => void;
  data?: CardDataType[];
  disable?: string[];
  defaultValue: string;
};

const NewPaymentMethodCard = ({
  data,
  onClick,
  disable,
  defaultValue,
}: NewPaymentMethodCardProps) => {
  const [isSelect, setIsSelect] = useState<string>(defaultValue);

  useEffect(() => {
    onClick && onClick(isSelect);
  }, [isSelect]);

  const handleSelect = (value: string) => {
    setIsSelect(value);
  };
  return (
    <>
      {data?.map((ele: CardDataType, index: number) => {
        return (
          <div
            key={index}
            onClick={() => {
              const find = disable?.find((k) => k === ele.value);
              if (!find) {
                handleSelect(ele.value);
              }
            }}
            className={clsx(
              'xl:col-span-3 col-span-6 p-4 cursor-pointer border border-solid border-LightGrey rounded-md',
              {
                'border-PrimaryBlue': isSelect === ele.value,
                'grayscale !cursor-not-allowed': disable?.some((i) => i === ele.value),
              }
            )}
          >
            <div className="flex flex-row justify-between">
              <div className="flex flex-col gap-y-2">
                <Image
                  className="w-fit h-6"
                  src={getImagePath(ele?.label) || EmptyImage}
                  alt=""
                  width={0}
                  height={0}
                />
                <p>{ele.title}</p>
              </div>

              <CheckOutlined
                className={clsx(
                  isSelect === ele.value ? 'opacity-100' : 'opacity-0',
                  'bg-PrimaryBlue rounded-[50%] text-PrimaryWhite p-1 w-6 h-6 transition-opacity'
                )}
              />
            </div>
          </div>
        );
      })}
    </>
  );
};

export default NewPaymentMethodCard;
