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
        <meta
          name="description"
          content="Blazingly fast and slick Spotify Widget for streamers - Twitch and Youtube. Show case your current song to your stream."
        />
      </Head>
      <Component {...pageProps} />
    </NextUIProvider>
  );
}

export default MyApp;
