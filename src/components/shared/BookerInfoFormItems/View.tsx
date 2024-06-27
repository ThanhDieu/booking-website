import { BookerInfoFormViewProps } from '.';
import { ChangeProps } from './types';
import { genderType } from '@/constants/paymentConst';
import { Form, Select, Input } from 'antd';
import { useIbeTranslation } from '@/hooks';
import regexModel from '@/constants/regex';
const { Option } = Select;

interface ViewProps {
  model: BookerInfoFormViewProps;
  onFieldChange: (change: ChangeProps) => void;
}

const View = (props: ViewProps) => {
  const {
    model: { title, fields },
    onFieldChange,
  } = props;

  const message = useIbeTranslation('general.message');
  const bookerInfor = useIbeTranslation('bookingSteps.step3.booker');

  return (
    <div className="grid grid-cols-12 gap-4 mb-4">
      <h2 className="col-span-12 text-xl font-[lora] font-normal">{title || bookerInfor.title}</h2>

      <Form.Item
        initialValue={genderType.MALE}
        rules={[{ required: true, message: message?.required }]}
        name="bookerTitle"
        className="lg:col-span-2 col-span-12 !mb-0"
      >
        <Select
          onChange={(value: string) => onFieldChange({ field: 'title', value })}
          placeholder={bookerInfor?.placeholder?.title}
          size="large"
        >
          <Option value={genderType.MALE}>Mr.</Option>
          <Option value={genderType.FEMALE}>Ms.</Option>
          <Option value={genderType.OTHER}>Other</Option>
        </Select>
      </Form.Item>

      <Form.Item
        initialValue={fields.firstName}
        rules={[
          { required: true, message: message?.required },
          {
            pattern: regexModel.validateInputPattern,
            message: message?.numberAndspecialCharacters,
          },
        ]}
        name="bookerFistName"
        className="lg:col-span-5 col-span-6 !mb-0"
      >
        <Input
          size="large"
          placeholder={bookerInfor?.placeholder?.firstName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            onFieldChange({ field: 'firstName', value: e?.target?.value });
          }}
        />
      </Form.Item>

      <Form.Item
        initialValue={fields.lastName}
        rules={[
          { required: true, message: message?.required },
          {
            pattern: regexModel.validateInputPattern,
            message: message?.numberAndspecialCharacters,
          },
        ]}
        name="bookerLastName"
        className="lg:col-span-5 col-span-6 !mb-0"
      >
        <Input
          size="large"
          placeholder={bookerInfor?.placeholder?.lastName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            onFieldChange({ field: 'lastName', value: e?.target?.value });
          }}
        />
      </Form.Item>

      <Form.Item
        initialValue={fields.email}
        rules={[{ required: true, message: message?.required }]}
        name="bookerEmail"
        className="lg:col-span-8 col-span-12 justify-end"
      >
        <Input
          size="large"
          placeholder={bookerInfor?.placeholder?.email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            onFieldChange({ field: 'email', value: e?.target?.value });
          }}
        />
      </Form.Item>
    </div>
  );
};

export default View;
