import { baseUrl } from './urls';
import { User, UserTokens } from '../models/user';
import { axiosApiCall } from './axios-api';
import { HttpMethod } from '../values/enums/service';

const blogApiUrl = `${baseUrl}/blog/`;
const UserService = {
  setReminder({ body }: { body: {} }): Promise<UserTokens> {
    const url = blogApiUrl.concat('register');
    return axiosApiCall<UserTokens>(HttpMethod.POST, url, body);
  },

  login({ body }: { body: Partial<User> }): Promise<UserTokens> {
    const url = blogApiUrl.concat('authenticate');
    return axiosApiCall<UserTokens>(HttpMethod.POST, url, body);
  },
};

export default UserService;
