import axios, { AxiosRequestHeaders } from 'axios';
import { endpoints } from '../constants/endpoints';
import { tokenService } from './tokenService';

const axiosApiInstance = axios.create({
  baseURL: endpoints.BASE_URL,
});

axiosApiInstance.interceptors.request.use(
  async (config) => {
    config.headers = {
      Authorization: tokenService.authToken(),
      // 'Content-Type': 'application/json',
    } as AxiosRequestHeaders;
    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

axiosApiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      tokenService.removeToken();
      window.location.replace('/');
    }
    return Promise.reject(error);
  }
);

export default axiosApiInstance;
