import { BacktestMetrics } from '../types/types';

export const getDateFromJs = (objectDate: Date): string => {
  const day = objectDate.getDate();
  const month = objectDate.getMonth() + 1;
  const year = objectDate.getFullYear();

  const formatDay = day < 10 ? '0' + day : day;
  const formatMonth = month < 10 ? '0' + month : month;
  const formatDate = `${year}-${formatMonth}-${formatDay}`;

  return formatDate;
};

type MetricsRows = {
  id: number;
  name: string;
  value: number | string;
};

export const formatMetricsToRows = (metrics: BacktestMetrics) => {
  const rows: MetricsRows[] = [];
  const arr = Object.entries(metrics);
  arr.forEach((item, index) => {
    const value = item[1] ? (Number.isInteger(item[1]) ? item[1] : item[1].toFixed(2)) : 'No value';
    console.log('metrics', item);
    const metric: MetricsRows = {
      id: index,
      name: (item[0][0].toUpperCase() + item[0].slice(1)).replace(/_/g, ' '),
      value: value,
    };
    rows.push(metric);
  });
  return rows;
};
