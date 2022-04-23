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

const SPOTIFY_ID_LC = 'spotifyId';

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [value, setValue] = useState<string | null>(null);

  useEffect(() => {
    if (value) localStorage.setItem(SPOTIFY_ID_LC, value);
  }, [value]);

  useEffect(() => {
    const storedSpotifyId = localStorage.getItem(SPOTIFY_ID_LC);
    if (storedSpotifyId) setValue(storedSpotifyId);
  }, []);

  const actions = {
    setCurrentSpotifyId: useCallback((id: string) => setValue(id), []),
  };

  return (
    <AuthContext.Provider value={[value, actions]}>
      {children}
    </AuthContext.Provider>
  );
};
