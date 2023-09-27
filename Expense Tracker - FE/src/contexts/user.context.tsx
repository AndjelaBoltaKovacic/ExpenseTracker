import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { decodeToken } from '../helpers/auth';
import { User, UserContextType, UserTokens } from '../models/user';
import { UserRole } from '../values/enums/user';

const UserContext = createContext<UserContextType | undefined>(undefined);


const getIsAuth = () => {
  const token = localStorage.getItem('token');
  if (token) {
    const { user, isExpired } = decodeToken(token);
    if (!isExpired) {
      return user
    } else {
      return null
    }
  } else {
    return null
  }
}
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(getIsAuth());
  const isPremium = user?.role === UserRole.Premium;

  const login = useCallback(({ access_token }: UserTokens) => {
    localStorage.setItem('token', access_token);
    const { user } = decodeToken(access_token);
    setUser(user);
  }, []);

  const logout = useCallback(() => {
    setUser({} as User);
    localStorage.removeItem('token');
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const { user, isExpired } = decodeToken(token);
      if (!isExpired) {
        user && setUser(user)
      } else {
        logout()
      }
    }
  }, []);

  return <UserContext.Provider value={{ user, isPremium, login, logout }}>{children}</UserContext.Provider>;
};
