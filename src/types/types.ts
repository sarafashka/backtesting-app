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

export type NameFieldForm =
  | 'symbol'
  | 'type'
  | 'exchange'
  | 'startDate'
  | 'endDate'
  | 'BacktestExchange'
  | 'BacktestSymbol';
