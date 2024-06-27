interface AdditionalDataType {
  open?: string;
  breakfast?: string;
}

export interface MediumType {
  width: number;
  height: number;
  url: string;
}

 export interface SmallType {
  width: number;
  height: number;
  url: string;
}

export interface LargeType {
  width: number;
  height: number;
  url: string;
}

export interface ImageFormatType {
  large: LargeType;
  medium: MediumType;
  small: SmallType;
}

interface ImageAttributeType {
  url: string;
  formats: ImageFormatType;
}

interface ImageDataType {
  attributes: ImageAttributeType;
}

export interface ImageType {
  data: ImageDataType;
}

export interface FooterType {
  name: string;
  description: string;
  data: AdditionalDataType;
}

export interface SlideType {
  title?: string;
  text?: string;
  icon: ImageType;
  link?:{
    link?:string;
    title?:string;
  };
  items?:{
    title?:string
    description?:string
  }[];
}