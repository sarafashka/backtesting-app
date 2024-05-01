export enum endpoints {
  BASE_URL = 'https://api.backtest.casa',
  EXCHANGES = '/api/exchange/exchanges',
  SIGN_IN = '/auth/sign-in',
  SYMBOLS = '/api/exchange/symbols',
  TYPES = '/api/exchange/mdts',
  MARKET_DATA = '/api/market-data/downloaded',
  DOWNLOAD_MARKET_DATA = '/api/market-data/download',
  BACKTEST_SYMBOLS = '/api/exchange/local-symbols',
  BAKCTEST_TYPES = '/api/exchange/mdts_from_symbol?symbol=',
  BACKTEST_RUN = '/api/backtest/grid/run',
  BACKTEST_METRICS = '/api/backtest/result/metrics?id=',
  BACKTEST_CHART = '/api/backtest/result/chart?id=',
}
