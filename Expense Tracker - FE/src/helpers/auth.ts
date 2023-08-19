import jwtDecode from 'jwt-decode';
import { User } from '../models/user';

interface DecodedToken {
    sub: string; // subject (user ID)
    exp: number; // expiration time
    // other token claims
}

export const decodeToken = (token: string): any => {
    const decoded: DecodedToken = jwtDecode(token);
    console.log(decoded)
    const user: any = {
        id: Number(decoded.sub),
        // other user properties from token claims
    };
    return user;
};
