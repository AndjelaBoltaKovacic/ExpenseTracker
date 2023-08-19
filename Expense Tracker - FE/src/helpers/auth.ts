import jwtDecode from 'jwt-decode';
import { DecodedToken, User } from '../models/user';

export const decodeToken = (token: string): any => {
  const { _id, firstName, premiumUser, email, lastName }: DecodedToken = jwtDecode(token);

  const user: User = {
    id: _id,
    firstName,
    premiumUser,
    email,
    lastName,
  };
  return user;
};
