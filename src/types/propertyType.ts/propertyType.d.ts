import { PackagesType } from './propertyType.d';

interface ImageAttributeType {
  id: string;
  name: string;
  alternativeText: string;
  url: string;
}

export interface ImageType {
  data: ImageDataType;
}

export interface Media {
  data: ImageDataType;
}

export interface GalleryImageType {
  media: Media;
}

export interface MediaLink {
  title?: string,
  subtitle?: string,
  media?: Media,
  year?: number
}

interface ImageDataType {
  attributes: ImageAttributeType;
}


export interface HeroBannerType {
  id: string;
  title: string;
  subtitle: string;
  image: ImageType;
}

export interface PackageType {
  id: string;
  title: string;
  subtitle: string;
  media: ImageType;
}

export interface PackagesType extends PackageType<Omit<PackageType, "media"> >{
  packages: PackageType[];
}

// export interface PackagesType {
//   id: string;
//   title: string;
//   subtitle: string;
//   packages: PackageType[];
// }

interface PropertyDataType {
  id: string;
  attributes: PropertyAttributetype;
}

interface PropertyLocationType {
  id: string;
  city: string;
  country: string;
}

interface PropertyAttributetype {
  id: string;
  name: string;
  code: string;
  location: PropertyLocationType;
}

export interface PropertyType {
  data: PropertyDataType;
}