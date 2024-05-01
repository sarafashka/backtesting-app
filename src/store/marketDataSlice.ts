import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  DownloadedMarketData,
  FormMarketData,
  MarketDataRequest,
  SelectType,
} from '../types/types';
import { marketDataService } from '../api/marketDataService';
import { AxiosError } from 'axios';

type MarketDataState = {
  list: DownloadedMarketData[];
  exchanges: SelectType;
  symbols: SelectType;
  mdt: SelectType;
  isLoading: boolean;
};

const initialState: MarketDataState = {
  list: [],
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
    isDisabled: false,
    value: '',
  },
  isLoading: false,
};

export const getMarketData = createAsyncThunk(
  'marketData/getMarketData',
  async function (data: MarketDataRequest, { rejectWithValue }) {
    try {
      const response = await marketDataService.getMarketData(data);
      return response;
    } catch (error) {
      const axiosError = <AxiosError>error;
      return rejectWithValue(axiosError.response?.data);
    }
  }
);

export const downloadMarketData = createAsyncThunk(
  'marketData/downloadMarketData',
  async function (data: FormMarketData, { rejectWithValue }) {
    try {
      const response = await marketDataService.downloadMarketData(data);
      return response;
    } catch (error) {
      const axiosError = <AxiosError>error;
      return rejectWithValue(axiosError.response?.data);
    }
  }
);

export const getExchanges = createAsyncThunk(
  'marketData/getExchanges',
  async function (_, { rejectWithValue }) {
    try {
      const response = await marketDataService.getExchanges();
      return response;
    } catch (error) {
      const axiosError = <AxiosError>error;
      return rejectWithValue(axiosError.response?.data);
    }
  }
);

export const getSymbols = createAsyncThunk(
  'marketData/getSymbols',
  async function (exchange: string, { rejectWithValue }) {
    try {
      const response = await marketDataService.getSymbols(exchange);
      return response;
    } catch (error) {
      const axiosError = <AxiosError>error;
      return rejectWithValue(axiosError.response?.data);
    }
  }
);

export const getTypes = createAsyncThunk(
  'marketData/getTypes',
  async function (_, { rejectWithValue }) {
    try {
      const response = await marketDataService.getTypes();
      return response;
    } catch (error) {
      const axiosError = <AxiosError>error;
      return rejectWithValue(axiosError.response?.data);
    }
  }
);

const marketDataSlice = createSlice({
  name: 'marketData',
  initialState,
  reducers: {
    addMarketData(state, action: PayloadAction<DownloadedMarketData>) {
      state.list.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMarketData.fulfilled, (state, action) => {
      state.list = action.payload.data;
    });
    builder.addCase(downloadMarketData.fulfilled, (state, action) => {
      //  to do adding to common Market Data table
    });
    builder.addCase(getExchanges.fulfilled, (state, action) => {
      state.exchanges.options = action.payload.data;
      state.symbols.isDisabled = false;
      state.isLoading = false;
      // state.exchanges.value = action.meta.arg; //в запрос символов
    });
    builder.addCase(getTypes.fulfilled, (state, action) => {
      state.mdt.options = action.payload.data;
      state.isLoading = false;
    });
    builder.addCase(getSymbols.fulfilled, (state, action) => {
      state.symbols.options = action.payload.data;
      state.isLoading = false;
    });
  },
});

export const { addMarketData } = marketDataSlice.actions;

export default marketDataSlice.reducer;
