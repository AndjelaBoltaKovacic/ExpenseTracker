import { VoidFn } from './common';

export type DecodedToken = {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  premiumUser: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  session: string;
  iat: number;
  exp: number;
};
export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  premiumUser: boolean;
};

export type UserContextType = {
  user: User | null;
  login: (data: any) => void;
  logout: VoidFn;
};

export type UserToken = { accessToken: string; refreshToken: string };
