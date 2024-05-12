import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  BacktestData,
  BacktestDatesRequest,
  BacktestMetrics,
  FormBacktest,
  FormMarketData,
  Kline,
  SelectType,
} from '../types/types';
import { AxiosError } from 'axios';
import { backtestService } from '../api/backtestService';

type backtestState = {
  exchanges: SelectType;
  symbols: SelectType;
  mdt: SelectType;
  dates: {
    startDate: string;
    endDate: string;
    isDisabled: boolean;
  };
  metrics: BacktestMetrics | null;
  data: BacktestData | null;
  klines: Kline[] | null;
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
    startDate: '',
    endDate: '',
    isDisabled: true,
  },
  metrics: null,
  data: null,
  klines: null,
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
  async function (data: BacktestDatesRequest, { rejectWithValue }) {
    try {
      const response = await backtestService.getDates(data);
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
    console.log('1 metrics');
    try {
      const response = await backtestService.getMetrics(id);
      console.log('2 metrics ready', response.data);
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
    console.log('6 klines');
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
    console.log('3 data');
    try {
      const response = await backtestService.getData(id);
      console.log('4 data ready', response.data);
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
      state.dates.endDate = action.payload.data.date_end;
      state.dates.startDate = action.payload.data.date_start;
      state.dates.isDisabled = false;
      state.isLoading = false;
    });
    // builder.addCase(backtestRun.fulfilled, (state, action) => {});
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
  },
});

export const backtestReducer = backtestSlice.reducer;
