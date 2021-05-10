export const initialState = {
  areNotificationsLoading: false,
  haveNotificationsError: false,
  notifications: [],
  selected: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NOTIFICATIONS_ARE_LOADING':
      return { ...state, areNotificationsLoading: action.areNotificationsLoading };
    case 'NOTIFICATIONS_HAVE_ERROR':
      return { ...state, error: action.haveNotificationsError };
    case 'NOTIFICATIONS_FETCH_DATA_SUCCESS':
      return { ...state, notifications: action.notifications, areNotificationsLoading: false };
    case 'NOTIFICATION_SELECTION_SUCCESS':
      return { ...state, selected: action.selected };
    default:
      return { ...state };
  }
};

export default reducer;
