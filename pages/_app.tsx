import type { AppProps } from 'next/app';
import Head from 'next/head';
import { NextUIProvider } from '@nextui-org/react';

import { createTheme } from '@nextui-org/react';

const darkTheme = createTheme({
  type: 'dark',
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider theme={darkTheme}>
      <Head>
        <title>Spotwitchy by Karmic</title>
      </Head>
      <Component {...pageProps} />
    </NextUIProvider>
  );
}

export default MyApp;
