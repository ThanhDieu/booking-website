import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="icon" type="image/png" sizes="40x40" href="/favicon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>
      <body className="bg-secondary-switch">
        <Main />
        <NextScript />
        <Script
          strategy="beforeInteractive"
          src="https://plausible.io/js/script.js"
          defer={true}
          data-domain="ibe.bookinghms.com"
        />
      </body>
    </Html>
  );
}
