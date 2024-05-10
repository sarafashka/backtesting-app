enum AppRoutes {
  ABOUT = '/',
  MARKET_DATA = '/market-data',
  BACKTEST = '/backtest',
  PRICING = '/pricing',
  AUTH = '/auth',
  MY_BACKTESTING = '/my-backtesting',
  PROFILE = '/profile',
}

export default AppRoutes;

export const publicRoutes = ['/', '/auth', '/pricing'];
