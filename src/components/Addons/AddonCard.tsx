import { EmptyImage } from '@/constants/imageUrl';
import { useIbeTranslation } from '@/hooks';
import { useAppDispatch } from '@/store/hooks';
import { decreaseQuantityService, increaseQuantityService } from '@/store/slice/invoceSlice';
import addonCard from '@/types/addonsType/addonCardType';
import clsx from 'clsx';
import Image from 'next/image';
import { useState } from 'react';
import ButtonShare, { ButtonSize } from '../global/ButtonShare';
import Currency from '../global/CurrencyComponent';

const AddonCard = ({
  image,
  title,
  content,
  price,
  isHot,
  quantity,
  isSelected,
  serviceId,
  maxCount,
  onClick,
  className,
}: addonCard) => {
  const dispatch = useAppDispatch();
  const [loadingBtn, setLoadingBtn] = useState<boolean>(false);
  const step2 = useIbeTranslation('bookingSteps.step2');

  return (
    <div
      className={clsx(
        'cursor-default rounded-lg bg-primary-switch h-[404px] flex flex-col items-start p-0 overflow-hidden',
        className
      )}
    >
      <div className="w-full h-[212px] relative overflow-hidden">
        <Image
          src={image || image !== '' ? image : EmptyImage}
          fill
          alt="addon photo"
          className="h-fit scaleImage object-cover overflow-hidden"
        />
        {isHot && (
          <div
            className="text-PrimaryWhite bg-PrimaryBlue font-[14px] text-center leading-[24px] w-full h-7 absolute top-0"
          // style={{ transform: 'matrix(0.71, 0.71, -0.71, 0.71, 0, 0)' }}
          >
            {step2?.popular || "Popular!"}
          </div>
        )}
      </div>
      <div className="flex flex-col p-4 justify-between w-full h-[192px]">
        <div
          style={{ whiteSpace: 'pre-wrap' }}
          className="font-[Lora] font-normal text-primary-switch text-[24px] leading-8 h-16 textDesc-2"
        >
          {title}
        </div>
        <div className="font-normal text-secondary-switch text-[14px] leading-5 textDesc-1">
          {content}
        </div>
        <div className="flex justify-between items-center">
          <Currency fontSize="text-[20px]" price={price} />
          {!isSelected && (
            <div className="h-8">
              <ButtonShare
                onClick={() => {
                  setLoadingBtn(true);
                  setTimeout(() => {
                    onClick && onClick();
                    setLoadingBtn(false);
                  }, 200);
                  onClick;
                }}
                content={step2?.buttonText}
                spin={loadingBtn}
                size={ButtonSize.SMALL}
              />
            </div>
          )}
          {isSelected && (
            <>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ButtonShare
                    content="-"
                    onClick={() => {
                      dispatch(decreaseQuantityService(serviceId));
                    }}
                    style="outline"
                    className="!rounded-[50%] w-8 h-8 !p-0"
                  />
                  <span className="text-[16x]">{quantity}</span>

                  <ButtonShare
                    content="+"
                    onClick={() => {
                      dispatch(increaseQuantityService(serviceId));
                    }}
                    style="outline"
                    className="!rounded-[50%] w-8 h-8 !p-0"
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddonCard;
