import { Form, Checkbox } from 'antd';
import NewPaymentMethodCard from '@/components/CreateBooking/partials/NewPaymentMethod';
import { useIbeTranslation } from '@/hooks';

export interface ViewProps {
  model: {
    methods: {
      title: string;
      value: string;
      label: string;
    }[];
    isCheckedPolicy: boolean;
  };
  handleSelectPayment: (value: string) => void;
  setIsCheckedPolicy: (value: boolean) => void;
}

const View = (props: ViewProps) => {
  const {
    model: { methods, isCheckedPolicy },
    handleSelectPayment,
    setIsCheckedPolicy,
  } = props;

  const payment = useIbeTranslation('bookingSteps.step3.payment');
  const notice = [
    useIbeTranslation('bookingSteps.step3.notice_1'),
    useIbeTranslation('bookingSteps.step3.notice_2'),
  ];
  const acceptCheckbox = useIbeTranslation('bookingSteps.step3.acceptCheckbox');
  const message = useIbeTranslation('general.message');

  return (
    <div className="grid grid-cols-12">
      <div className='invisible h-0'>
        <h2 className="text-xl font-[lora] font-normal col-span-12 mb-3">{payment?.title}</h2>
        <div className="col-span-12 grid grid-cols-12">
          <NewPaymentMethodCard
            defaultValue={methods[0].value}
            onClick={(value) => handleSelectPayment(value)}
            data={methods}
          />
        </div>
      </div>

      {/****** Aceept ******/}
      <Form.Item
        name={'policy'}
        rules={[
          {
            required: !isCheckedPolicy,
            message: message?.readOurPolicy,
          },
        ]}
        className="my-3 col-span-12"
      >
        <Checkbox
          checked={isCheckedPolicy}
          onChange={(e) => {
            setIsCheckedPolicy(e.target.checked);
          }}
          style={{ lineHeight: '32px' }}
        >
          <div className="flex gap-1">{acceptCheckbox}</div>
        </Checkbox>
      </Form.Item>

      <div className="p-4 bg-secondary-switch flex flex-col gap-y-2 rounded-lg col-span-12">
        {notice?.length
          ? notice.map((item: { title: string; description: string }, index: number) => (
              <p key={index} className="text-xs  font-light">
                <span className="font-normal">{item?.title}</span>: {item?.description}
              </p>
            ))
          : ''}
      </div>
    </div>
  );
};

export default View;
