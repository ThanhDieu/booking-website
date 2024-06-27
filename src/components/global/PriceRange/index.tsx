/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import PriceRangeProps from './@types';
import { Form, Input, Slider, Typography } from 'antd';
import { defaultTheme } from '@/config/index';
import clsx from 'clsx';
const { Title } = Typography;
import { useIbeTranslation } from '@/hooks';

const PriceRange = ({ value, className, onChange, title }: PriceRangeProps) => {
  const [rangeData, setRangeData] = useState<{ min: number; max: number }>({
    min: 0,
    max: 0,
  });

  useEffect(() => {
    onChange && onChange(rangeData);
  }, [rangeData]);

  useEffect(() => {
    setRangeData({ ...rangeData, min: value?.min, max: value?.max });
  }, [value.max]);

  const resultPage = useIbeTranslation('resultPage');

  return (
    <section className={clsx('bg-primary-switch p-6 rounded-[10px] bg-', className)}>
      <Title level={5} className="font-[lora] !mb-6 !text-xl !leading-[26px] !font-medium">
        {title || `${resultPage?.filterName?.priceRange}`}
      </Title>
      <div>
        <Form className="flex gap-4 mb-6 justify-around">
          <div>
            <label htmlFor="min" className="mb-2 !text-base !leading-5 inline-block">
              {`${resultPage?.filterName?.priceContent?.min}`}
            </label>
            <Input
              prefix={<span className="text-[12px] text-primary-switch">EUR</span>}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                Number(e.target.value) <= rangeData.max &&
                  setRangeData({ ...rangeData, min: Number(e.target.value) });
              }}
              name="min"
              value={rangeData.min?.toLocaleString('de-DE', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
              className=" text-base leading-5 [&>input]:text-right"
              height={50}
            />
          </div>
          <div className="text-right">
            <label htmlFor="max" className="mb-2 !text-base !leading-5 inline-block">
              {`${resultPage?.filterName?.priceContent?.max}`}
            </label>
            <Input
              prefix={<span className="text-[12px] text-primary-switch">EUR</span>}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                Number(e.target.value) <= value.max &&
                  setRangeData({ ...rangeData, max: Number(e.target.value) });
              }}
              className="text-base leading-5 [&>input]:text-right"
              name="max"
              value={rangeData.max?.toLocaleString('de-DE', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
              height={50}
            />
          </div>
        </Form>
        <Slider
          onChange={(e: number[]) => {
            setRangeData({ ...rangeData, min: e[0], max: e[1] });
          }}
          onAfterChange={(e: number[]) => {
            setRangeData({ ...rangeData, min: e[0], max: e[1] });
          }}
          range={{ draggableTrack: true }}
          max={Number(value?.max?.toFixed(2)) || 0}
          value={[rangeData.min, rangeData.max]}
          trackStyle={[{ background: '#3A6EA5' }]}
        />
      </div>
    </section>
  );
};

export default PriceRange;
