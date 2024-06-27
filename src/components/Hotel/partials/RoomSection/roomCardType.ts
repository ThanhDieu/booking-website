import { ImageFormatType } from '../DiningSection/types';
export interface DetailLinkType {
  link?: string;
  title: string;
}

interface RoomTagIconType {
  data: {
    id: number;
    attributes: {
      url: string;
    };
  };
}

interface ImageAttributeType {
  url: string;
  formats: ImageFormatType;
}

interface ImageDataType {
  id: number;
  attributes: ImageAttributeType;
}

export interface RoomTagType {
  id: number;
  icon: RoomTagIconType;
  text: string;
  iconId: string;
}

interface RoomImageType {
  image: {
    data: ImageDataType[];
  };
}

interface RoomData {
  beds: string;
  view: string;
  size: number;
  capacity: number;
  capacityText: string;
  fromText: string;
  price: number;
  unitSize: string;

}

export interface RoomCardType {
  name: string;
  id: number;
  text: string;
  capacity: string;
  gallery?: {
    file: {
      data: ImageDataType[];
    }
  };
  unitGroupId?: string
  unit_group?: any
  activityId?: string
  icons: any[];
  rate: number;
  rateDescription: string;
  button?: {
    title: string,
    link: string
  }
}
