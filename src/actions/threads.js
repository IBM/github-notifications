const common = require('../api/common');

export function threadIsLoading(bool) {
  return {
    type: 'THREAD_IS_LOADING',
    isThreadLoading: bool
  };
}

export function threadHasError(error) {
  return {
    type: 'THREAD_HAS_ERROR',
    hasThreadError: true,
    error
  };
}

export function threadClearError() {
  return {
    type: 'THREAD_CLEAR_ERROR',
    hasThreadError: false,
    error: ''
  };
}

export function threadFetchDataSuccess(response, bulkFetching) {
  return {
    type: 'THREAD_FETCH_DATA_SUCCESS',
    response,
    bulkFetching
  };
}

export function getThreadSubscription(id) {
  return (dispatch) => {
    dispatch(threadIsLoading(true));
    common.getThreadSubscription(id)
      .then((response) => {
        if (response instanceof Error) {
          dispatch(threadHasError(response.statusText));
          dispatch(threadClearError());
        } else {
          dispatch(threadFetchDataSuccess({ id, data: response.data }));
        }
      });
  }
}