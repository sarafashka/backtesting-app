export interface FormRequestMarketData {
  exchange: string;
  symbol: string;
  type: string;
  startDate: string;
  endDate: string;
}

export interface MarketDataItem extends FormRequestMarketData {
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
