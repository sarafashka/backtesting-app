import { useAppSelector } from '../hooks/reduxTypedHooks';

export const getDataForChart = () => {
  const backtest = useAppSelector((state) => state.backtest);
  const klines = backtest.klines;
  const positions = backtest.data?.positions;

  const scatters: {
    type: string;
    showlegend: boolean;
    x: Date[];
    y: number[];
    line: { color: string };
  }[] = [];
  positions?.forEach((position) => {
    const prices: number[] = [];
    const dates: Date[] = [];
    position.orders.forEach((order) => {
      if (order.status === 'Filled') {
        if (order.side === 'Buy') {
          prices[0] = order.price_executed;
          dates[0] = new Date(order.date_update);
        } else if (order.side === 'Sell') {
          prices[1] = order.price_executed;
          dates[1] = new Date(order.date_update);
        }
      }
    });

    scatters.push({
      type: 'scatter',
      showlegend: false,
      x: dates,
      y: prices,
      line: {
        color: prices[1] - prices[0] >= 0 ? 'green' : 'red',
      },
    });
  });

  if (klines) {
    return [
      {
        type: 'candlestick',
        x: klines.map((item) => new Date(item.date)),
        open: klines.map((item) => item.open),
        high: klines.map((item) => item.high),
        low: klines.map((item) => item.low),
        close: klines.map((item) => item.close),

        showlegend: false,
        increasing: {
          line: {
            width: 2,
            color: 'lightgreen',
          },
        },
        decreasing: {
          line: {
            width: 2,
            color: 'lightred',
          },
        },
      },
      ...scatters,
    ];
  }
};
