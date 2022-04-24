import { parseCookies } from 'nookies';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

type AuthContextActionsType = {
  setCurrentSpotifyId: (id: string) => void;
};

type AuthContextType = [value: string | null, actions: AuthContextActionsType];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const value = useContext(AuthContext);

  if (value === undefined)
    throw new Error('Must be wrapped with AuthContextProvider');

  return value;
};

type AuthProviderProps = {
  children: React.ReactElement | React.ReactElement[];
};

const SPOTIFY_ID_C = 'spotifyId';

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [value, setValue] = useState<string | null>(null);
  const cookies = parseCookies();
  useEffect(() => {
    if (cookies[SPOTIFY_ID_C]) {
      setValue(cookies[SPOTIFY_ID_C]);
    }
  }, [cookies]);
  const actions = {
    setCurrentSpotifyId: useCallback((id: string) => setValue(id), []),
  };

  return (
    <AuthContext.Provider value={[value, actions]}>
      {children}
    </AuthContext.Provider>
  );
};
