import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  BacktestDatesRequest,
  BacktestFormValues,
  FormBacktest,
  MarketDataRequest,
} from '../types/types';
import { AxiosError } from 'axios';
import { backtestService } from '../api/backtestService';
import { marketDataService } from '../api/marketDataService';

type backtestFormState = {
  options: {
    exchange: string[];
    symbol: string[];
    type: string[];
    startDate: string;
    endDate: string;
  };
  values: BacktestFormValues;
  isLoading: boolean;
  error: AxiosError | null;
};

const initialState: backtestFormState = {
  options: {
    exchange: [],
    symbol: [],
    type: [],
    startDate: '2024-01-01',
    endDate: '2024-05-01',
  },
  values: {
    backtestExchange: '',
    backtestSymbol: '',
    backtestPeriod: '',
    chartPeriod: '',
    startDate: '',
    endDate: '',
    deposit: 0,
    commission: 0,
    priceLow: 0,
    priceHigh: 0,
    gridsCount: 0,
    gridTrigger: 0,
    gridStopLoss: 0,
    gridTakeProfit: 0,
  },

  isLoading: false,
  error: null,
};

const isPending = (action: { type: string }) => {
  return /^backtestForm\/[a-z]+\/pending$/i.test(action.type);
};

const isRejected = (action: { type: string }) => {
  return /^backtestForm\/[a-z]+\/rejected$/i.test(action.type);
};

export const getExchangesBT = createAsyncThunk(
  'backtestForm/getExchangesBT',
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
export const getDefaultValues = createAsyncThunk(
  'marketData/getMarketData',
  async function (_, { rejectWithValue }) {
    try {
      const forDefault: MarketDataRequest = {
        page: '0',
        perPage: '1',
      };
      const response = await marketDataService.getMarketData(forDefault);
      return response;
    } catch (error) {
      const axiosError = <AxiosError>error;
      return rejectWithValue(axiosError.response?.data);
    }
  }
);

export const getSymbolsBT = createAsyncThunk(
  'backtestForm/getSymbolsBT',
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
  'backtestForm/getTypesBT',
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
  'backtestForm/getDatesBT',
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
  'backtestForm/backtestRun',
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

const backtestFormSlice = createSlice({
  name: 'backtestForm',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDefaultValues.fulfilled, (state, action) => {
      const { exchange, symbol, date_start, date_end } = action.payload.data[0];
      state.values.backtestExchange = exchange.charAt(0).toUpperCase() + exchange.slice(1);
      state.values.backtestSymbol = symbol.toUpperCase();
      state.values.startDate = date_start;
      state.values.endDate = date_end;
      state.isLoading = false;
    });
    builder.addCase(getExchangesBT.fulfilled, (state, action) => {
      state.options.exchange = action.payload.data;
      state.isLoading = false;
    });
    builder.addCase(getSymbolsBT.fulfilled, (state, action) => {
      state.options.symbol = action.payload.data;
      state.isLoading = false;
    });
    builder.addCase(getTypesBT.fulfilled, (state, action) => {
      state.values.backtestSymbol = action.meta.arg;
      const options = action.payload.data;
      state.options.type = options;
      state.values.backtestPeriod = options[options.length - 1];
      state.values.chartPeriod = options[options.length - 1]; //TODO delete after testing
      state.isLoading = false;
    });
    builder.addCase(getDatesBT.fulfilled, (state, action) => {
      state.values.backtestPeriod = action.meta.arg.mdt;
      state.values.chartPeriod = action.meta.arg.mdt; //TODO delete after testing
      state.options.startDate = action.payload.data.date_start;
      state.options.endDate = action.payload.data.date_end;

      state.values.startDate = action.payload.data.date_start;
      state.values.endDate = action.payload.data.date_end;

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

export const backtestFormReducer = backtestFormSlice.reducer;
