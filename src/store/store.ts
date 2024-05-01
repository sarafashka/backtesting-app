import { configureStore } from '@reduxjs/toolkit';
import marketDataReducer from './marketDataSlice';
import { authReducer } from './authSlice';
import { filtersMarketDataReducer } from './filtersMarketDataSlice';
import { backtestReducer } from './backtestSlice';

export const store = configureStore({
  reducer: {
    marketData: marketDataReducer,
    filtersMarketData: filtersMarketDataReducer,
    auth: authReducer,
    backtest: backtestReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
