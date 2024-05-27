import { RootState } from '../store';

export const selectBacktest = (state: RootState) => state.backtest;
export const selectBacktestForm = (state: RootState) => state.backtestForm;
export const selectMarketData = (state: RootState) => state.marketData;
