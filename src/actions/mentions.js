const api = require('../api/mentions');
const common = require('../api/common');

export function mentionedNotificationsHaveError(bool) {
  return {
    type: 'MENTIONED_NOTIFICATIONS_HAVE_ERROR',
    haveMentionedNotificationsError: bool
  };
}

export function mentionedNotificationsAreLoading(bool) {
  return {
    type: 'MENTIONED_NOTIFICATIONS_ARE_LOADING',
    areMentionedNotificationsLoading: bool
  };
}

export function mentionedNotificationsFetchDataSuccess(mentions) {
  return {
    type: 'MENTIONED_NOTIFICATIONS_FETCH_DATA_SUCCESS',
    mentions
  };
}

export function fetchMentionedNotifications(notifications) {
  return (dispatch) => {
    dispatch(mentionedNotificationsAreLoading(true));
    api.getMentionedNotifications(notifications)
      .then((mentions) => {
        dispatch(mentionedNotificationsFetchDataSuccess(mentions));
      })
      .catch((error) => {
        dispatch(mentionedNotificationsHaveError(true))
      })
  }
}

export function fetchMentionedNotificationsByDate(since, type) {
  return (dispatch) => {
    dispatch(mentionedNotificationsAreLoading(true));
    common.getNotificationsByDate(since, type)
      .then((mentions) => {
        dispatch(mentionedNotificationsFetchDataSuccess(mentions));
      })
      .catch((error) => {
        dispatch(mentionedNotificationsHaveError(true))
      })
  }
}
