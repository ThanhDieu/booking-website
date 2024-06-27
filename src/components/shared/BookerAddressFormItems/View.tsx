import { BookerAddressFormViewProps } from '.';
import { ChangeProps } from './types';
import { CountryCodeType } from '@/types/createBooking/PaymentType';
import { Form, Select, Input } from 'antd';
import { useIbeTranslation } from '@/hooks';
import regexModel from '@/constants/regex';
import useTopCountries from '@/hooks/useTopCountries';

interface ViewProps {
  model: BookerAddressFormViewProps;
  onFieldChange: (change: ChangeProps) => void;
}

const View = (props: ViewProps) => {
  const {
    model: { title, fields },
    onFieldChange,
  } = props;

  const message = useIbeTranslation('general.message');
  const address = useIbeTranslation('bookingSteps.step3.address');
  
  // Render prefered country name on top
  const modifiedCountries = useTopCountries();
  
  return (
    <div className="grid grid-cols-12 gap-4">
      <h2 className="col-span-12 text-xl font-[lora] font-normal">{title || address.title}</h2>

      <Form.Item
        initialValue={fields.street}
        rules={[{ required: true, message: message?.required }]}
        name="street"
        className="col-span-12 !mb-0"
      >
        <Input
          placeholder={address?.placeholder?.street}
          size="large"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            onFieldChange({ field: 'street', value: e?.target?.value });
          }}
        />
      </Form.Item>

      <Form.Item
        initialValue={fields.postalCode}
        rules={[
          { required: true, message: message?.required },
          { pattern: regexModel.validateNumber, message: message?.number },
        ]}
        name="postalCode"
        className="lg:col-span-4 col-span-12 !mb-0"
      >
        <Input
          size="large"
          placeholder={address?.placeholder?.postalCode}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            onFieldChange({ field: 'postalCode', value: e?.target?.value });
          }}
        />
      </Form.Item>

      <Form.Item
        initialValue={fields.region?.length && fields.region || undefined}
        rules={[{ required: true, message: message?.required }]}
        name="country"
        className="lg:col-span-4 col-span-12 !mb-0"
      >
        <Select
          size="large"
          showSearch
          placeholder={address?.placeholder?.country}
          optionFilterProp="children"
          filterOption={(input, option: any) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          options={modifiedCountries?.map((ele: CountryCodeType) => ({
            label: ele.countryName,
            value: ele.countryCode,
          }))}
          onChange={(value: string) => {
            onFieldChange({ field: 'region', value });
          }}
        />
      </Form.Item>

      <Form.Item initialValue={fields.city} name="city" className="lg:col-span-4 col-span-12 !mb-0">
        <Input
          placeholder={address?.placeholder?.province}
          size="large"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            onFieldChange({ field: 'city', value: e?.target?.value });
          }}
        />
      </Form.Item>

      <h2 className="text-xl font-[lora] font-normal col-span-12 mt-4">
        {useIbeTranslation('bookingSteps.step3.note')}
      </h2>
      <Form.Item initialValue={fields.note} name="bookerComment" className="col-span-12">
        <Input.TextArea
          rows={5}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            onFieldChange({ field: 'note', value: e?.target?.value });
          }}
        />
      </Form.Item>
    </div>
  );
};

export default View;
