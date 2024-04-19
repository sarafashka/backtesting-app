import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { marketDataService } from '../api/marketDataService';
import { AxiosError } from 'axios';

type FiltersMarketDataState = {
  exchanges: string[];
  symbols: string[];
  mdt: string[];
};

const initialState: FiltersMarketDataState = {
  exchanges: [],
  symbols: [],
  mdt: [],
};

export const getExchanges = createAsyncThunk(
  'filtersMarketData/getExchanges',
  async function ({}, { rejectWithValue }) {
    console.log('2 get exchanges');
    try {
      const response = await marketDataService.getExchanges();
      return response;
    } catch (error) {
      const axiosError = <AxiosError>error;
      return rejectWithValue(axiosError.response?.data);
    }
  }
);

const filtersMarketDataSlice = createSlice({
  name: 'filtersMarketData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getExchanges.fulfilled, (state, action) => {
      state.exchanges = action.payload.data;
      console.log('3 reducer exchanges', action.payload);
    });
  },
});

export default filtersMarketDataSlice.reducer;
