import axios, { AxiosError } from 'axios';
import { HttpMethod } from '../models/common';
import { baseUrl } from './urls';

export class UserService {
  private static userApiUrl = `${baseUrl}/auth/`;

  public static register(method: HttpMethod, body: { firstname: string, lastname: string, email: string, password: string, role: 'PREMIUM' | 'USER' }) {
    const url = UserService.userApiUrl.concat('register');

    return new Promise((resolve, reject) => {
      axios({
        method,
        url,
        data: body,
      })
        .then(response => {
          resolve(response.data);
        })
        .catch((error: AxiosError) => {
          reject(error)
        });
    });
  }


  public static login(method: HttpMethod, body: { email: string, password: string }) {
    const url = UserService.userApiUrl.concat('authenticate');
    return new Promise((resolve, reject) => {
      axios({
        method,
        url,
        data: body,
      })
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

}
