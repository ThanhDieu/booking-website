export interface ImageType {
  src: string;
}

export interface ImageSliderProps {
  images: string[];
  position?: string;
  className?: string;
}
export enum ImagesPosition {
  inside = 'inside',
  outside = 'outside',
}
