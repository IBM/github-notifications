export const initialState = {
  areNotificationDetailsLoading: false,
  notificationDetailsHaveError: false,
  details: ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NOTIFICATION_DETAILS_ARE_LOADING':
      return { ...state, areNotificationDetailsLoading: action.areNotificationDetailsLoading };
    case 'NOTIFICATION_DETAILS_HAVE_ERROR':
      return { ...state, error: action.notificationDetailsHaveError };
    case 'NOTIFICATION_DETAILS_FETCH_DATA_SUCCESS': {
      return { ...state, details: action.details.state, areNotificationDetailsLoading: false };
    }
    default:
      return { ...state };
  }
};

export default reducer;
