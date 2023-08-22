import jwtDecode from 'jwt-decode';
import { DecodedToken, User } from '../models/user';

export const decodeToken = (token: string): any => {
  const { _id, firstname, role, email, lastname }: DecodedToken = jwtDecode(token);

  const user: User = {
    id: _id,
    firstname,
    role,
    email,
    lastname,
  };
  return user;
};
