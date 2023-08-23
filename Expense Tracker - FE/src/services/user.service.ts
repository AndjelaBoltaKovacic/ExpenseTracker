import { baseUrl } from './urls';
import { User, UserToken } from '../models/user';
import { axiosApiCall } from './helpers/axios-api';
import { HttpMethod } from '../values/enums/service';

const UserService = {
  userApiUrl: `${baseUrl}/auth/`,

  register({ body }: { body: User }): Promise<UserToken> {
    const url = this.userApiUrl.concat('register');
    return axiosApiCall<UserToken>(HttpMethod.POST, url, body);
  },

  login({ body }: { body: Partial<User> }): Promise<UserToken> {
    const url = this.userApiUrl.concat('authenticate');
    return axiosApiCall<UserToken>(HttpMethod.POST, url, body);
  },

};

export default UserService;
