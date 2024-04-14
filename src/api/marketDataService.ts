import axiosApiInstance from './axiosApiInstance';
import { endpoints } from '../constants/endpoints';
import { AxiosResponse } from 'axios';
import { DownloadedMarketData, MarketDataRequest } from '../types/types';

export const marketDataService = {
  getExchanges(): Promise<AxiosResponse<String[]>> {
    return axiosApiInstance.get(`${endpoints.EXCHANGES}`);
  },
  getSymbols(exchange: string): Promise<AxiosResponse<String[]>> {
    return axiosApiInstance.get(`${endpoints.SYMBOLS}/${exchange}`);
  },
  getMarketData(data: MarketDataRequest): Promise<AxiosResponse<DownloadedMarketData[]>> {
    return axiosApiInstance.get(
      `${endpoints.MARKET_DATA}?page=${data.page}&per_page=${data.perPage}`
    );
  },
};
