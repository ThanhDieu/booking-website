import { ThemeConfig } from 'antd/es/config-provider/context';
import light from './light';
import dark from './dark';

export interface ThemeProps {
  [themeKey: string]: ThemeConfig;
}

const instance: ThemeProps = {
  default: light,
  dark,
};

export default instance;
