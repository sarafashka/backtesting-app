import { Dayjs } from 'dayjs';

export interface FormRequestMarketData {
  exchange: string;
  symbol: string;
  type: string;
  startDate: Dayjs;
  endDate: Dayjs;
}
