import { useAppSelector } from '../../hooks/reduxTypedHooks';

export const getDataForChart = () => {
  const backtest = useAppSelector((state) => state.backtest);
  const klines = backtest.klines;
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
            width: 1.0,
            color: 'green',
          },
        },
        decreasing: {
          line: {
            width: 1.0,
            color: 'red',
          },
        },
      },
    ];
  }
};

// {
//   type: 'scatter',
//   showlegend: false,
//   x: ['2024-03-01 01:00:00 UTC', '2024-03-01 13:00:00 UTC'],
//   y: [61500.0, 62400.0],
//   line: {
//     color: 'green',
//   },
// },

// const scatters =

// export const dataForChart = [
//   {
//     type: 'candlestick',
//     x: klines.map((item) => new Date(item.date)),
//     open: klines.map((item) => item.open),
//     high: klines.map((item) => item.high),
//     low: klines.map((item) => item.low),
//     close: klines.map((item) => item.close),

//     showlegend: false,
//     increasing: {
//       line: {
//         width: 1.0,
//         color: 'green',
//       },
//     },
//     decreasing: {
//       line: {
//         width: 1.0,
//         color: 'red',
//       },
//     },
//   },
// ];

// // };
