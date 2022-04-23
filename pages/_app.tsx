import type { AppProps } from 'next/app';
import Head from 'next/head';
import { NextUIProvider } from '@nextui-org/react';

import { createTheme } from '@nextui-org/react';
import { AuthProvider } from '../context/auth';

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
          content="Blazingly fast and slick Spotify Widget for streamers - Twitch and Youtube. Showcase your current playing song in your stream."
        />
      </Head>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </NextUIProvider>
  );
}

export default MyApp;
