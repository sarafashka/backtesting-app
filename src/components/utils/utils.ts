export const getDateFromJs = (objectDate: Date): string => {
  const day = objectDate.getDate();
  const month = objectDate.getMonth() + 1;
  const year = objectDate.getFullYear();

  const formatDay = day < 10 ? '0' + day : day;
  const formatMonth = month < 10 ? '0' + month : month;
  const formatDate = `${formatDay}-${formatMonth}-${year}`;

  return formatDate;
};
