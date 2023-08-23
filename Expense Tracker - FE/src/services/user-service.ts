import { baseUrl } from './urls';
import { User, UserToken } from '../models/user';
import { axiosApiCall } from './helpers/axios-api';
import { HttpMethod } from '../values/enums/service';

const UserService = {
  userApiUrl: `${baseUrl}/auth/`,

  register: (method: HttpMethod, body: User): Promise<UserToken> => {
    const url = UserService.userApiUrl.concat('register');
    return axiosApiCall<UserToken>(method, url, body);
  },

  login: (method: HttpMethod, body: Partial<User>): Promise<UserToken> => {
    const url = UserService.userApiUrl.concat('authenticate');
    return axiosApiCall<UserToken>(method, url, body);
  },

};

export default UserService;
