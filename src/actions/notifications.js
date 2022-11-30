import * as types from '../actionTypes/notifications';

export const getNotifications = (showAllRead) => ({
  type: types.GET_NOTIFICATIONS,
  showAllRead
});
export const getNotificationsSuccess = (notifications) => ({
  type: types.GET_NOTIFICATIONS_SUCCESS,
  notifications
});

export const getNotificationsError = (error) => ({
  type: types.GET_NOTIFICATIONS_ERROR,
  error
});

export const getMoreNotifications = (showAllRead) => ({
  type: types.GET_MORE_NOTIFICATIONS,
  showAllRead
});

export const getMoreNotificationsSuccess = (notifications) => ({
  type: types.GET_MORE_NOTIFICATIONS_SUCCESS,
  notifications
});

export const setSince = (date) => ({
  type: types.SET_SINCE,
  date
});

export const moveNotifications = () => ({ type: types.MOVE_NOTIFICATIONS });

export const setNotificationAsRead = (id) => ({
  type: types.SET_NOTIFICATION_AS_READ,
  id
});

export const setNotificationAsReadSuccess = (id) => ({
  type: types.SET_NOTIFICATION_AS_READ_SUCCESS,
  id
});

export const setNotificationAsReadError = (error) => ({
  type: types.SET_NOTIFICATION_AS_READ_ERROR,
  error
});
