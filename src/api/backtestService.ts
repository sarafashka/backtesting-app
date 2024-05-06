import axiosApiInstance from './axiosApiInstance';
import { endpoints } from '../constants/endpoints';
import { AxiosResponse } from 'axios';
import {
  BacktestDates,
  BacktestDatesRequest,
  BacktestId,
  BacktestMetrics,
  FormBacktest,
} from '../types/types';

export const backtestService = {
  getExchanges(): Promise<AxiosResponse<string[]>> {
    return axiosApiInstance.get(`${endpoints.EXCHANGES}`);
  },
  getSymbols(): Promise<AxiosResponse<string[]>> {
    return axiosApiInstance.get(`${endpoints.BACKTEST_SYMBOLS}`);
  },
  getTypes(symbol: string): Promise<AxiosResponse<string[]>> {
    return axiosApiInstance.get(`${endpoints.BAKCTEST_TYPES}${symbol}`);
  },
  getDates(data: BacktestDatesRequest): Promise<AxiosResponse<BacktestDates>> {
    return axiosApiInstance.get(
      `${endpoints.BACKTEST_DATES}exchange=${data.exchange}&symbol=${data.symbol}&market_data_type=${data.mdt}`
    );
  },
  backtestRun(data: FormBacktest): Promise<AxiosResponse<BacktestId>> {
    return axiosApiInstance.post(`${endpoints.BACKTEST_RUN}`, data);
  },
  getMetrics(id: number): Promise<AxiosResponse<BacktestMetrics>> {
    return axiosApiInstance.get(`${endpoints.BACKTEST_METRICS}${id}`);
  },
  getChart(id: number): Promise<AxiosResponse<string>> {
    return axiosApiInstance.get(`${endpoints.BACKTEST_CHART}${id}`);
  }, //change type of response
};
