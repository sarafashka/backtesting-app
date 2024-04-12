import axiosApiInstance from './axiosApiInstance';
import { endpoints } from '../constants/endpoints';
import { AxiosResponse } from 'axios';
import { tokenService } from './tokenService';
import { SignInResponse, UserLogin } from '../types/types';

export const authService = {
  loginUser(userData: UserLogin): Promise<AxiosResponse<SignInResponse>> {
    return axiosApiInstance.post(endpoints.SIGN_IN, { ...userData });
  },
  isUserLogged() {
    const token = tokenService.getToken();
    return !!token;
  },
};
