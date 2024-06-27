import { theme } from 'antd';
import { ThemeConfig } from 'antd/es/config-provider/context';
const { darkAlgorithm } = theme;
import { Inter } from 'next/font/google';
import { inherits } from 'util';

const inter = Inter({
  weight: ['300', '400', '500', '600'],
  subsets: ['latin'],
});

const instance: ThemeConfig = {
  algorithm: [darkAlgorithm],

  token: {
    fontFamily: inter.style.fontFamily,
    colorTextPlaceholder: '#ffffff',
    colorText: '#ffffff',
    colorBgBase: '#0E1013',
    colorPrimary: '#3A6EA5',
  },
  components: {
    Layout: {
      colorBgHeader: '#0E1013',
      colorBgTrigger: '#0E1013',
    },
    DatePicker: {
      colorBgContainer: '#1D1F20',
      colorTextPlaceholder: '#D0D2D1',
      colorBorder: 'inherits',
    },
    Input: {
      colorText: '#ffffff',
      colorSuccessTextActive: '#3A6EA5',
      colorBgContainer: '#1D1F20',
    },
    Select: {
      colorTextPlaceholder: '#ffffff',
      colorText: '#ffffff',
    },
    Drawer: {
      colorText: '#ffffff',
    },
  },
};

export default instance;
