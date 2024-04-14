// export interface FormRequestMarketData {
//   exchange: string;
//   symbol: string;
//   type: string;
//   startDate: string;
//   endDate: string;
// }

export interface RequestedMarketData {
  exchange: string;
  symbol: string;
  market_data_type: string;
  date_start: string;
  date_end: string;
}

export interface DownloadedMarketData extends RequestedMarketData {
  id: string;
}

export interface BacktestFormValues {
  backtestExchange: string;
  backtestSymbol: string;
  backtestPeriod: string;
  chartPeriod: string;
  startDate: Date;
  endDate: Date;
  deposit: number;
  commission: number;
  priceLow: number;
  priceHigh: number;
  gridsCount: number;
  gridTrigger: number;
  gridStopLoss: number;
  gridTakeProfit: number;
  sellAll: boolean | undefined;
}

export interface MarketDataFormValues {
  exchange: string;
  symbol: string;
  type: string;
  startDate: Date;
  endDate: Date;
}

export type NameFieldForm =
  | 'symbol'
  | 'type'
  | 'exchange'
  | 'startDate'
  | 'endDate'
  | 'BacktestExchange'
  | 'BacktestSymbol';

export interface UserLogin {
  username: string;
  password: string;
}

export interface SignInResponse {
  access_token: string;
  token_type: string;
  expires_in: Number;
}

export type LoadingStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export interface AuthInitialState {
  loginStatus: LoadingStatus;
  registerStatus: LoadingStatus;
}

export type MarketDataRequest = {
  page: string;
  perPage: string;
};
