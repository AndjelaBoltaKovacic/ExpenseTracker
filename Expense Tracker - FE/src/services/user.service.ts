import { baseUrl } from '../values/urls';
import { User, UserTokens } from '../models/user';
import { axiosApiCall } from './api/axios-api';
import { HttpMethod } from '../values/enums/service';

const userApiUrl = `${baseUrl}/auth/`;
const UserService = {
  register({ body }: { body: User }): Promise<UserTokens> {
    const url = userApiUrl.concat('register');
    return axiosApiCall<UserTokens>(HttpMethod.POST, url, body);
  },

  login({ body }: { body: Partial<User> }): Promise<UserTokens> {
    const url = userApiUrl.concat('authenticate');
    return axiosApiCall<UserTokens>(HttpMethod.POST, url, body);
  },
};

export default UserService;
