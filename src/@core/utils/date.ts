import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { isString } from "lodash-es";

dayjs.extend(utc);
dayjs.extend(timezone);

/**
 * 获取当前时区
 */
export const getTimeZone = () => {
  return dayjs.tz.guess();
};

export const dateToUTCTimestamp = (date: any) => {
  return dayjs(date).utc().unix();
};

export const utcTimestampToLocalDate = (
  timestamp: string | number,
  format = "MM/DD/YYYY HH:mm"
) => {
  return dayjs
    .utc(Number(timestamp) * 1000)
    .local()
    .format(format);
};

export const utcToLocalDate = (date: string, format = "YYYY/MM/DD HH:mm") => {
  return dayjs(date).local().format(format);
};

export const getUTCTimestamp = () => {
  return dayjs().utc().unix();
};

export const isTimestamp = (val: string) => {
  return /^\d+$/.test(val);
};

export const toUnixTimestamp = (val: any) => {
  if (!val || isTimestamp(val)) return val;

  return `${dayjs(val).utc().unix()}`;
};

export const toDayjsObj = (val) => {
  if (!val) return undefined;
  if (isTimestamp(val)) {
    return dayjs(parseInt(val) * 1000).local();
  }
  if (isString(val)) {
    return dayjs(val).local();
  }

  return val;
};

export const getTimeZoneOffset = () => {
  return `UTC+${dayjs().utcOffset() / 60}:00`;
};
