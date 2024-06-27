import TwoColumnLayout from '@/components/Layouts/TwoColumnLayout';
import Image from 'next/image';
import { EmptyImage } from '@/constants/imageUrl';
import getImagePath from '@/util/getImagePath';
import { BookingSummaryItem, BookingSummaryModel, BookingItemProps } from '.';
import ButtonShare from '@/components/global/ButtonShare';
import { useAppSelector } from '@/store/hooks';
import { ThemeType } from '@/store/slice/themeSlice';

interface ViewProps {
  model: BookingSummaryModel;
  handleNextButton: () => void;
  handlePreviousButton: () => void;
}

const View = (props: ViewProps) => {
  const { selected } = useAppSelector((state) => state.themeSlice);
  const {
    model: {
      bookerInfo,
      bookerAddress,
      propertyLogo,
      items,
      sum,
      discount,
      totalPrice,
      nextButtonText,
      previousButtonText,
    },
    handleNextButton,
    handlePreviousButton,
  } = props;

  let defaultLogo =''
  selected === ThemeType.default 
    ? defaultLogo = '/images/logos/FooterLogo.png' 
    : defaultLogo = '/images/logos/HeaderLogo.png'
    
  const { firstName, lastName, email, phone } = bookerInfo.fields;

  const Divider = () => (
    <div className="border-solid border-x-0 border-t border-b-0 border-[#DADCE0] mt-4" />
  );

  return (
    <TwoColumnLayout>
      {/* left column */}
      <div className="flex flex-col p-6">
        {items.map((item: BookingSummaryItem) => (
          <div key={item.heading} className="flex flex-col">
            <h5 className="font-normal mb-4">{item.heading}</h5>
            {item.items.map((detail: BookingItemProps) => (
              <div key={detail.title} className="flex flex-col justify-center w-full">
                <div className="flex">
                  <div className="font-semibold basis-4/5 self-start mb-4">{detail.title}</div>
                  <div className="flex flex-row basis-1/5 justify-between">
                    <div className='mr-2'>{`x${detail.qty}`}</div>
                    <div>{detail.amount}</div>
                  </div>
                </div>

                {detail.description?.map((desItem: string, index: number) => (
                  <div
                    className="text-[14px] font-normal text-secondary-switch "
                    key={`des-${index}`}
                  >
                    {desItem}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}

        <Divider />

        <div className="flex w-full justify-between mt-8 flex-wrap gap-4">
          <ButtonShare onClick={handlePreviousButton} size="medium" content={previousButtonText} />
          {/* <ButtonShare
            style="dark"
            size="medium"
            htmlType="submit"
            onClick={handleNextButton}
            content={nextButtonText}
          /> */}
        </div>
      </div>

      {/* right column */}
      <div className="flex flex-col p-4">
        <h5 className="font-[Lora] mb-2 font-normal">{`${firstName} - ${firstName} ${lastName}`}</h5>
        <div className="mb-1">{email}</div>
        {phone && <div className="mb-1">{phone}</div>}
        <div className="mb-1">{`${bookerAddress.fields.street}, ${bookerAddress.fields.city}. ${bookerAddress.fields.region}`}</div>

        <Divider />

        <div className="flex flex-col items-start mt-4">
          <h5 className="font-[Lora] mb-2 font-normal">Payment detail</h5>
          <div className="flex flex-col items-start justify-start">
            <div className="flex w-full items-center justify-between">
              <div className="">Credit card</div>
              <div className="flex items-center justify-start gap-4 my-2">
                <Image
                  width={48}
                  height={16}
                  alt="visa"
                  src="/images/payment/visa-brandmark-blue-rgb-2021-1.svg"
                />
                <Image
                  width={27}
                  height={16}
                  alt="master card"
                  src="/images/payment/mastercard-logo-1.svg"
                />
                <Image
                  width={15}
                  height={16}
                  alt="maestro"
                  src="/images/payment/maestro-logo-2.svg"
                />
              </div>
            </div>
            <i className="text-[12px]">
              Go to next step to enter your details and pay for the booking.
            </i>
          </div>
        </div>

        <Divider />

        <div className="w-fit h-16 mt-4">
          <Image
            src={propertyLogo ? getImagePath(propertyLogo) : defaultLogo}
            width={0}
            height={0}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </TwoColumnLayout>
  );
};

export default View;
