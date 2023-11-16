import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormRequestMarketData, MarketDataItem } from '../../types/types';

type MarketDataState = {
  list: MarketDataItem[];
};

const initialState: MarketDataState = {
  list: [
    { id: '1', exchange: 'binance', symbol: 'btcusdt', type: '1h', startDate: '', endDate: '' },
  ],
};
const marketDataSlice = createSlice({
  name: 'marketData',
  initialState,
  reducers: {
    addMarketData(state, action: PayloadAction<MarketDataItem>) {
      console.log(action.payload);
      state.list.push(action.payload);
    },
  },
});

export const { addMarketData } = marketDataSlice.actions;

export default marketDataSlice.reducer;
