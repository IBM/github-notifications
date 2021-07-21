import moment from "moment";

export const defaultFetchTime = moment().subtract(4, 'week').toISOString();
export const automaticFetchInterval = 60000;
