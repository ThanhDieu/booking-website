import { ButtonHTMLAttributes, ReactNode } from 'react';
export default interface ButtonProps {
  content?: string | ReactNode;
  style?: string;
  rounded?: string;
  className?: string;
  spin?: boolean;
  size?: string;
  disable?: boolean;
  onClick?: () => void;
  htmlType?: 'submit' | 'button' | 'reset';
}
