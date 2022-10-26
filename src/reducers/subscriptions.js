export const initialState = {
  isThreadLoading: false,
  hasThreadError: false,
  subscriptions: [],
  erroredSubscriptions: ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'THREAD_IS_LOADING':
      return { ...state, isThreadLoading: action.isThreadLoading };
    case 'THREAD_HAS_ERROR':
      return {
        ...state,
        hasThreadError: action.hasThreadError,
        erroredSubscriptions: [...state.erroredSubscriptions, action.data],
        isThreadLoading: false
      };
    case 'THREAD_CLEAR_ERROR':
      return {
        ...state,
        hasThreadError: action.hasThreadError,
        error: action.error
      };
    case 'THREAD_FETCH_DATA_SUCCESS': {
      return {
        ...state,
        subscriptions: [...state.subscriptions, action.response],
        isThreadLoading: false
      }
    }
    default:
      return { ...state };
  }
};

export default reducer;
