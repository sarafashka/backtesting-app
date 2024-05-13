import AppRoutes from './routes';

export const PAGES_ROUTES = [
  {
    id: '1',
    page: 'About',
    route: AppRoutes.ABOUT,
  },
  {
    id: '2',
    page: 'Pricing',
    route: AppRoutes.PRICING,
  },
];

export const AUTH_REQUIRED_PAGE_ROUTES = [
  {
    id: '1',
    page: 'About',
    route: AppRoutes.ABOUT,
  },
  {
    id: '2',
    page: 'Market Data',
    route: AppRoutes.MARKET_DATA,
  },
  {
    id: '3',
    page: 'Backtest',
    route: AppRoutes.BACKTEST,
  },
  {
    id: '4',
    page: 'Pricing',
    route: AppRoutes.PRICING,
  },
];

export const PROFILE_PAGES_ROUTES = [
  {
    id: '1',
    page: 'My Backtesting',
    route: AppRoutes.MY_BACKTESTING,
  },
  {
    id: '2',
    page: 'Profile',
    route: AppRoutes.PROFILE,
  },
];
