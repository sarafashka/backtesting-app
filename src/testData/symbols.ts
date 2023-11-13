export interface ISymbols {
  label: string;
}
export const exchanges: ISymbols[] = [{ label: 'binance' }];

export const symbols: ISymbols[] = [{ label: 'btcusdt' }, { label: 'ethusdt' }];

export const types: ISymbols[] = [
  { label: '1d' },
  { label: '1h' },
  { label: '2h' },
  { label: '30min' },
];
