import { UserRole } from '../values/enums/user';
import { _void } from './common';

export type DecodedToken = {
  _id: string;
  email: string;
  firstname: string;
  lastname: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
  __v: number;
  session: string;
  iat: number;
  exp: number;
};
export type User = {
  id?: string;
  email: string;
  firstname: string;
  lastname: string;
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
