import { theme } from 'antd';
import { ThemeConfig } from 'antd/es/config-provider/context';
import { Inter } from 'next/font/google';
const { defaultAlgorithm } = theme;

const inter = Inter({
  weight: ['300', '400', '500', '600'],
  subsets: ['latin'],
});

const instance: ThemeConfig = {
  algorithm: [defaultAlgorithm],
  token: {
    fontFamily: inter.style.fontFamily,
    colorTextPlaceholder: '#61666B',
    colorText: '#0E1013',
    colorPrimary: '#3A6EA5',
  },
  components: {
    Layout: {
      colorBgHeader: '#ffffff',
      colorBgTrigger: '#ffffff',
    },
    DatePicker: {
      colorBgContainer: '#FAFAFA',
      colorBorder: 'inherits',
    },
    Input: {
      colorText: '#0E1013',
      colorSuccessTextActive: '#3A6EA5',
      colorBgContainer: '#FAFAFA',
    },
    Select: {
      colorTextPlaceholder: '#0e1013',
    },
  },
};

export default instance;
// '#DB3B21',test color
