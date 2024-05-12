import { ThunkDispatch, AnyAction, Dispatch } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from '../hooks/reduxTypedHooks';
import { getBacktestData, getKlines, getMetrics } from '../store/backtestSlice';
import {
  AuthInitialState,
  BacktestData,
  BacktestMetrics,
  DownloadedMarketData,
  FormMarketData,
  Kline,
  SelectType,
} from '../types/types';
import { getDateFromJs } from '../utils/utils';

// const dispatch = useAppDispatch();
const backtestData = useAppSelector((state) => state.backtest.data);

export const buildChart = async (
  dispatch: ThunkDispatch<
    {
      marketData: {
        list: DownloadedMarketData[];
        exchanges: SelectType;
        symbols: SelectType;
        mdt: SelectType;
        isLoading: boolean;
      };
      auth: AuthInitialState;
      backtest: {
        exchanges: SelectType;
        symbols: SelectType;
        mdt: SelectType;
        dates: { startDate: string; endDate: string; isDisabled: boolean };
        metrics: BacktestMetrics | null;
        data: BacktestData | null;
        klines: Kline[] | null;
        isLoading: boolean;
      };
    },
    undefined,
    AnyAction
  > &
    Dispatch<AnyAction>
) => {
  const id = 2;

  await dispatch(getMetrics(id));
  await dispatch(getBacktestData(id));

  if (backtestData) {
    const { exchange, symbol, market_data_type, date_start, date_end } = backtestData;
    console.log('5 data function', backtestData);

    const requestKlines: FormMarketData = {
      exchange: exchange,
      symbol: symbol,
      market_data_type: market_data_type,
      date_start: getDateFromJs(new Date(date_start)),
      date_end: getDateFromJs(new Date(date_end)),
    };
    dispatch(getKlines(requestKlines));
  }
};
