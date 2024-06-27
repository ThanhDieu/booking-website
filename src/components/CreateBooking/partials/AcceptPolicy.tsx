import { Checkbox, Form } from 'antd';
import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';

export interface AcceptPolicyProps {}

const AcceptPolicy = ({}: AcceptPolicyProps) => {
  return (
    <div>
      <Form.Item className="mb-0 my-4">
        <Checkbox style={{ lineHeight: '32px' }}>
          <div className="flex gap-1">
            <b>I accept the</b>
            <Link
              href={''}
              className="flex items-center justify-start gap-2 hover:text-PrimaryBlack text-PrimaryBlue"
            >
              general terms and conditions and booking conditions
            </Link>
            <b> of the hotel.</b>
          </div>
        </Checkbox>
      </Form.Item>
    </div>
  );
};

export default AcceptPolicy;
