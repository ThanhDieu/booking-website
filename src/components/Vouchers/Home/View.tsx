import Image from 'next/image';
import { VouchersPageProps } from '@/pages/vouchers';
import getImagePath from '@/util/getImagePath';
import VoucherList from '../partials/VoucherList';
import Headlines from '@/components/global/Headlines';
import { Wrapper } from '@/components/global/Wrapper';
import SEOComponent from '@/components/global/SEO';

interface ViewProps {
  model: VouchersPageProps;
}

const View = (props: ViewProps) => {
  const {
    model: { heroBanner, vouchers, seo },
  } = props;

  return (
    <Wrapper>
      <SEOComponent data={{seo}} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-12 text-primary-switch ">
        <div className="pr-12 ">
          <div className="text-base leading-5 font-normal text-PrimaryBlue">
            {heroBanner?.subTitle}
          </div>
          <h1 className="text-primary-switch text-4xl leading-[43px] font-normal font-[Lora] mb-8">
            {heroBanner?.title}
          </h1>
          <p className="leading-[26px]">{heroBanner?.description}</p>
        </div>
        <div>
          <Image
            src={getImagePath(heroBanner?.image?.data?.attributes?.url)}
            className="w-full h-full rounded-xl"
            alt={'voucher hero banner'}
            width={486}
            height={324}
          />
        </div>
      </div>
      <VoucherList data={{ vouchers }} />
    </Wrapper>
  );
};

export default View;
