const utils = require('../api/mentions');

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
    utils.getMentionedNotifications(notifications)
      .then((mentions) => {
        dispatch(mentionedNotificationsFetchDataSuccess(mentions));
      })
      .catch((error) => {
        dispatch(mentionedNotificationsHaveError(true))
      })
  }
}

export function fetchMentionedNotificationsByDate(since) {
  return (dispatch) => {
    dispatch(mentionedNotificationsAreLoading(true));
    utils.getMentionedNotificationsByDate(since)
      .then((mentions) => {
        dispatch(mentionedNotificationsFetchDataSuccess(mentions));
      })
      .catch((error) => {
        dispatch(mentionedNotificationsHaveError(true))
      })
  }
}
