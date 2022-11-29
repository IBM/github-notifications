import * as types from '../actionTypes/notifications';

export const getNotifications = () => ({ type: types.GET_NOTIFICATIONS });
export const getNotificationsSuccess = (notifications) => ({
  type: types.GET_NOTIFICATIONS_SUCCESS,
  notifications
});

export const getNotificationsError = (error) => ({
  type: types.GET_NOTIFICATIONS_ERROR,
  error
});

export const getMoreNotifications = () => ({ type: types.GET_MORE_NOTIFICATIONS });

export const getMoreNotificationsSuccess = (notifications) => ({
  type: types.GET_MORE_NOTIFICATIONS_SUCCESS,
  notifications
});

export const setSince = (date) => ({
  type: types.SET_SINCE,
  date
});

export const moveNotifications = () => ({ type: types.MOVE_NOTIFICATIONS });
