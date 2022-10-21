const common = require('../api/common');

export function notificationsHaveError(response) {
  return {
    type: 'NOTIFICATIONS_HAVE_ERROR',
    haveNotificationsError: true,
    error: response
  };
}

export function notificationsAreLoading(bool) {
  return {
    type: 'NOTIFICATIONS_ARE_LOADING',
    areNotificationsLoading: bool
  };
}

export function notificationsFetchDataSuccess(notifications) {
  return {
    type: 'NOTIFICATIONS_FETCH_DATA_SUCCESS',
    notifications
  };
}

export function notificationsFetchNewDataSuccess(notifications) {
  return {
    type: 'NOTIFICATIONS_FETCH_NEW_DATA_SUCCESS',
    notifications
  };
}

export function selectNotification(notification) {
  return {
    type: 'NOTIFICATION_SELECTION_SUCCESS',
    selected: notification
  };
}

export function newNotificationsClear() {
  return {
    type: 'NEW_NOTIFICATIONS_CLEAR'
  }
}

export function newNotificationsMove(notifications) {
  return {
    type: 'MOVE_NEW_NOTIFICATIONS',
    notifications
  };
}

export function fetchNotifications(since, refresh= false) {
  return (dispatch) => {
    dispatch(notificationsAreLoading(true));
    common.getNotifications(since)
      .then((response) => {
        if (response instanceof Error) {
          dispatch(notificationsHaveError(response.statusText))
        } else {
          if (refresh) {
            dispatch(notificationsFetchNewDataSuccess(response));
          } else {
            dispatch(notificationsFetchDataSuccess(response));
          }
        }
      });
  }
}

export function moveNewNotifications(notifications) {
  return (dispatch) => dispatch(newNotificationsMove(notifications));
}

export function clearNewNotifications() {
  return (dispatch) => dispatch(newNotificationsClear());
}
