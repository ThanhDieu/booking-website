export enum SelectType {
  single = 'single',
  multiple = 'mutiple',
}
export default interface FilterBoxProps {
  className?: string;
  title?: string;
  data: any[];
  onClick?: (value: any | string[]) => void;
  selectType?: SelectType.single | SelectType.multiple;
  defaultVal?: string[];
}

export interface FilterBoxDataType {
  id: string;
  label: string;
  dark?: string;
  light?: string;
  icon?: any;
  icons?: any;
  code?: string
}
