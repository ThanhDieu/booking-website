import BookingInvoice from "@/components/shared/BookingInvoice";
import { pathPage } from "@/constants";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setBaseService, setBundlePrice } from "@/store/slice/invoceSlice";
import { thunkAddActivitiesHistory } from "@/store/slice/userSlice";
import { BundleDetailType, BundleServiceDetailType, BundlesServicesType } from "@/types/bundle/bundleType";
import { BundlePriceType, ServiceAddonsType } from "@/types/invoceSliceType/invoceSliceType";
import { CreateActivitiesModel } from "@/util/payloadModel/userPayloadModel";
import { querySearchParams } from "@/util/searchParams";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { SetStateAction } from "react";
import { useIbeTranslation } from "@/hooks";

interface StateType<T> {
    state?: T,
    setState?: (value: SetStateAction<T>) => void
}

interface BundleIdInvoiceProps {
    totalPriceOfCalc: StateType<number>
    rooms: StateType<string>
    data: StateType<BundleDetailType>
    initialPrice: StateType<number>
    priceUpgrade: StateType<number>
    bundlePriceId: StateType<string>
}

const BundleIdInvoice: React.FC<BundleIdInvoiceProps> = ({ totalPriceOfCalc, rooms, data, initialPrice, priceUpgrade, bundlePriceId }) => {
    const { searchValue } = useAppSelector((state) => state.bundleSlice);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const searchParams = useSearchParams();
    const { bundleId } = router.query;
    /** searchParams value */
    const countryCodeParams = searchParams.get('countryCode');
    const propertyIdParams = searchParams.get('propertyId');
    const arrivalParams = searchParams.get('arrival');
    const departureParams = searchParams.get('departure');
    const roomsParams = searchParams.get('rooms');
    const adultsParams = searchParams.get('adults');
    const childrenAgeBelowParams = searchParams.get('childrenAgeBelow');
    const childrenParams = searchParams.get('children');

    const handleNextBooking = () => {
        if (data?.state) {
            const items = data?.state
            const invoiceData: BundlePriceType = {
                bundleId: items.bundleId,
                bundleName: items?.name,
                bundlePriceName: rooms?.state?.split('@')[0] || '',
                price: initialPrice?.state || 0,
                priceUpgrade: priceUpgrade?.state,
                bundlePriceId: bundlePriceId?.state || '',
                currency: items?.currency,
                propertyName: items?.property?.name,
                propertyCity: items?.property?.city,
                propertyCountry: items?.property?.country,
                propertyAddress: items?.property?.location?.addressLine1,
            };

            const defaultService = items?.bundleServices.map(
                (ele: BundleServiceDetailType) => {
                    return {
                        serviceId: ele.service.extId,
                        price: ele.overwritePrice,
                        extendedData: {
                            title: ele.service?.extendedData?.title,
                            name: ele.service?.extendedData?.name,
                            description: ele.service?.extendedData?.description,
                        },
                        serviceName: ele.name,
                        mode: ele.mode,
                        count: searchValue?.adults,
                    };
                }
            );
            if (searchValue) {
                const activitiesPayload = new CreateActivitiesModel(
                    searchValue?.adults,
                    searchValue?.children,
                    searchValue?.arrival || 0,
                    searchValue?.departure || 0,
                    items.bundleId,
                    searchValue?.propertyId || '',
                    bundlePriceId?.state || ''
                );
                dispatch(thunkAddActivitiesHistory(activitiesPayload));
            }
            dispatch(setBundlePrice(invoiceData));
            dispatch(setBaseService(defaultService));
            const queryParams = querySearchParams({
                countryCode: countryCodeParams || '',
                propertyId: propertyIdParams || '',
                arrival: arrivalParams ? Number(arrivalParams) : undefined,
                departure: departureParams ? Number(departureParams) : undefined,
                rooms: roomsParams ? Number(roomsParams) : 1,
                adults: adultsParams ? Number(adultsParams) : 1,
                children: childrenParams ? Number(childrenParams) : 0,
                childrenAgeBelow: childrenAgeBelowParams?.toString() ?? undefined,
                bundleId: bundleId?.toString(),
            });
            router.push({
                pathname: `/${pathPage.addons}/` + items?.property?.extId,
                query: queryParams,
            });
        }
    }

    return <BookingInvoice
        className="bg-primary-switch"
        id="test_id"
        header="Your Booking"
        arrival={searchValue && searchValue.arrival}
        departure={searchValue && searchValue.departure}
        rooms={rooms?.state}
        adults={searchValue?.adults}
        child={searchValue?.children}
        addonsBase={
            (searchValue &&
                data?.state?.bundleServices.map(
                    (ele: BundlesServicesType): ServiceAddonsType => ({
                        serviceId: ele.serviceId,
                        price: ele.overwritePrice,
                        serviceName: ele.name,
                        extendedData: {
                            title: ele.service.extendedData?.title,
                            name: ele.service.extendedData?.name,
                            description: ele.service.extendedData?.description,
                        },
                        mode: ele.mode,
                        count: searchValue.adults,
                    })
                )) ||
            []
        }
        total={totalPriceOfCalc.state?.toString() || "0"}
        buttonText={useIbeTranslation('general.invoice.buttonText')}
        onClick={handleNextBooking}
    />
}

export default BundleIdInvoice