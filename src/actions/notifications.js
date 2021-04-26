const utils = require('../utils/notifications');

export function notificationsHaveError(bool) {
  return {
    type: 'NOTIFICATIONS_HAVE_ERROR',
    hasError: bool
  };
}

export function notificationsAreLoading(bool) {
  return {
    type: 'NOTIFICATIONS_ARE_LOADING',
    isLoading: bool
  };
}

export function notificationsFetchDataSuccess(notifications) {
  return {
    type: 'NOTIFICATIONS_FETCH_DATA_SUCCESS',
    notifications
  };
}

export function notificationsFetchData() {
  return (dispatch) => {
    dispatch(notificationsAreLoading(true));
    utils.getNotifications()
      .then((response) => {
        dispatch(notificationsFetchDataSuccess(response))
      })
      .catch((error) => {
        dispatch(notificationsHaveError(true))
      })
  }
}
