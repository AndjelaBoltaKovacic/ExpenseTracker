import axios from 'axios';
import { baseUrl } from './urls';

const apiInstance = axios.create({
  baseURL: baseUrl,
});

apiInstance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiInstance;