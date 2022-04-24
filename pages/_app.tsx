import React from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';

import { NextUIProvider } from '@nextui-org/react';

import { createTheme } from '@nextui-org/react';
import { AuthProvider } from '../context/auth';
import { NowPlayingProvider } from '../components/spotify/spotify';

import { Toaster } from 'react-hot-toast';

const darkTheme = createTheme({
  type: 'dark',
});

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <NextUIProvider theme={darkTheme}>
      <Head>
        <title>Spotwitchy by Karmic</title>
        <meta
          name="description"
          content="Blazingly fast and slick Spotify Widget for streamers - Twitch and Youtube. Showcase your current playing song in your stream."
        />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Hydrate>
          <AuthProvider>
            <NowPlayingProvider>
              <Component {...pageProps} />
              <Toaster />
            </NowPlayingProvider>
          </AuthProvider>
        </Hydrate>
      </QueryClientProvider>
    </NextUIProvider>
  );
}

export default MyApp;
