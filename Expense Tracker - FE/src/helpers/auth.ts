import jwtDecode from 'jwt-decode';
import { DecodedToken, User } from '../models/user';

export const decodeToken = (token: string): any => {
  const { iat, firstname, role, sub }: DecodedToken = jwtDecode(token);

  const user: User = {
    id: iat,
    firstname,
    role,
    email: sub,
  };
  return user;
};
