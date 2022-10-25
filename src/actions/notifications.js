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

export function mutedHasError(response) {
  return {
    type: 'MUTED_HAS_ERROR',
    hasMutedError: true,
    error: response
  };
}

export function mutedIsLoading(bool) {
  return {
    type: 'MUTED_IS_LOADING',
    isMutedLoading: bool
  };
}

export function mutedSuccess(id) {
  return {
    type: 'MUTED_SUCCESS',
    id
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
            notify(response);
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

export function muteNotification(id, data) {
  return (dispatch) => {
    dispatch(mutedIsLoading(true));
    common.setThreadSubscription(id, data)
      .then((response) => {
        if (response instanceof Error) {
          dispatch(mutedHasError(response.statusText));
        } else {
          dispatch(mutedSuccess(id));
        }
      });
  }
}
