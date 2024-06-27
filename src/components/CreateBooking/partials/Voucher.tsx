import { Wrapper } from '@/components/global/Wrapper';
import { Button, Form, Input } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { VoucherProps } from '../@types';
import DropDownContainer from './DropDownContainer';

const Voucher = ({}: VoucherProps) => {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-[lora] font-normal">Have a gift voucher code?</h2>
        <Link
          href={'./'}
          className="flex items-center justify-start gap-2 hover:text-PrimaryBlack text-PrimaryBlue"
        >
          How I can get the promotional codes and coupons?
        </Link>
      </div>
      <div className="flex gap-4">
        <Form.Item name="voucher" className="w-full mb-0">
          <Input size="large" placeholder="Input vouchers" />
        </Form.Item>
        <Form.Item className="mb-0">
          <Button
            size="large"
            htmlType="submit"
            className="bg-PrimaryBlack text-PrimaryWhite !px-8"
          >
            Apply
          </Button>
        </Form.Item>
      </div>
    </div>
  );
};

export default Voucher;
