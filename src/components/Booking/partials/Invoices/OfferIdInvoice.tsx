import { useEffect } from 'react';
import BookingInvoice from '@/components/shared/BookingInvoice';
import { pathPage, pathsBooking } from '@/constants';
import { StepPathType } from '@/constants/stepData';
import { useIbeTranslation } from '@/hooks';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { deleteAddonsService } from '@/store/slice/invoceSlice';
import { ServiceAddonsType } from '@/types/invoceSliceType/invoceSliceType';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { addItems } from '@/util/service';
import calculator from '@/util/calculator';

interface BundleIdInvoiceProps { }

const OfferIdInvoice: React.FC<BundleIdInvoiceProps> = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { offerId } = router.query;
  const hideButton = router.asPath.includes(StepPathType.information);
  const buttonText = useIbeTranslation('general.invoice.buttonText');
  const { detail, bundles: bundlePrices, services } = useAppSelector((state) => state.offerSlice);
  const { serviceAddons } = useAppSelector((state) => state.invoiceSlice);

  /** searchParams value */
  const handleNextBooking = () => {
    if (offerId && detail?.property?.extId && router.asPath.includes(pathPage.offer)) {
      router.push({
        pathname: `/${pathPage.addons}/` + detail.property.extId,
        query: `offerId=${offerId}`,
      });
    }
    if (offerId && router.asPath.includes(pathPage.addons)) {
      router.push({
        pathname: pathsBooking.CREATE_BOOKING,
        query: `offerId=${offerId}`,
      });
    }
  };

  const handleRemoveService = (e: string | undefined) => {
    const serviceStore = serviceAddons?.addons?.find((ele: any) => ele.serviceId === e);
    if (serviceStore) {
      dispatch(deleteAddonsService(serviceStore.serviceId));
    }
  }

  const serviceIncluded = useMemo(() => {
    let bundleServices: any[] = []
    if (bundlePrices)
      bundlePrices?.forEach(bundlePrice => {
        bundlePrice?.bundle?.bundleServices?.forEach((service: ServiceAddonsType) => {
          bundleServices = addItems(bundleServices, service)
        })
      })
    if (services) {
      services.forEach((ele: any) => {
        const service = {
          serviceId: ele?.extId,
          price: ele?.price,
          serviceName: ele?.name,
          extendedData: {
            title: ele?.extendedData?.title,
            name: ele?.extendedData?.name,
            description: ele?.extendedData?.description,
          },
          mode: ele?.mode,
          count: ele?.count,
        }
        bundleServices = addItems(bundleServices, service)
      })
    }
    return bundleServices
  }, [bundlePrices, services])

  const { voucher } = useAppSelector((state) => state.voucherSlice);

  const totalCalc = useMemo(() => {
    let total = 0
    if (detail) {
      total = Number(detail?.price || 0) >= Number(detail?.discount || 0) ? Number(detail?.price || 0) - Number(detail?.discount || 0) : 0
    }
    if (detail && serviceAddons.addons) {
      total += calculator.calcAddonsPrice(detail.arrival, detail.departure, serviceAddons.addons);
    }
    if (voucher) {
      total = Math.max(total - voucher.reduce((total: number, voucher) => total + voucher.voucherData.value, 0), 0)
    }
    return total

  }, [serviceAddons?.addons, detail, voucher])

  const offerAdults = useMemo(() => {
    return bundlePrices ? bundlePrices?.reduce((total: number, current) => total + Number(current.adults) * Number(current.count), 0) : 1
  }, [bundlePrices])

  const offerChildren = useMemo(() => {
    return bundlePrices ? bundlePrices?.reduce((total: number, current) => total + Number(current.children?.length) * Number(current.count), 0) : 0
  }, [bundlePrices])

  useEffect(() => {
    if (detail?.property?.extId) {
      serviceAddons?.addons?.forEach((addon) => {
        if (!addon.serviceId?.includes(detail.property.extId)) {
          handleRemoveService(addon.serviceId);
        }
      })
    }
  }, [detail?.property?.extId, serviceAddons?.addons]);

  return (
    <BookingInvoice
      className="bg-primary-switch"
      id="test_id"
      header="Your offer"
      arrival={detail?.arrival}
      departure={detail?.departure}
      rooms={bundlePrices?.map(bundle => `${bundle?.name} @ ${bundle?.count}`)}
      adults={offerAdults}
      child={offerChildren}
      addonsBase={
        (serviceIncluded?.length &&
          serviceIncluded.map(
            (ele: any): ServiceAddonsType => ({
              serviceId: ele?.serviceId,
              price: ele?.overwritePrice,
              serviceName: ele?.name,
              extendedData: {
                title: ele?.extendedData?.title,
                name: ele?.extendedData?.name,
                description: ele?.extendedData?.description,
              },
              mode: ele?.mode,
              count: ele?.count,
            })
          )) ||
        []
      }
      voucherData={voucher}
      addons={serviceAddons?.addons}
      onClear={serviceAddons?.addons?.length > 0 ? (e) => e && handleRemoveService(e) : undefined}
      total={totalCalc?.toString()}
      disable={detail?.status==='booked'}
      buttonText={hideButton ? "" : buttonText}
      onClick={handleNextBooking}
      offerDetail={detail}
    />
  );
};

export default OfferIdInvoice;
