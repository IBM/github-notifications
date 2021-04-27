export const initialState = {
  areNotificationsLoading: false,
  haveNotificationsError: false,
  notifications: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NOTIFICATIONS_ARE_LOADING':
      return { ...state, areNotificationsLoading: action.isLoading };
    case 'NOTIFICATIONS_HAVE_ERROR':
      return { ...state, error: action.haveNotificationsError };
    case 'NOTIFICATIONS_FETCH_DATA_SUCCESS':
      return { ...state, notifications: action.notifications, areNotificationsLoading: false };
    default:
      return { ...state };
  }
};

export default reducer;
