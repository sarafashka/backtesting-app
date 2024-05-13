import axiosApiInstance from './axiosApiInstance';
import { endpoints } from '../constants/endpoints';
import { AxiosResponse } from 'axios';
import {
  BacktestData,
  BacktestDates,
  BacktestDatesRequest,
  BacktestId,
  BacktestMetrics,
  FormBacktest,
  FormMarketData,
  Kline,
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
  getKlines(data: FormMarketData): Promise<AxiosResponse<Kline[]>> {
    return axiosApiInstance.get(
      `${endpoints.BACKTEST_KLINES}exchange=${data.exchange}&symbol=${data.symbol}&market_data_type=${data.market_data_type}&date_start=${data.date_start}&date_end=${data.date_end}`
    );
  },
  getData(id: number): Promise<AxiosResponse<BacktestData>> {
    return axiosApiInstance.get(`${endpoints.BACKTEST_DATA}${id}`);
  },
};
