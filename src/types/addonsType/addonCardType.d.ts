
import { ExtendedDataType, PropertyHotelType } from '../bundle/bundleType';

export interface BookerSliceType {
  primaryGuest?: PrimaryGuestType;
  additionalGuests?: AdditionalGuest[];
}


type addonCard = {
  image: string;
  title: string;
  content: string;
  isHot?: boolean;
  category?: string;
  price: number;
  maxCount?: number;
  quantity?: number;
  isSelected: boolean;
  className?: string;
  serviceId?: string;
  onClick?: () => void;
};

export const enum addonTagSlug {
  Bestseller = 'hot',
  Culinary = 'culinary',
  Essential = 'essential',
  Pet = 'pet',
  None = '',
}

export default addonCard;

export interface AddonServiceDataType {
  availability: {
    daysOfWeek: string[];
    mode: string;
  };
  channelCodes: string[];
  code: string;
  defaultGrossPrice: {
    amount: number;
    currency: string;
  };
  description: string;
  id: string;
  name: string;
  postNextDay: boolean;
  pricingUnit: string;
  property: {
    id: string;
  };
  serviceType: string;
  vatType: string;
}


export interface AddonServiceType {
  description: string;
  extId: string;
  media: string[];
  mode: string;
  name: string;
  popular: boolean;
  price: number;
  extendedData?:ExtendedDataType;
  property: {
    extId: string;
    name: string;
  };
  title: string;
  version: string;
}

export interface ServiceTagsType {
  color: string;
  count: number;
  description: string;
  icon: string;
  isGlobal: boolean;
  name: string;
  properties: {
    extId: string;
    name: string;
  };
  tagId: string;
  type: string;
}
