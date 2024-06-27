/* eslint-disable react-hooks/exhaustive-deps */
import { Typography } from 'antd';
import clsx from 'clsx';
import { Key, useEffect, useState } from 'react';
import BoxContent from '../BoxContent';
import FilterBoxProps, { FilterBoxDataType, SelectType } from './@types';
const { Title } = Typography;

const FilterBox = ({ data, className, onClick, title, selectType, defaultVal }: FilterBoxProps) => {
  const [selectFill, setSelectFill] = useState<string[]>([]);
  const [selectFillSingle, setSelectFillSingle] = useState<string>('');
  const handleSelected = (value: any) => {
    if (selectType === SelectType.multiple) {
      if (!selectFill.includes(value)) {
        setSelectFill([...selectFill, value]);
        onClick && onClick([...selectFill, value]);
      } else {
        const newData = selectFill?.length ? selectFill?.filter((ele) => ele !== value) : [];
        setSelectFill(newData);
        onClick && onClick(newData);
      }
    } else if (selectType === SelectType.single) {
      if (selectFillSingle && selectFillSingle.includes(value)) {
        setSelectFillSingle('');
        onClick && onClick('');
      } else {
        setSelectFillSingle(value);
        onClick && onClick(value);
      }
    }
  };
  useEffect(() => {
    if (selectType === SelectType.multiple) {
      setSelectFill(defaultVal || []);
    } else if (selectType === SelectType.single) {
      setSelectFillSingle(defaultVal?.length ? defaultVal[0] : '');
    }
  }, [defaultVal]);


  return (
    <section
      className={clsx('mt-6 first-of-type:mt-0 p-6 rounded-[10px] bg-primary-switch', className)}
    >
      <Title className="font-[lora] !mb-6 !text-xl !leading-[26px] !font-medium" level={4}>
        {title}
      </Title>
      {data?.map((ele: FilterBoxDataType, index: Key) => {
        return (
          <BoxContent
            className={clsx(
              {
                'border-2 border-solid !border-PrimaryBlue':
                  (selectType === SelectType.multiple && selectFill.some((e) => e === ele.id)) ||
                  (selectType === SelectType.single && ele.id === selectFillSingle),
              },
              'transition-all duration-200'
            )}
            onClick={() => handleSelected(ele?.id)}
            style="box"
            key={index}
            icon={ele?.icon ? ele.icon : ''}
            label={ele?.label}
          />
        );
      })}
    </section>
  );
};

export default FilterBox;
