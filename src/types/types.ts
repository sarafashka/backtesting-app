export interface FormMarketData {
  exchange: string;
  symbol: string;
  market_data_type: string;
  date_start: string;
  date_end: string;
}

export interface DownloadedMarketData extends FormMarketData {
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
  gridStopLoss: number | undefined;
  gridTakeProfit: number | undefined;
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
  expires_in: number;
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

export type SelectType = {
  options: string[];
  isDisabled: boolean;
  value: string;
};

export interface FormBacktest {
  exchange: string;
  symbol: string;
  market_data_type: string;
  chart_market_data_type: string;
  date_start: string;
  date_end: string;
  deposit: string;
  commission: string;
  price_low: string;
  price_high: string;
  grids_count: string;
  grid_trigger: string;
  grid_sl: string;
  grid_tp: string;
  sell_all: boolean;
}

export interface BacktestRunResponse {
  id: number;
}

export interface BacktestMetrics {
  id: number;
  positions_number: number;
  profit_positions_number: number;
  profit_positions_percent: number;
  loss_positions_number: number;
  loss_positions_percent: number;
  average_profit_position: number;
  average_loss_position: number;
  number_of_currency: number;
  profit_per_position_in_percent: number;
  profit_factor: number;
  expected_payoff: number;
  sortino: number;
  average_position_size: number;
  start_deposit: number;
  finish_deposit: number;
  total_profit: number;
  total_profit_percent: number;
  max_deposit: number;
  max_drawdown: number;
  drawdown: number;
  max_use_of_funds: number;
}

export interface BacktestId {
  id: number;
}

export interface BacktestDates {
  date_start: string;
  date_end: string;
}
