import React, { useState } from 'react';
import AlertProps from './@types';
import { Button, Typography } from 'antd';
import { defaultTheme } from '@/config';

const { Title, Text } = Typography;
const Alert = ({ content }: AlertProps) => {
  const [isClose, setIsClose] = useState<Boolean>(true);

  return (
    isClose && (
      <section className="h-[60px] rounded-[10px] flex justify-between items-center px-4 bg-primary-switch">
        <div className="flex gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={22}
            viewBox="0 0 24 22"
            fill="currentColor"
          >
            <path
              d="M10.2679 0.999999C11.0377 -0.333334 12.9622 -0.333332 13.732 1L23.2583 17.5C24.0281 18.8333 23.0658 20.5 21.5262 20.5H2.47369C0.934085 20.5 -0.028164 18.8333 0.741636 17.5L10.2679 0.999999Z"
              fill="currentColor"
            />
            <path
              d="M13 6.36364L12.8864 14.7273H11.5682L11.4545 6.36364H13ZM12.2273 18.0909C11.947 18.0909 11.7064 17.9905 11.5057 17.7898C11.3049 17.589 11.2045 17.3485 11.2045 17.0682C11.2045 16.7879 11.3049 16.5473 11.5057 16.3466C11.7064 16.1458 11.947 16.0455 12.2273 16.0455C12.5076 16.0455 12.7481 16.1458 12.9489 16.3466C13.1496 16.5473 13.25 16.7879 13.25 17.0682C13.25 17.2538 13.2027 17.4242 13.108 17.5795C13.017 17.7348 12.8939 17.8598 12.7386 17.9545C12.5871 18.0455 12.4167 18.0909 12.2273 18.0909Z"
              fill="currentColor"
            />
          </svg>
          <Text className="text-[16px]">{content}</Text>
        </div>
        <Button
          style={{ outline: 'none', border: 'none', boxShadow: 'none' }}
          onClick={() => setIsClose(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </Button>
      </section>
    )
  );
};

export default Alert;
