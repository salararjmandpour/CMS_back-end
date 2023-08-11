import * as moment from 'moment-timezone';
import { timezoneList } from '../constants/timezone-list.constant';

export const getTimezone = (timezone: string) => {
  return timezoneList.find((item) => item === timezone);
};

export const setDefaultTimezone = (timezone: string) => {
  moment.tz.setDefault(timezone);
};
