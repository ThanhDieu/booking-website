import { SearchValueType } from "@/types/bundle/bundleSearch";
import { BundleType } from "@/types/bundle/bundleType";



export interface HotelItemProps {
    data?: BundleType;
    onClick?: () => void;
    paramsSearch?: SearchValueType;
    filterActivity?: string[];
    hideHotel?: boolean
    inOffer?: any
};

export interface RoomItemProps {
    data: any
}

export interface AvatarCardProps {
    inOffer: any
    locale: string
    accountPage: any

}