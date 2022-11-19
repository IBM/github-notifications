const common = require('../api/common');
const { notify } = require('../utils/electronNotifications');

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

export function newNotificationsMove() {
  return {
    type: 'MOVE_NEW_NOTIFICATIONS'
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
            if (response.data.length) notify(response.data);
            dispatch(notificationsFetchNewDataSuccess(response.data));
          } else {
            dispatch(notificationsFetchDataSuccess(response.data));
          }
        }
      });
  }
}

export function moveNewNotifications() {
  return (dispatch) => {
    dispatch(newNotificationsMove());
  }
}
