import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BacktestData, BacktestMetrics, FormMarketData, Kline } from '../types/types';
import { AxiosError } from 'axios';
import { backtestService } from '../api/backtestService';

type backtestState = {
  metrics: BacktestMetrics | null;
  data: BacktestData | null;
  klines: Kline[] | null;
  isLoading: boolean;
  error: AxiosError | null;

  testNumber: number;
};

const initialState: backtestState = {
  metrics: null,
  data: null,
  klines: null,
  isLoading: false,
  error: null,

  testNumber: 0,
};

const isPending = (action: { type: string }) => {
  return /^backtest\/[a-z]+\/pending$/i.test(action.type);
};

const isRejected = (action: { type: string }) => {
  return /^backtest\/[a-z]+\/rejected$/i.test(action.type);
};

export const getMetrics = createAsyncThunk(
  'backtest/getMetrics',
  async function (id: number, { rejectWithValue }) {
    try {
      const response = await backtestService.getMetrics(id);
      return response.data;
    } catch (error) {
      const axiosError = <AxiosError>error;
      return rejectWithValue(axiosError.response?.data);
    }
  }
);

export const getKlines = createAsyncThunk(
  'backtest/getKlines',
  async function (data: FormMarketData, { rejectWithValue }) {
    try {
      const response = await backtestService.getKlines(data);
      return response.data;
    } catch (error) {
      const axiosError = <AxiosError>error;
      return rejectWithValue(axiosError.response?.data);
    }
  }
);

export const getBacktestData = createAsyncThunk(
  'backtest/getBacktestData',
  async function (id: number, { rejectWithValue }) {
    try {
      const response = await backtestService.getData(id);
      return response.data;
    } catch (error) {
      const axiosError = <AxiosError>error;
      return rejectWithValue(axiosError.response?.data);
    }
  }
);

const backtestSlice = createSlice({
  name: 'backtest',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMetrics.fulfilled, (state, action) => {
      state.metrics = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getKlines.fulfilled, (state, action) => {
      state.klines = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getBacktestData.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    });
    builder.addMatcher(isPending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addMatcher(isRejected, (state, { payload }: PayloadAction<AxiosError>) => {
      state.error = payload;
      state.isLoading = false;
    });
  },
});

export const backtestReducer = backtestSlice.reducer;
