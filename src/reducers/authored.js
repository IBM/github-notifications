export const initialState = {
  areAuthoredNotificationsLoading: false,
  haveAuthoredNotificationsError: false,
  authored: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'AUTHORED_NOTIFICATIONS_ARE_LOADING':
      return { ...state, areAuthoredNotificationsLoading: action.areAuthoredNotificationsLoading };
    case 'AUTHORED_NOTIFICATIONS_HAVE_ERROR':
      return { ...state, error: action.haveAuthoredNotificationsError };
    case 'AUTHORED_NOTIFICATIONS_FETCH_DATA_SUCCESS':
      return { ...state, authored: action.authored, areAuthoredNotificationsLoading: false };
    default:
      return { ...state };
  }
};

export default reducer;
