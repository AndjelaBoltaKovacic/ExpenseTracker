import { _void } from './common';


export enum UserRole {
  Premium = 'PREMIUM',
  User = 'USER',
  Admin = 'ADMIN'
}
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
export interface User {
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

export type UserToken = { access_token: string; refresh_token: string };
