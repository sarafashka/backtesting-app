import { BacktestMetrics } from '../../types/types';

export const getDateFromJs = (objectDate: Date): string => {
  console.log('date', objectDate);
  const day = objectDate.getDate();
  console.log('day', day);
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
  value: number;
};

export const formatMetricsToRows = (metrics: BacktestMetrics) => {
  const rows: MetricsRows[] = [];
  const arr = Object.entries(metrics);
  arr.forEach((item, index) => {
    const metric = {
      id: index,
      name: item[0],
      value: item[1],
    };
    rows.push(metric);
  });
  return rows;
};
