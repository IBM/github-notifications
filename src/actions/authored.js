const common = require('../api/common');

export function authoredNotificationsHaveError(bool) {
  return {
    type: 'AUTHORED_NOTIFICATIONS_HAVE_ERROR',
    haveAuthoredNotificationsError: bool
  };
}

export function authoredNotificationsAreLoading(bool) {
  return {
    type: 'AUTHORED_NOTIFICATIONS_ARE_LOADING',
    areAuthoredNotificationsLoading: bool
  };
}

export function authoredNotificationsFetchDataSuccess(authored) {
  return {
    type: 'AUTHORED_NOTIFICATIONS_FETCH_DATA_SUCCESS',
    authored
  };
}

export function fetchAuthoredNotifications(notifications, type) {
  return (dispatch) => {
    dispatch(authoredNotificationsAreLoading(true));
    common.getNotificationsByType(notifications, type)
      .then((authored) => {
        dispatch(authoredNotificationsFetchDataSuccess(authored));
      })
      .catch((error) => {
        dispatch(authoredNotificationsHaveError(true))
      })
  }
}

export function fetchAuthoredNotificationsByDate(since, type) {
  return (dispatch) => {
    dispatch(authoredNotificationsAreLoading(true));
    common.getNotificationsByDate(since, type)
      .then((authored) => {
        dispatch(authoredNotificationsFetchDataSuccess(authored));
      })
      .catch((error) => {
        dispatch(authoredNotificationsHaveError(true))
      })
  }
}
