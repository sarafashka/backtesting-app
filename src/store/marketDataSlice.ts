import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DownloadedMarketData, FormMarketData, MarketDataRequest } from '../types/types';
import { marketDataService } from '../api/marketDataService';
import { AxiosError } from 'axios';

type MarketDataState = {
  list: DownloadedMarketData[];
  isLoading: boolean;
  exchanges: string[];
};

const initialState: MarketDataState = {
  list: [],
  isLoading: false,
  exchanges: [],
};

export const getMarketData = createAsyncThunk(
  'marketData/getMarketData',
  async function (data: MarketDataRequest, { rejectWithValue }) {
    console.log('2 get market data test');
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
      console.log('4 reducer market data', action.payload.data);
    });
    builder.addCase(downloadMarketData.fulfilled, (state, action) => {
      //  to do adding to common Market Data table
    });
  },
});

export const { addMarketData } = marketDataSlice.actions;

export default marketDataSlice.reducer;
