export const initialState = {
  newNotifications: [],
  areNewNotificationsLoading: false,
  newNotificationsHaveError: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NEW_NOTIFICATIONS_HAVE_ERROR':
      return {
        ...state,
        newNotificationsHaveError: action.newNotificationsHaveError,
        areNewNotificationsLoading: false
      };
    case 'NEW_NOTIFICATIONS_ARE_LOADING':
      return { ...state, areNewNotificationsLoading: action.areNewNotificationsLoading };
    case 'NOTIFICATIONS_FETCH_NEW_DATA_SUCCESS':
      return { ...state, newNotifications: action.notifications.concat(state.newNotifications), areNewNotificationsLoading: false };
    case 'NEW_NOTIFICATIONS_CLEAR':
      return { ...state, newNotifications: [] };
    default:
      return { ...state };
  }
};

export default reducer;
