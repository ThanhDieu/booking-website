import { RecipientFormViewProps } from '.';
import { ChangeProps } from './types';
import { genderType } from '@/constants/paymentConst';
import { Form, Select, Input } from 'antd';
import { useIbeTranslation } from '@/hooks';
import regexModel from '@/constants/regex';
const { Option } = Select;
const { TextArea } = Input;

interface ViewProps {
  model: RecipientFormViewProps;
  onFieldChange: (change: ChangeProps) => void;
}

const View = (props: ViewProps) => {
  const {
    model: { title, fields, showEmail },
    onFieldChange,
  } = props;

  const message = useIbeTranslation('general.message');
  const bookerInfor = useIbeTranslation('bookingSteps.step3.booker');

  return (
    <div className="grid grid-cols-12 gap-4 mb-4">
      <h2 className="col-span-12 text-xl font-[lora] font-normal">{title}</h2>
      <Form.Item
        initialValue={genderType.MALE}
        rules={[{ required: true, message: message?.required }]}
        name="recipientTitle"
        className="lg:col-span-2 col-span-12  !mb-0"
      >
        <Select
          onChange={(value: string) => {
            onFieldChange({ field: 'title', value });
          }}
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
        name="recipientFistName"
        className="lg:col-span-5 col-span-6 !mb-0"
      >
        <Input
          size="large"
          placeholder={bookerInfor?.placeholder?.firstName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onFieldChange({ field: 'firstName', value: e?.target?.value })
          }
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
        name="recipientLastName"
        className="lg:col-span-5 col-span-6 !mb-0"
      >
        <Input
          size="large"
          placeholder={bookerInfor?.placeholder?.lastName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onFieldChange({ field: 'lastName', value: e?.target?.value })
          }
        />
      </Form.Item>

      <Form.Item
        initialValue={fields.message}
        rules={[{ message: message?.required }]}
        name="recipientMessage"
        className="col-span-12 !mb-0"
      >
        <TextArea
          autoSize={{ minRows: 3, maxRows: 5 }}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            onFieldChange({ field: 'message', value: e?.target?.value })
          }
          placeholder="Message"
        />
      </Form.Item>

      {showEmail && (
        <Form.Item
          initialValue={fields.email}
          rules={[{ required: true, message: message?.required }]}
          name="recipientEmail"
          className="lg:col-span-8 col-span-12"
        >
          <Input
            size="large"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onFieldChange({ field: 'email', value: e?.target?.value })
            }
            placeholder={bookerInfor?.placeholder?.email}
            type="email"
          />
        </Form.Item>
      )}
    </div>
  );
};

export default View;
