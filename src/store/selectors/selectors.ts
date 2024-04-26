import { RootState } from '../store';

export const selectFilters = (state: RootState) => state.filtersMarketData;
export const selectMarketData = (state: RootState) => state.marketData;
