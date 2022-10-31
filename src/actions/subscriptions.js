const common = require('../api/common');

export function threadIsLoading(bool) {
  return {
    type: 'THREAD_IS_LOADING',
    isThreadLoading: bool
  };
}

export function threadHasErrorData(data) {
  return {
    type: 'THREAD_HAS_ERROR',
    hasThreadError: true,
    data
  };
}

export function threadClearError() {
  return {
    type: 'THREAD_CLEAR_ERROR',
    hasThreadError: false,
    error: ''
  };
}

export function threadFetchDataSuccess(response) {
  return {
    type: 'THREAD_FETCH_DATA_SUCCESS',
    response
  };
}

export function getThreadSubscription(id) {
  return (dispatch) => {
    dispatch(threadIsLoading(true));
    common.getThreadSubscription(id)
      .then((response) => {
        if (response instanceof Error) {
          dispatch(threadHasErrorData({ id, message: response.statusText }));
          dispatch(threadClearError());
        } else {
          dispatch(threadFetchDataSuccess({ id, data: response.data }));
        }
      });
  }
}

export function setSubscriptionHasError(response) {
  return {
    type: 'SET_SUBSCRIPTION_HAS_ERROR',
    hasSettingSubscriptionError: true,
    settingSubscriptionError: response
  };
}

export function setSubscriptionIsLoading(bool) {
  return {
    type: 'SET_SUBSCRIPTION_IS_LOADING',
    isSettingSubscriptionLoading: bool
  };
}

export function setSubscriptionSuccess(data) {
  return {
    type: 'SET_SUBSCRIPTION_SUCCESS',
    data
  };
}

export function setSubscription(id, data) {
  return (dispatch) => {
    dispatch(setSubscriptionIsLoading(true));
    common.setThreadSubscription(id, data)
      .then((response) => {
        if (response instanceof Error) {
          dispatch(setSubscriptionHasError(response.statusText));
        } else {
          dispatch(setSubscriptionSuccess(data));
        }
      });
  }
}