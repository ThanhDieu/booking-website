import Voucher, { VoucherProps } from '../Voucher';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import Headlines from '@/components/global/Headlines';

interface ViewProps {
  title:string;
  model: {
    vouchers: VoucherProps[];
  };
}

const splideOptions = {
  rewind: false,
  perPage: 3,
  gap: '1.5rem',
  perMove: 1,
  pagination: false,
  lazyLoad: true,
  breakpoints: {
    768: {
      perPage: 2,
      gap: '1.5rem',
      arrows: false,
      pagination: true,
    },
    480: {
      perPage: 1,
      arrows: false,
      pagination: true,
    },
  },
};

const View = (props: ViewProps) => {
  const {
    title,
    model: { vouchers },
  } = props;

  return (
    <>
      <h2 className="font-[Lora] mb-8 mt-12 text-2xl font-normal">{title}</h2>
      <div className="holiday">
        <Splide aria-label="holiday slide" options={splideOptions}>
          {vouchers?.map((voucher) => (
            <SplideSlide key={voucher.id} className="cursor-grab">
              <Voucher key={voucher.id} data={voucher} />
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </>
  );
};

export default View;
