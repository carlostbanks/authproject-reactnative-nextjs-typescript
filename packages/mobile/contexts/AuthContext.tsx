import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextData {
  token: string | null;
  username: string | null;
  saveUserData: (token: string, username: string) => Promise<void>;
  removeUserData: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextData>({
  token: null,
  username: null,
  saveUserData: async () => {},
  removeUserData: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  const saveUserData = async (newToken: string, newUsername: string) => {
    await AsyncStorage.multiSet([
      ['SESSION_TOKEN', newToken],
      ['USERNAME', newUsername],
    ]);
    setToken(newToken);
    setUsername(newUsername);
  };

  const removeUserData = async () => {
    await AsyncStorage.multiRemove(['SESSION_TOKEN', 'USERNAME']);
    setToken(null);
    setUsername(null);
  };

  useEffect(() => {
    const loadUserData = async () => {
      const [[, tokenValue], [, usernameValue]] = await AsyncStorage.multiGet(['SESSION_TOKEN', 'USERNAME']);
      if (tokenValue && usernameValue) {
        setToken(tokenValue);
        setUsername(usernameValue);
      }
    };

    loadUserData();
  }, []);

  return (
    <AuthContext.Provider value={{ token, username, saveUserData, removeUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
