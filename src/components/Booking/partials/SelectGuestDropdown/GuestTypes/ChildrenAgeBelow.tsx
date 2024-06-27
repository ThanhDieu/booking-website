/* eslint-disable react-hooks/exhaustive-deps */
import { useIbeTranslation } from '@/hooks';
import { Select, Typography } from 'antd';
import clsx from 'clsx';
import { useEffect } from 'react';
const { Text } = Typography;

export interface ChildrenAgeBelowProps {
  title: string;
  className?: string;
  onClick?: (value: number) => void;
  contentStrapiPlaceholder?: string;
  defaultValue?: number;
}

export interface SelectedType {
  value: number;
  label: string;
}

const ChildrenAgeBelow = ({
  title,
  className,
  onClick,
  contentStrapiPlaceholder,
  defaultValue,
}: ChildrenAgeBelowProps) => {
  const onChange = (value: number) => {
    onClick && onClick(value);
  };

  const searchMenu = useIbeTranslation('searchMenu');

  const onSearch = (value: string) => {
    onClick && onClick(Number(value));
  };

  useEffect(() => {
    if (!defaultValue) onClick && onClick(Number(0));
  }, [defaultValue]);

  return (
    <div className={clsx(className, 'flex justify-between items-center pt-2')}>
      <Text>{title}</Text>
      <Select
        className="rounded-md w-28"
        bordered={false}
        showSearch
        value={defaultValue}
        optionFilterProp={searchMenu?.guestAndRoom?.children}
        onChange={onChange}
        onSearch={onSearch}
        filterOption={(input, option) =>
          (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
        }
        options={Array.from({ length: 18 }, (_, index) => ({
          value: index,
          label: `${index} ${contentStrapiPlaceholder}`,
        }))}
      />
    </div>
  );
};

export default ChildrenAgeBelow;
