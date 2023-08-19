import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { decodeToken } from '../helpers/auth';
import { User, UserContextType, UserToken } from '../models/user';

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = ({ accessToken }: UserToken) => {
    const decodedToken = decodeToken(accessToken);
    setUser(decodedToken);
    localStorage.setItem('token', accessToken);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = decodeToken(token);
      setUser(decodedToken);
    }
  }, []);

  return <UserContext.Provider value={{ user, login, logout }}>{children}</UserContext.Provider>;
};
