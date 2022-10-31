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
    case 'NEW_NOTIFICATIONS_CLEAR':
      return { ...state, newNotifications: [] };
    case 'MOVE_NEW_NOTIFICATIONS': {
      let currentNotifications = state.notifications;
      for ( const newNotification of action.notifications) {
        newNotification.index = (currentNotifications.length + 1);
        newNotification.new = true;
        currentNotifications.unshift(newNotification);
      }
      return { ...state, notifications: currentNotifications }
    }
    default:
      return { ...state };
  }
};

export default reducer;
