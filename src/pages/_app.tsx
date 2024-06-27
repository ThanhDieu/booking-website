import '../styles/index.scss';
import { AppPropsWithLayout } from '@/types/layoutType';
import SEO from '@/config/nextSEO';
import { Inter, Lora } from 'next/font/google';
import { DefaultSeo } from 'next-seo';
import ErrorPage from './404';
import AppProvider from '@/context';
import ThemeProvider from '@/config/ThemeProvider.tsx';

const lora = Lora({
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
});
const inter = Inter({
  weight: ['300', '400', '500', '600'],
  subsets: ['latin'],
});

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? ErrorPage;
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${(inter.style.fontFamily, lora.style.fontFamily)};
        }
      `}</style>
      <AppProvider>
        <ThemeProvider>
          <Layout className={inter.className}>
            <DefaultSeo {...SEO} />
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </AppProvider>
    </>
  );
}
