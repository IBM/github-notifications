const common = require('../api/common');

export function getSubscriptionIsLoading(bool) {
  return {
    type: 'GET_THREAD_SUBSCRIPTION_IS_LOADING',
    isGetThreadSubscriptionLoading: bool
  };
}

export function getSubscriptionHasError(data) {
  return {
    type: 'GET_THREAD_SUBSCRIPTION_HAS_ERROR',
    getThreadSubscriptionHasError: true,
    data
  };
}

export function getSubscriptionSuccess(data) {
  return {
    type: 'GET_THREAD_SUBSCRIPTION_SUCCESS',
    data
  };
}

export function getThreadSubscription(id) {
  return (dispatch) => {
    dispatch(getSubscriptionIsLoading(true));
    common.getThreadSubscription(id)
      .then((response) => {
        if (response instanceof Error) {
          dispatch(getSubscriptionHasError({ id, message: response.statusText }));
        } else {
          dispatch(getSubscriptionSuccess({ id, data: response.data }));
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