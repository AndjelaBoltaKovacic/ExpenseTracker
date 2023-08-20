import axios from 'axios';
import { baseUrl } from './urls';

const apiInstance = axios.create({
  baseURL: baseUrl,
});

const bearerToken = localStorage.getItem('token');

apiInstance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${bearerToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
