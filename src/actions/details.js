import { getPrDetails } from "../api/details";

export function notificationDetailsHaveError(response) {
  return {
    type: 'NOTIFICATION_DETAILS_HAVE_ERROR',
    notificationDetailsHaveError: true,
    error: response
  };
}

export function notificationDetailsAreLoading(bool) {
  return {
    type: 'NOTIFICATION_DETAILS_ARE_LOADING',
    areNotificationDetailsLoading: bool
  };
}

export function notificationDetailsFetchDataSuccess(details) {
  return {
    type: 'NOTIFICATION_DETAILS_FETCH_DATA_SUCCESS',
    details
  };
}

export function fetchNotificationDetails(url = '') {
  return (dispatch) => {
    dispatch(notificationDetailsAreLoading(true));
    getPrDetails(url)
      .then((response) => {
        dispatch(notificationDetailsFetchDataSuccess(response.data))
      })
      .catch(() => {
        dispatch(notificationDetailsHaveError(true))
      })
  }
}
