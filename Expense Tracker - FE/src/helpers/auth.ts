import jwtDecode from 'jwt-decode';
import { DecodedToken, User } from '../models/user';

export const decodeToken = (token: string): any => {
  const { iat, firstname, role, sub, exp }: DecodedToken = jwtDecode(token);

  const user: User = {
    id: iat,
    firstname,
    role,
    email: sub,
  };

  const isExpired = Math.floor(Date.now() / 1000) > exp;

  return { user, isExpired };
};
