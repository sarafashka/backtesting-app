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
