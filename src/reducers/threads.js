export const initialState = {
  isThreadLoading: false,
  hasThreadError: false,
  threads: [],
  error: ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'THREAD_IS_LOADING':
      return { ...state, isThreadLoading: action.isThreadLoading };
    case 'THREAD_HAS_ERROR':
      return {
        ...state,
        hasThreadError: action.hasThreadError,
        error: action.error,
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
        threads: [...state.threads, action.response],
        isThreadLoading: false
      }
    }
    default:
      return { ...state };
  }
};

export default reducer;
