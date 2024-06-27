import { Dayjs } from 'dayjs';
import { BookerModelType } from './modelType/bookerModelType';

interface BaseType {
  id: string;
  arrival?: any;
  departure?: any;
  adults?: number;
  child?: number;
  primary_guest?: BookerModelType;
}

export default BaseType;

export interface BaseResponseType<T> {
  success: boolean;
  code: number;
  message: string;
  errors: string[];
  data: T[];
}

export type ImageType = { 
  data: { 
    attributes: { 
      url: string, 
      alternativeText?: string,
      mime?: string,
    } 
  } 
};
