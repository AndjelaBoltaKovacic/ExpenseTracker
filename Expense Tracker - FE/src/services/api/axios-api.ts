import { getContent } from '../../models/type-gurards';
import { HttpMethod } from '../../values/enums/service';
import apiInstance from './interceptor';

export const axiosApiCall = <T>(method: HttpMethod, url: string, data?: any): Promise<T> =>
  new Promise((resolve, reject) => {
    apiInstance({
      method,
      url,
      data,
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error?.response?.data || 'Error!');
      });
  });
