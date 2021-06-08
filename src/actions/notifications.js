const utils = require('../api/notifications');

export function notificationsHaveError(bool) {
  return {
    type: 'NOTIFICATIONS_HAVE_ERROR',
    haveNotificationsError: bool
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

export function fetchNotifications() {
  return (dispatch) => {
    dispatch(notificationsAreLoading(true));
    utils.getNotifications()
      .then((notifications) => {
        dispatch(notificationsFetchDataSuccess(notifications));
      })
      .catch((error) => {
        dispatch(notificationsHaveError(true))
      })
  }
}

export function selectNotification(notification) {
  return {
    type: 'NOTIFICATION_SELECTION_SUCCESS',
    selected: notification
  };
}

export function fetchNotificationsByDate(since) {
  return (dispatch) => {
    dispatch(notificationsAreLoading(true));
    utils.getNotificationsByDate(since)
      .then((notifications) => {
        dispatch(notificationsFetchDataSuccess(notifications));
      })
      .catch((error) => {
        dispatch(notificationsHaveError(true))
      })
  }
}
