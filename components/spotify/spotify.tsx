import {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { ACCESS_TOKEN_URL, NOW_PLAYING_URL } from './constants';
import type { AccessToken, NowPlayingResponse } from './types';

import { useQuery } from 'react-query';
import { useAuth } from '../../context/auth';

async function fetchAccessToken(spotifyId: string) {
  const response = await fetch(ACCESS_TOKEN_URL, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      spotifyId,
    }),
  });

  const {
    freshToken: { access_token },
  } = (await response.json()) as AccessToken;

  return access_token;
}

async function fetchNowPlaying(accessToken: string) {
  const response = await fetch(NOW_PLAYING_URL, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    method: 'GET',
  });

  return (await response.json()) as NowPlayingResponse;
}

export function useNowPlaying() {
  const token = useAccessToken();
  const { data: nowPlaying, error } = useQuery(
    token ?? 'NowPlaying',
    () => fetchNowPlaying(token!),
    {
      refetchInterval: 2000,
      retry: true,
      retryDelay: 5000,
      enabled: token ? true : false,
      onError: () => console.log('error'), // set error state
    }
  );

  return { nowPlaying, error };
}

type NowPlayingContextType = {
  spotifyId: string;
  setSpotifyId: (id: string) => void;
};

const NowPlayingContext = createContext<NowPlayingContextType | undefined>(
  undefined
);

interface NowPlayingProviderProps {
  children: React.ReactElement | React.ReactElement[];
}

export function useAccessToken() {
  const value = useContext(NowPlayingContext);

  if (value === undefined)
    throw new Error('Must be wrapped with NowPlayProvider...');

  const { spotifyId } = value;

  const { data: token } = useQuery(
    'RefreshToken',
    () => fetchAccessToken(spotifyId),
    {
      refetchInterval: 1000 * 60 * 59,
      retry: true,
      retryDelay: 5000,
      enabled: spotifyId ? true : false,
    }
  );

  return token;
}

export const useSpotifyId = () => {
  const value = useContext(NowPlayingContext);

  if (value === undefined)
    throw new Error('Must be wrapped with NowPlayProvider...');

  return value;
};

export const NowPlayingProvider: FC<NowPlayingProviderProps> = ({
  children,
}) => {
  const [auth] = useAuth();
  const [spotifyId, setSpotifyId] = useState<string>('');

  useEffect(() => {
    if (auth) {
      setSpotifyId(auth);
    }
  }, [auth]);

  useEffect(() => {
    const searchParams = new URL(window.location.href).searchParams;
    if (searchParams.toString()) {
      setSpotifyId(searchParams.get('spotifyId') ?? '');
    }
  }, []);

  const applySpotifyId = useCallback((id: string) => setSpotifyId(id), []);

  const state = useMemo(
    () => ({ spotifyId, setSpotifyId: applySpotifyId }),
    [spotifyId, applySpotifyId]
  );

  return (
    <NowPlayingContext.Provider value={state}>
      {children}
    </NowPlayingContext.Provider>
  );
};
