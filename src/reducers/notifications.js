export const initialState = {
  areNotificationsLoading: false,
  haveNotificationsError: false,
  notifications: [],
  newNotifications: [],
  error: '',
  mutedError: ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NOTIFICATIONS_ARE_LOADING':
      return { ...state, areNotificationsLoading: action.areNotificationsLoading };
    case 'NOTIFICATIONS_HAVE_ERROR':
      return {
        ...state,
        haveNotificationsError: action.haveNotificationsError,
        error: action.error,
        areNotificationsLoading: false
      };
    case 'NOTIFICATIONS_FETCH_DATA_SUCCESS':
      return { ...state, notifications: action.notifications, areNotificationsLoading: false };
    case 'NOTIFICATIONS_FETCH_NEW_DATA_SUCCESS':
      return { ...state, newNotifications: action.notifications.concat(state.newNotifications), areNotificationsLoading: false };
    case 'MOVE_NEW_NOTIFICATIONS': {
      return { ...state, notifications: state.newNotifications.concat(state.notifications), newNotifications: [] }
    }
    default:
      return { ...state };
  }
};

export default reducer;
