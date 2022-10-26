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