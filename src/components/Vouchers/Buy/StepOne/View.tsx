import Image from 'next/image';
import { EmptyImage } from '@/constants/imageUrl';
import getImagePath from '@/util/getImagePath';
import Currency from '@/components/global/CurrencyComponent';
import { StepOneProps } from '.';

interface ViewProps {
  model: StepOneProps;
}

const View = (props: ViewProps) => {
  const {
    model: { voucher },
  } = props;

  const photos = voucher?.photos?.file?.data?.map((file: any) => file.attributes?.url) || [];

  return (
    <>
      <div className="lg:col-span-3 col-span-9">
        <Image
          src={voucher ? getImagePath(photos[0]) : EmptyImage}
          className="w-full h-full rounded-lg"
          alt={'voucher image'}
          width={486}
          height={324}
        />
      </div>
      <div className="lg:col-span-3 col-span-9">
        <h1 className="font-[Lora] mb-8 mt-2">{voucher?.title}</h1>
        <div className="leading-6">{voucher?.description}</div>
        <div className="flex flex-row justify-between py-2 items-center">
          <div className="text-PrimaryBlue">{voucher?.subTitle}</div>
          <div className="">
            <Currency fontSize="text-3xl" price={voucher?.value || 0} />
          </div>
        </div>
      </div>
    </>
  );
};

export default View;
