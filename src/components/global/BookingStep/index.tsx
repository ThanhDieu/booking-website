/* eslint-disable react-hooks/exhaustive-deps */
import { pathPage } from '@/constants';
import { StepPathType } from '@/constants/stepData';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { thunkGetOfferDetail } from '@/store/slice/offerSlice';
import { querySearchParams } from '@/util/searchParams';
import { useTranslation } from '@m0-0a/next-intl';
import { message } from 'antd';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import BookingStepProps, { BookingStepData } from './@types';

const BookingStep = ({ activeStep }: BookingStepProps) => {
  const { t } = useTranslation();
  const { serviceAddons } = useAppSelector((state) => state.invoiceSlice);
  const { bundlePrice } = useAppSelector((state) => state.invoiceSlice);
  const { searchValue } = useAppSelector((state) => state.bundleSlice);
  const { booker } = useAppSelector((state) => state.bookingSlice);
  const { folios } = useAppSelector((state) => state.foliosSlice);
  const { isOpenGuest } = useAppSelector((state) => state.commonSlice);

  const dispatch = useAppDispatch();

  const [fixed, setFixed] = useState(false);
  const [isDisable, setIsDisable] = useState<boolean>(false);

  const router = useRouter();
  const isBookingOffer = router?.asPath?.includes(pathPage.offer);
  const { offerId } = router.query;

  let processMenuList = Array.from([1, 2, 3, 4, 5]).map((step: number) => ({
    step: t(`general_processMenu_${step}_step`),
    stepName: t(`general_processMenu_${step}_stepName`),
    slug: t(`general_processMenu_${step}_slug`),
  }));

  if (router.asPath.includes(pathPage.offer)) {
    processMenuList[0].stepName = t(`bookingSteps_step1_offerDetail`);
  }

  useEffect(() => {
    window.addEventListener('scroll', () =>
      window.scrollY > 0 ? setFixed(true) : setFixed(false)
    );
  }, []);

  // OFFER PAGE
  useEffect(() => {
    if (offerId && ([1, 2, 3].includes(activeStep))) dispatch(thunkGetOfferDetail(offerId as string)).then((res: any) => {
      !res?.payload && router.push(`/${pathPage.notFound}`);
    })
  }, [offerId])

  /** handle navigate with process bar */
  const handleNavigate = async (step: number) => {
    const offerQueryParam = `?offerId=${offerId}`;
    if (step === processMenuList[0].step * 1) {
      if (isBookingOffer) {
        return router.replace(`/${StepPathType.offerId}/${offerId}`);
      } else if (bundlePrice) {
        return router.replace(
          `/${StepPathType.bundleId}${bundlePrice.bundleId}${searchValue ? `?${querySearchParams(searchValue)}` : ''
          }`
        );
      } else {
        message.error('can not next');
      }
    } else if (step === processMenuList[1].step * 1) {
      if (isBookingOffer && searchValue) {
        return router.replace(
          `/${StepPathType.addons}/${searchValue.propertyId}${offerQueryParam}`
        );
      }
      if (
        (serviceAddons && serviceAddons.baseService?.length > 0) ||
        serviceAddons?.addons?.length > 0
      ) {
        if (searchValue) {
          return router.replace(
            `/${StepPathType.addons}/${searchValue.propertyId}${searchValue ? `?${querySearchParams(searchValue)}` : ''
            }`
          );
        }
      } else {
        message.error('can not next');
      }
    } else if (step === processMenuList[2].step * 1) {
      if (isBookingOffer) {
        return router.replace(
          `/${StepPathType.information}/${offerQueryParam}`
        );
      } else if (booker) {
        return router.replace(
          `/${StepPathType.information}/${searchValue ? `?${querySearchParams(searchValue)}` : ''}`
        );
      } else {
        message.error('can not next');
      }
    } else if (step === processMenuList[3].step * 1) {
      if (booker && folios) {
        if (isBookingOffer) {
          return router.replace(
            `/${StepPathType.summary}/${offerQueryParam}`
          );
        }
        return router.replace(
          `/${StepPathType.summary}/${searchValue ? `?${querySearchParams(searchValue)}` : ''}`
        );
      } else {
        message.error('can not next');
      }
    }
  };

  const checkCanClick = (step: number) => {
    if (isDisable) return false;
    switch (step) {
      case processMenuList[0].step * 1:
        if (isBookingOffer) {
          return true;
        }
        return bundlePrice ? true : false;
      case processMenuList[1].step * 1:
        if (isBookingOffer) {
          return true;
        }
        return (serviceAddons && serviceAddons.baseService?.length > 0) ||
          serviceAddons.addons?.length > 0
          ? searchValue
            ? true
            : false
          : false;
      case processMenuList[2].step * 1:
        if (isBookingOffer) {
          return true;
        }
        return booker ? true : false;
      case processMenuList[3].step * 1:
        return booker && folios ? true : false;
      default:
        return false;
    }
  };

  useEffect(() => {
    if (isOpenGuest) {
      setIsDisable(isOpenGuest);
    }
  }, [isOpenGuest]);

  return (
    <section
      className={clsx(
        'bg-primary-switch ease-in-out xl:block hidden',
        fixed ? 'xl:fixed w-full z-10 top-[116px] !mt-0' : ''
      )}
    >
      <div className="container">
        <div className={clsx('flex justify-between gap-12 items-center h-[60px]')}>
          {processMenuList && processMenuList?.length
            ? processMenuList?.map((ele: BookingStepData, index: number) => {
              const eleStep = Number(ele.step);
              return (
                <div
                  onClick={() => {
                    setIsDisable(false);
                    checkCanClick(eleStep) && handleNavigate(eleStep);
                  }}
                  key={index}
                  className={clsx('flex justify-center gap-4 items-center', {
                    '!cursor-pointer': checkCanClick(eleStep),
                  })}
                >
                  <div
                    className={clsx(
                      ' w-[25px] h-[25px]  text-PrimaryBlack bg-LightGrey flex items-center justify-center rounded-full ',
                      {
                        '!bg-PrimaryBlue !text-PrimaryWhite': activeStep === eleStep,
                      }
                    )}
                  >
                    <span className="!text-[16px] !font-[500]   ">{eleStep}</span>
                  </div>
                  <p
                    className={clsx('text-[16px]', {
                      '!text-PrimaryBlue': activeStep === eleStep,
                    })}
                  >
                    {ele.stepName}
                  </p>
                </div>
              );
            })
            : ''}
        </div>
      </div>
    </section>
  );
};

export default BookingStep;
