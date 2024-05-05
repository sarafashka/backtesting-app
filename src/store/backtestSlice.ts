import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BacktestMetrics, FormBacktest, SelectType } from '../types/types';
import { AxiosError } from 'axios';
import { backtestService } from '../api/backtestService';

type backtestState = {
  exchanges: SelectType;
  symbols: SelectType;
  mdt: SelectType;
  dates: {
    startDate: Date;
    endDate: Date;
    isDisabled: boolean;
  };
  metrics: BacktestMetrics | null;
  isLoading: boolean;
};

const initialState: backtestState = {
  exchanges: {
    options: [],
    isDisabled: false,
    value: '',
  },
  symbols: {
    options: [],
    isDisabled: true,
    value: '',
  },
  mdt: {
    options: [],
    isDisabled: true,
    value: '',
  },
  dates: {
    startDate: new Date(),
    endDate: new Date(),
    isDisabled: true,
  },
  metrics: null,
  isLoading: false,
};

export const getExchangesBT = createAsyncThunk(
  'backtest/getExchangesBT',
  async function (_, { rejectWithValue }) {
    try {
      const response = await backtestService.getExchanges();
      return response;
    } catch (error) {
      const axiosError = <AxiosError>error;
      return rejectWithValue(axiosError.response?.data);
    }
  }
);

export const getSymbolsBT = createAsyncThunk(
  'backtest/getSymbolsBT',
  async function (_, { rejectWithValue }) {
    try {
      const response = await backtestService.getSymbols();
      return response;
    } catch (error) {
      const axiosError = <AxiosError>error;
      return rejectWithValue(axiosError.response?.data);
    }
  }
);

export const getTypesBT = createAsyncThunk(
  'backtest/getTypesBT',
  async function (symbol: string, { rejectWithValue }) {
    try {
      const response = await backtestService.getTypes(symbol);
      return response;
    } catch (error) {
      const axiosError = <AxiosError>error;
      return rejectWithValue(axiosError.response?.data);
    }
  }
);

export const getDatesBT = createAsyncThunk(
  'backtest/getDatesBT',
  async function (
    { exchange, symbol, mdt }: { exchange: string; symbol: string; mdt: string },
    { rejectWithValue }
  ) {
    try {
      const response = await backtestService.getDates(exchange, symbol, mdt);
      return response;
    } catch (error) {
      const axiosError = <AxiosError>error;
      return rejectWithValue(axiosError.response?.data);
    }
  }
);

export const backtestRun = createAsyncThunk(
  'backtest/backtestRun',
  async function (data: FormBacktest, { rejectWithValue }) {
    try {
      const response = await backtestService.backtestRun(data);
      return response.data;
    } catch (error) {
      const axiosError = <AxiosError>error;
      return rejectWithValue(axiosError.response?.data);
    }
  }
);

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

const backtestSlice = createSlice({
  name: 'backtest',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getExchangesBT.fulfilled, (state, action) => {
      state.exchanges.options = action.payload.data;
      state.isLoading = false;
    });
    builder.addCase(getSymbolsBT.fulfilled, (state, action) => {
      state.symbols.options = action.payload.data;
      state.symbols.isDisabled = false;
      state.isLoading = false;
    });
    builder.addCase(getTypesBT.fulfilled, (state, action) => {
      state.mdt.options = action.payload.data;
      state.mdt.isDisabled = false;
      state.isLoading = false;
    });
    builder.addCase(getDatesBT.fulfilled, (state, action) => {
      state.dates.endDate = new Date(action.payload.data.date_end);
      state.dates.startDate = new Date(action.payload.data.date_start);
      state.mdt.isDisabled = false;
      state.isLoading = false;
    });
    builder.addCase(backtestRun.fulfilled, (state, action) => {});
    builder.addCase(getMetrics.fulfilled, (state, action) => {
      state.metrics = action.payload;
      state.isLoading = false;
    });
  },
});

export const backtestReducer = backtestSlice.reducer;
