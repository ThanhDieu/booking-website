

export interface RangeType {
    min: number;
    max: number;
  }
export default interface PriceRangeProps {
    value: RangeType,
    className?: string;
    title?:string;
    onChange?: (value: {min: number, max: number}) => void;
};
