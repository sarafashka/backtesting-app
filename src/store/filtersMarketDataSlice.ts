import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { marketDataService } from '../api/marketDataService';
import { AxiosError } from 'axios';

type SelectType = {
  options: string[];
  isDisabled: boolean;
  value: string;
};

type FiltersMarketDataState = {
  exchanges: SelectType;
  symbols: SelectType;
  mdt: SelectType;
  isLoading: boolean;
};

const initialState: FiltersMarketDataState = {
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
  isLoading: false,
};

// const isPending = (action: { type: string }) => {
//   return /^filtersMarketData\/[a-z]+\/pending$/i.test(action.type);
// };

// const isRejected = (action: { type: string }) => {
//   return /^filtersMarketData\/[a-z]+\/rejected$/i.test(action.type);
// };

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

export const getTypes = createAsyncThunk(
  'filtersMarketData/getTypes',
  async function ({}, { rejectWithValue }) {
    console.log('2 get types');
    try {
      const response = await marketDataService.getTypes();
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
      state.exchanges.options = action.payload.data;
      state.symbols.isDisabled = false;
      state.isLoading = false;
      // state.exchanges.value = action.meta.arg; //в запрос символов
      console.log('3 reducer exchanges', action.payload);
    });
    builder.addCase(getTypes.fulfilled, (state, action) => {
      state.mdt.options = action.payload.data;
      state.isLoading = false;
      console.log('3 reducer types', action.payload);
    });

    // .addMatcher(isPending, (state) => {
    //   state.isLoading = true;
    // })
    // .addMatcher(isRejected, (state) => {
    //   state.isLoading = false;
    // });
  },
});

export default filtersMarketDataSlice.reducer;
