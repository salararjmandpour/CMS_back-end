import * as moment from 'moment-timezone';

export const getTimezone = (timezone: string) => timezoneList[timezone];
export const setDefaultTimezone = (timezone: string) => moment.tz.setDefault(timezone);
