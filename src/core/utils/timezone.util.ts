import { timezoneList } from '../constants/timezone-list.constant';

export const getTimezone = (timezone: string) => {
  return timezoneList.find((item) => item === timezone);
};

export const setDefaultTimezone = (timezone: string) => {
  return new Date().toLocaleString('fa-IR', { timeZone: 'Asia/Tehran' });
};
