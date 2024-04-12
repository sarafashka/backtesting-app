import axiosApiInstance from './axiosApiInstance';
import { endpoints } from '../constants/endpoints';
import { AxiosResponse } from 'axios';

export const marketDataService = {
  getExchanges(): Promise<AxiosResponse<String[]>> {
    return axiosApiInstance.get(`${endpoints.EXCHANGES}`);
  },
  getSymbols(exchange: string): Promise<AxiosResponse<String[]>> {
    return axiosApiInstance.get(`${endpoints.SYMBOLS}/${exchange}`);
  },
};
