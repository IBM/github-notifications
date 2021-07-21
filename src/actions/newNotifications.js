const common = require('../api/common');

export function newNotificationsAreLoading(bool) {
  return {
    type: 'NEW_NOTIFICATIONS_ARE_LOADING',
    areNewNotificationsLoading: bool
  };
}

export function newNotificationsHaveError() {
  return {
    type: 'NEW_NOTIFICATIONS_HAVE_ERROR',
    newNotificationsHaveError: true
  };
}

export function notificationsFetchNewDataSuccess(notifications) {
  return {
    type: 'NOTIFICATIONS_FETCH_NEW_DATA_SUCCESS',
    notifications
  };
}

export function newNotificationsClear() {
  return {
    type: 'NEW_NOTIFICATIONS_CLEAR'
  }
}

export function fetchNewNotifications(since) {
  return (dispatch) => {
    dispatch(newNotificationsAreLoading(true));
    common.getNotificationsByDate(since)
      .then((response) => {
        console.log(response);
        if (response instanceof Error) {
          dispatch(newNotificationsHaveError())
        } else {
          dispatch(notificationsFetchNewDataSuccess(response));
        }
      });
  }
}

export function clearNewNotifications() {
  return (dispatch) => dispatch(newNotificationsClear());
}
