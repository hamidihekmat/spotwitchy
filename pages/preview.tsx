import { Leva } from 'leva';
import { NextPage } from 'next';
import { useEffect } from 'react';
import { SpotifyWidget } from '../components/spotify';
import { useSpotifyConfig } from '../components/spotify/config';
import ErrorBoundry from '../components/ErrorBoundary';

const useSetTransparent = () => {
  useEffect(() => {
    const body = document.getElementsByTagName('body');
    const html = document.getElementsByTagName('html');

    (body[0].style.background = 'transparent'),
      (html[0].style.backgroundColor = 'transparent');
  });
};

const PreviewPage: NextPage = () => {
  useSetTransparent();
  const config = useSpotifyConfig();
  return (
    <ErrorBoundry>
      <Leva hidden />
      <SpotifyWidget config={config} />
    </ErrorBoundry>
  );
};
export default PreviewPage;
