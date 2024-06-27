/** relationship with bundle type */
export type IconType = {
  dark: string;
  light: string;
}
export type ExtendedDataType = {
  description?: {
    [key: string]: string;
  };
  title?: {
    [key: string]: string;
  };
  name?: {
    [key: string]: string;
  };
};
export type ActivityType = {
  readonly activityId: string;
  icon: string;
  dark?: string;
  light?: string;
  media: string;
  name: string;
  title: string;
  extendedData?: ExtendedDataType;
  code?: string;
};

export type LandScapeType = {
  readonly landscapeId: string;
  icons: IconType
  name: string;
  title: string;
  extendedData?: ExtendedDataType;
};

export type periodType = {
  start: number;
  end: number;
};

export type SpecialBundlesType = {
  readonly specialBundleId: string;
  icons: IconType
  name: string;
  title: string;
  extendedData?: ExtendedDataType;
};

/** service type in bundles */

export interface BundlesServicesType {
  readonly serviceId: string;
  mode: string;
  name: string;
  originalPrice: number;
  overwritePrice: number;
  service: {
    extendedData?: ExtendedDataType;
  };
}

/** property type */
export interface PropertyHotelType {
  readonly extId: string;
  city: string;
  country: string;
  currency: string;
  description: string;
  media: string[];
  name: string;
  version: string;
  extendedData?: ExtendedDataType;
  location: {
    addressLine1: string;
    city: string;
    countryCode: string;
    postalCode: string;
  };
}

/** bundle type */
export interface BundleType {
  readonly bundleId: string;
  activities: ActivityType[];
  bundleServices: bundlesServicesType[];
  extendedData?: {
    description: any;
    title: any;
  };
  createdBy: string;
  currency: string;
  description: string;
  landscape: LandScapeType;
  media: string[];
  name: string;
  periods: periodType[];
  price: number;
  priceMin: number;
  property: PropertyHotelType;
  specialBundles: SpecialBundlesType[];
  tags?: [];
  title: string;
  isHomePage?: boolean;
  isHotelPage?: boolean;
  minimumStay?: number;
  maximumStay?: number;
  daysOfWeek?: string[];
}

/***** Bundle Detail ******/

/** POLICY **/
export interface NoShowPolicyType {
  readonly extId: string;
  data: {
    readonly id: string;
    code: string;
    description: string;
    reference: string;
    fee: {
      percentValue: {
        percent: number;
      };
      vatType: string;
    };
    periodFromReference: {
      days: number;
      hours: number;
      months: number;
    };
  };
}

/** extends form no show policy type */
export interface CancellationPolicyType extends NoShowPolicyType {
  data: {
    periodFromReference: {
      days: number;
      hours: number;
      months: number;
    };
  };
}

/** relationship with bundle detail */
export interface TagsType {
  readonly tagId: string;
  title: string;
  status: boolean;
  color: string;
  icon: string;
}

export interface unitGroupType {
  readonly extId: string;
  name: string;
  availableUnits: number;
  size: number;
  title: string;
  description: string;
  maxPersons: number;
  version: string;
  media: string[];
  tags: TagsType[];
  extendedData?: ExtendedDataType;
}

export interface BundleServiceDetailType extends BundlesServicesType {
  service: {
    readonly extId: string;
    description: string;
    mode: string;
    name: string;
    popular: boolean;
    price: number;
    title: string;
    version: string;
    extendedData?: ExtendedDataType;
  };
}

/** bundle price type in bundle detail */
export interface BundlePricesType {
  readonly bundlePriceId: string;
  category: number;
  name: string;
  originalPrice: number;
  overwritePrice: number;
  ratePlan: {
    readonly extId: string;
    cancellationPolicy: CancellationPolicyType[];
    noShowPolicy: NoShowPolicyType[];
  };
  unitGroup: unitGroupType;
}

/** bundle detail */
export interface BundleDetailType extends BundleType {
  bundlePrices: BundlePricesType[];
  bundleServices: BundleServiceDetailType[];
}
