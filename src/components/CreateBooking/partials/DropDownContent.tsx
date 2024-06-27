import Currency from '@/components/global/CurrencyComponent';
import { SearchValueType } from '@/types/bundle/bundleSearch';
import {
  BundlePriceType,
  ServiceAddonsPayloadType,
  ServiceAddonsType,
} from '@/types/invoceSliceType/invoceSliceType';
import { AdditionalGuest } from '@/types/modelType/reservationModelType';
import calculator from '@/util/calculator';
import clsx from 'clsx';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import styles from '../CreateBooking.module.scss';
import { VoucherBEPayloadType } from '@/types/voucherSliceType/voucherSliceType';
import { useIbeTranslation } from '@/hooks';
import { ExclamationIcon } from '@/library';
import { useLocale } from '@m0-0a/next-intl';
import { useRouter } from 'next/router';
import { pathPage } from '@/constants';
import { useMemo } from 'react';
import { useAppSelector } from '@/store/hooks';

interface IProps {
  bundles?: BundlePriceType[];
  serviceAddons?: ServiceAddonsPayloadType;
  searchValue?: SearchValueType;
  guestsInfo?: AdditionalGuest[];
  content?: any;
  voucherData?: VoucherBEPayloadType[];
  offerDiscount?: number;
}

const DropDownContent = ({ bundles, serviceAddons, searchValue, voucherData, offerDiscount }: IProps) => {
  const searchParams = useSearchParams();
  const arrivalParams = searchParams.get('arrival');
  const departureParams = searchParams.get('departure');
  const serviceApply = useIbeTranslation('bookingSteps.step4.roomsAndOffersInfo');
  const content = useIbeTranslation('bookingSteps.step4.roomsAndOffersInfo');
  const invoice = useIbeTranslation('general.invoice');
  const { locale } = useLocale();
  const router = useRouter();
  const isBookingOffer = router.asPath.includes(pathPage.offer);
  const { detail } = useAppSelector((state) => state.offerSlice);
  const totalVouchers = voucherData && voucherData.reduce((total: number, voucher) => total + voucher.voucherData.value, 0) || 0;
  const totalCalcOffer = useMemo(() => {
    let total = 0;
    if (detail) {
      total = Number(detail?.price || 0);
    }
    if (detail && serviceAddons?.addons) {
      total += calculator.calcAddonsPrice(detail.arrival, detail.departure, serviceAddons.addons);
      total = Math.max(total - Number(detail?.discount || 0) - totalVouchers, 0)
    }
    return total

  }, [serviceAddons?.addons, detail, totalVouchers]);

  return bundles?.length && serviceAddons && searchValue ? (
    <div className="overflow-hidden transition-[padding-top]">
      <div>
        <span className="text-base text-grey-switch mb-2">{content?.offersAndRooms}</span>
        {bundles.map((bundle: BundlePriceType) => <div key={bundle.bundleId}>
          <div className="flex flex-wrap justify-between mt-3">
            <p className="font-medium text-base leading-4">{bundle?.bundleName}</p>
            {!isBookingOffer && <Currency
              fontSize="text-base"
              fontWeight="leading-5"
              price={bundle?.priceUpgrade ?? bundle?.price}
            />}
          </div>
          <div className="mt-2 grid grid-cols-5">
            <p className="font-medium text-base leading-4 col-span-3">{bundle?.bundlePriceName}</p>
            <span className="text-sm justify-self-end col-span-2 md:col-span-1">
              x {bundle?.count || searchValue.rooms}
            </span>
            {searchValue.arrival && searchValue.departure ? (
              <div className="justify-self-end col-start-5">
                {!isBookingOffer && <Currency
                  price={
                    (bundle.priceUpgrade && calculator.calcPriceOfBundle(
                      bundle.priceUpgrade,
                      arrivalParams
                        ? Number(arrivalParams)
                        : searchValue?.arrival
                        ? searchValue.arrival
                        : 0,
                      departureParams
                        ? Number(departureParams)
                        : searchValue?.departure
                        ? searchValue.departure
                        : 0,
                      serviceAddons?.baseService
                    ) || 0) -
                    calculator.calcPriceOfBundle(
                      bundle.price,
                      arrivalParams
                        ? Number(arrivalParams)
                        : searchValue?.arrival
                        ? searchValue.arrival
                        : 0,
                      departureParams
                        ? Number(departureParams)
                        : searchValue?.departure
                        ? searchValue.departure
                        : 0,
                      serviceAddons.baseService
                    )
                  }
                />}
                {isBookingOffer && content?.included}
              </div>
            ) : (
              ''
            )}
          </div>
        </div>)}
      </div>
      <div
        className={clsx(styles.botBorder, 'py-6 !border-SecondaryGrey dark:!border-SecondaryBlack')}
      >
        <span className="text-base text-grey-switch mb-2">{content?.addons}</span>
        {serviceAddons?.baseService.map((item: ServiceAddonsType, index: number) => (
          <div key={index} className="mt-2 grid grid-cols-5">
            <p className="text-base flex flex-col gap-y-2 col-span-3">
              {item?.extendedData?.name && item?.extendedData?.name?.[locale]
                ? item?.extendedData?.name?.[locale]
                : item?.extendedData?.name?.en || item?.serviceName}
              <span className="text-xs leading-[18px] text-secondary-switch">
                {serviceApply?.apply}
                {item.mode === 'Arrival' && <span> {serviceApply?.arrival}</span>}
                {item.mode === 'Daily' && <span> {serviceApply?.daily}</span>}
                {item.mode === 'Departure' && <span> {serviceApply?.departure}</span>}
              </span>
            </p>{' '}
            <span className="text-sm justify-self-end col-span-2 md:col-span-1">
              x {item.count}
            </span>
            <span className="justify-self-end col-start-5">{content?.included}</span>
          </div>
        ))}

        {serviceAddons?.addons.map((item: ServiceAddonsType, index: number) => (
          <div key={index} className="mt-2 grid grid-cols-5">
            <p className="text-base col-span-3">
              {item?.extendedData?.name && item?.extendedData?.name?.[locale]
                ? item?.extendedData?.name?.[locale]
                : item?.extendedData?.name?.en || item?.serviceName}
            </p>{' '}
            <span className="text-sm justify-self-end col-span-2 md:col-span-1">
              x {item.count}
            </span>
            <div className="justify-self-end col-start-5">
              <Currency price={item?.price} />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between pt-6">
        <span className="text-base text-primary-switch mb-2">{content?.services}</span>
        <Currency
          fontSize="text-base"
          price={ isBookingOffer ? Math.min(Number(detail?.price || 0), totalCalcOffer + detail?.discount + totalVouchers)
          : calculator.calcTotalPrice(
            bundles.reduce((total: number, currentBundle: BundlePriceType) => total + Number(currentBundle?.priceUpgrade || currentBundle?.price) * (currentBundle.count || 1), 0),
            searchValue.rooms,
            searchValue.arrival,
            searchValue.departure,
            serviceAddons.addons,
            [0]
          )}
        />
      </div>

      {/* discount */}
      {isBookingOffer && (
        <div className={clsx('flex justify-between pt-2 pb-6')}>
          <span className="text-base text-primary-switch mb-2">{`Offer ${content?.discount}`}</span>
          <Currency
            fontSize="text-base"
            price={offerDiscount && -offerDiscount || 0}
          />
        </div>
      )}
      {voucherData && Array.isArray(voucherData) && voucherData.length > 0 && (
        <div className={clsx('flex justify-between pt-2 pb-6')}>
          <span className="text-base text-primary-switch mb-2">{content?.discount}</span>
          <Currency
            fontSize="text-base"
            price={
              voucherData
                ? -voucherData?.reduce((tt, item) => (tt += item.voucherData.value), 0)
                : 0
            }
          />
        </div>
      )}

      <div className="flex justify-between mt-2">
        <div>
          <p className="mb-2">{invoice?.total}</p>
          <p className="text-grey-switch mb-2 text-xs">{invoice?.taxFee}</p>
        </div>
        <Currency
          fontSize="text-2xl"
          price={isBookingOffer ? totalCalcOffer
          : calculator.calcTotalPrice(
            bundles.reduce((total: number, currentBundle: BundlePriceType) => total + Number(currentBundle?.priceUpgrade || currentBundle?.price) * (currentBundle.count || 1), 0),
            searchValue.rooms,
            searchValue.arrival,
            searchValue.departure,
            serviceAddons.addons,
            voucherData ? voucherData.map((item) => item.voucherData.value) : [0]
          )}
        />
      </div>
      <div className="flex mt-2">
        {/* <Image
          src={require('../../../../public/images/payment/exclamation-icon.svg')}
          width={0}
          height={0}
          alt=""
          className="w-4 h-4"
        /> */}
        <ExclamationIcon className="blue-text-switch" />
        <p className="text-sm font-medium ml-2">{content?.notice}</p>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default DropDownContent;
