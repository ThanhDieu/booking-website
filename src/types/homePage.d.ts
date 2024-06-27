import { BundleType } from '@/types/bundle/bundleType';
import { Media } from './propertyType.ts/propertyType.d';
import { title } from 'process';
import { ImageFormatType } from '@/components/Hotel/partials/DiningSection/types';
import { ActivityType } from './bundle/bundleType';

export interface HeroBannerProps {
  title: string;
  tag: CouponProps;
  media: { data: { attributes: { url: string } } };
}
export interface CouponProps {
  media: { data: { attributes: { url: string } } };
  title: string;
  subtitle: string;
  linkText: string;
  link: string;
}
export interface SlpideCardProps {
  data: ActivityType;
}
export interface HolidaysSection {
  homeBundles?: BundleType[];
  title?: string;
  subtitle?: string;
  activitiesPackage?: ActivityType[];
  landscapePackage?: RenderViewSlideCardProps[];
}
export interface RenderViewSlideCardProps {
  title: string;
  price: number;
  link: string;
  media: {
    data: {
      attributes: {
        url: string;
      };
    };
  };
  icon: {
    data: {
      attributes: {
        url: string;
      };
    };
  };
}
export interface HighlightItems {
  itemTitle: string;
  itemSubtitle: string;
  itemRating: number;
  itemDescription: string;
  checkList: string[];
  buttons: { linkText: string; buttonText: string; style?: string }[];
  imageList: { data: { attributes: { url: string; formats: ImageFormatType } }[] };
  itemIcon: { data: { attributes: { url: string } }[] };
  checkupIcon: { data: { attributes: { url: string } } };
  latitude?: number;
  longitude?: number;
  property: {
    data: {
      attributes: {
        code: string;
        location: { countryCode: string };
      };
    };
  };
}
export interface HighlightHotels {
  title?: string;
  subtitle?: string;
  mapHotelTitle?: string;
  mapHotelSubtitle?: string;
  highlightItems: HighlightItems[];
}
export interface HomePageProps {
  attributes: {
    hero: HeroBannerProps;
    topMenu: { entries: { title: string; link: string }[] };
    packages: HolidaysSection;
    highlightHotels: HighlightHotels;
  };
  activitiesPackage: ActivityType[];
  homeBundles: BundleType[];
}
export interface HotelHighlightProps {
  highlightHotels: HighlightHotels;
}

export type CalendarStrapiType = {
  id: number;
  title: string;
  arrivalPlaceholderText: string;
  departurePlaceholderText: string;
  calendarDescription: string;
  priorityDescription: {
    low: string;
    high: string;
    normal: string;
  };
};

export type GuestRoomsStrapiType = {
  id: number;
  title: string;
  guestPlaceholder: string;
  roomsPlaceholder: string;
  children: string;
  childrenPlaceholder: string;
};

export type SearchMenuStrappi = {
  id: number;
  calendar: CalendarStrapiType;
  guestAndRooms: GuestRoomsStrapiType;
};
