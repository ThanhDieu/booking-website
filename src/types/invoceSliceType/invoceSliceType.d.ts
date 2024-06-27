import { ExtendedDataType } from "../bundle/bundleType";

/** bundle price slice type */
export interface BundlePriceType {
  bundleId: string;
  bundleName: string;
  bundlePriceName: string;
  price: number;
  count?: number;
  priceUpgrade?: number;
  bundlePriceId: string;
  currency: string;
  propertyName?: string;
  propertyCity?: string;
  propertyCountry?: string;
  propertyAddress?: string;
}

/** service add ons type */
export interface ServiceAddonsType {
  serviceId: string;
  price: number;
  serviceName: string;
  extendedData?: ExtendedDataType;
  count: number;
  mode: string;
}

export interface AddonsSliceType extends ServiceAddonsType {
  maxCount: number;
}
export interface ServiceAddonsPayloadType {
  baseService: ServiceAddonsType[];
  addons: AddonsSliceType[];
}
