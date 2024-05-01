import axiosApiInstance from './axiosApiInstance';
import { endpoints } from '../constants/endpoints';
import { AxiosResponse } from 'axios';
import { DownloadedMarketData, MarketDataRequest, FormMarketData } from '../types/types';

export const marketDataService = {
  getExchanges(): Promise<AxiosResponse<string[]>> {
    return axiosApiInstance.get(`${endpoints.EXCHANGES}`);
  },
  getSymbols(exchange: string): Promise<AxiosResponse<string[]>> {
    return axiosApiInstance.get(`${endpoints.SYMBOLS}/${exchange}`);
  },
  getTypes(): Promise<AxiosResponse<string[]>> {
    return axiosApiInstance.get(`${endpoints.TYPES}`);
  },
  getMarketData(data: MarketDataRequest): Promise<AxiosResponse<DownloadedMarketData[]>> {
    return axiosApiInstance.get(
      `${endpoints.MARKET_DATA}?page=${data.page}&per_page=${data.perPage}`
    );
  },
  downloadMarketData(data: FormMarketData): Promise<AxiosResponse<DownloadedMarketData>> {
    return axiosApiInstance.post(`${endpoints.DOWNLOAD_MARKET_DATA}`, data);
  },
};
