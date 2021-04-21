export const initialState = {
  isLoading: false,
  hasError: false,
  notifications: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NOTIFICATIONS_ARE_LOADING':
      return { ...state, isLoading: action.isLoading };
    case 'NOTIFICATIONS_HAVE_ERROR':
      return { ...state, error: action.hasError };
    case 'NOTIFICATIONS_FETCH_DATA_SUCCESS':
      return { ...state, notifications: action.notifications, isLoading: false };
    default:
      return { ...state };
  }
};

export default reducer;
