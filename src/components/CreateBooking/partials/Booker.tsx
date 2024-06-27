import { Checkbox, Col, DatePicker, Form, Input, Row, Select } from 'antd';
const { Option } = Select;
import React from 'react';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';


export enum FormType {
  Booker = 'booker',
  Guest = 'guest',
}
export interface BookerProps {
  formType?: FormType.Booker | FormType.Guest;
  keyName?: string | number;
  defaultVal?: boolean;
  onChecked?: (checked: boolean) => void;
}

const Booker = ({ formType, keyName, onChecked, defaultVal }: BookerProps) => {

  const handleChange = (e: CheckboxChangeEvent) => onChecked && onChecked(e.target.checked)

  return (
    <>
        <h2 className="text-2xl font-[lora] font-normal">Booker’s information</h2>

      <Row gutter={16}>
        <Col span={4}>
          <Form.Item name={keyName ? `title${keyName}` : "title"} rules={[{ required: true, message: 'Please select gender!' }]}>
            <Select placeholder="Title">
              <Option value="Mr">Mr.</Option>
              <Option value="Ms">Ms.</Option>
              <Option value="Mrs">Mrs.</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={10}>
          <Form.Item name={keyName ? `firstName${keyName}` : "firstName"} 
          rules={[
            { required: true, message: 'Please input your first name!' },
            {
              pattern: /(^[a-z ]+$)/i,
              message: 'Please enter a valid channel ID',
            }
            ]}>
            <Input placeholder="First name" />
          </Form.Item>
        </Col>
        <Col span={10}>
          <Form.Item name={keyName ? `lastName${keyName}`:"lastName"} 
          rules={[
            { required: true, message: 'Please input your last name!' },
            {
              pattern: /(^[a-z ]+$)/i,
              message: 'Please enter a valid channel ID',
            }
          ]}
          >
            <Input placeholder="Last name" />
          </Form.Item>
        </Col>
        <Col span={4}></Col>
        <Col span={10}>
          <Form.Item name='phoneNumber'          >
            <Input placeholder="(+49) 5321 68 55 40" />
          </Form.Item>
        </Col>
        <Col span={10}>
          <Form.Item name='email'>
            <Input placeholder="machiel@design.com" />
          </Form.Item>
        </Col>
        <Form.Item name="checkbox" className="mb-0 pl-2">
            <Checkbox onChange={handleChange} style={{ lineHeight: '32px' }}>
              Is the person making the reservation a guest?
            </Checkbox>
          </Form.Item>
      </Row>
      {formType === FormType.Booker && (
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="phoneNumber" rules={[
              { required: true, message: 'Please input your number phone!' }, 
              
          ]}>
              <Input type='number' placeholder="Phone number" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
              <Input type="email" placeholder="E-mail" />
            </Form.Item>
          </Col>
          <Form.Item name="checkbox" className="mb-0 pl-2">
            <Checkbox onChange={handleChange} style={{ lineHeight: '32px' }}>
              Is the person making the reservation a guest?
            </Checkbox>
          </Form.Item>
        </Row>
      )}
      {formType === FormType.Guest && (
        <Row gutter={16}>
          <Col span={4}></Col>
          <Col span={10}>
            <Form.Item name={keyName ? `birthDay${keyName}`:"birthDay"} className="mb-0">
              <DatePicker placeholder="Birthday" className="w-full" format={'DD.MM.YYYY'} />
            </Form.Item>
          </Col>
        </Row>
      )}
      
    </>
  );
};

export default Booker;
