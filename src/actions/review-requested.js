const api = require('../api/review-requested');
const common = require('../api/common');

export function reviewRequestedNotificationsHaveError(bool) {
  return {
    type: 'REVIEW_REQUESTED_NOTIFICATIONS_HAVE_ERROR',
    haveReviewRequestedNotificationsError: bool
  };
}

export function reviewRequestedNotificationsAreLoading(bool) {
  return {
    type: 'REVIEW_REQUESTED_NOTIFICATIONS_ARE_LOADING',
    areReviewRequestedNotificationsLoading: bool
  };
}

export function reviewRequestedNotificationsFetchDataSuccess(reviewRequested) {
  return {
    type: 'REVIEW_REQUESTED_NOTIFICATIONS_FETCH_DATA_SUCCESS',
    reviewRequested
  };
}

export function fetchReviewRequestedNotifications(notifications) {
  return (dispatch) => {
    dispatch(reviewRequestedNotificationsAreLoading(true));
    api.getReviewRequestedNotifications(notifications)
      .then((reviewRequested) => {
        dispatch(reviewRequestedNotificationsFetchDataSuccess(reviewRequested));
      })
      .catch((error) => {
        dispatch(reviewRequestedNotificationsHaveError(true))
      })
  }
}

export function fetchReviewRequestedNotificationsByDate(since, type) {
  return (dispatch) => {
    dispatch(reviewRequestedNotificationsAreLoading(true));
    common.getNotificationsByDate(since, type)
      .then((reviewRequested) => {
        dispatch(reviewRequestedNotificationsFetchDataSuccess(reviewRequested));
      })
      .catch((error) => {
        dispatch(reviewRequestedNotificationsHaveError(true))
      })
  }
}
