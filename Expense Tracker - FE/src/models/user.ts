import { UserRole } from '../values/enums/user';
import { _void } from './common';

export type DecodedToken = {
  exp: number,
  firstname: string,
  iat: number
  role: UserRole
  sub: string
};
export type User = {
  id?: number;
  email: string;
  firstname: string;
  role: UserRole;
};

export interface UserInput extends User {
  passwordConfirmation: string;
  premiumUser: boolean;
}

export type UserContextType = {
  user: User | null;
  isPremium: boolean;
  login: (data: any) => void;
  logout: _void;
};

export type UserTokens = { access_token: string; refresh_token: string };
