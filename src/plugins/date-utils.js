import dayjs from 'dayjs';

export const formatDate = (value, format) => {
  if (!value) return null;

  return dayjs(value.date || value).format(format);
};

export const trFormatDate = (value) => formatDate(value, 'DD.MM.YYYY');
export const trFormatDateLong = (value) => formatDate(value, 'DD.MM.YYYY HH:mm');
export const getYear = (value) => formatDate(value, 'YYYY');
