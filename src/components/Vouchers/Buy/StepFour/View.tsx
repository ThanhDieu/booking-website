import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

interface ViewProps {
  model: {
    voucherCode: string;
  };
}

const View = (props: ViewProps) => {
  const {
    model: { voucherCode },
  } = props;

  return (
    <div className="flex flex-col col-span-12 mr-16 self-start">
      {/*WARNING static content  */}
      <h2 className="col-span-12 mb-8 text-xl font-[lora] font-normal">Thank you</h2>

      <div className="mb-4">Payment success. Thank you for your purchase.</div>
      <div className="mb-4">Your voucher: </div>
      {!voucherCode && <Spin indicator={antIcon} />}
      {voucherCode && <h5 className="mb-4 break-words">{voucherCode}</h5>}
    </div>
  );
};

export default View;
