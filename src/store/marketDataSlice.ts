import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DownloadedMarketData, MarketDataRequest } from '../types/types';
import { marketDataService } from '../api/marketDataService';
import { AxiosError } from 'axios';

type MarketDataState = {
  list: DownloadedMarketData[];
};

const initialState: MarketDataState = {
  list: [],
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
  },
});

export const { addMarketData } = marketDataSlice.actions;

export default marketDataSlice.reducer;
