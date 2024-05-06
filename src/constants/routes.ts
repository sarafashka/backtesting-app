enum AppRoutes {
  ABOUT = '/',
  MARKET_DATA = '/market-data',
  BACKTEST = '/backtest',
  PRICING = '/pricing',
  AUTH = '/auth',
}

export default AppRoutes;

export const publicRoutes = ['/', '/auth', '/pricing'];
