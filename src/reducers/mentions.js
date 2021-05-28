export const initialState = {
  areMentionedNotificationsLoading: false,
  haveMentionedNotificationsError: false,
  mentions: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'MENTIONED_NOTIFICATIONS_ARE_LOADING':
      return { ...state, areMentionedNotificationsLoading: action.areMentionedNotificationsLoading };
    case 'MENTIONED_NOTIFICATIONS_HAVE_ERROR':
      return { ...state, error: action.haveMentionedNotificationsError };
    case 'MENTIONED_NOTIFICATIONS_FETCH_DATA_SUCCESS':
      return { ...state, mentions: action.mentions, areMentionedNotificationsLoading: false };
    default:
      return { ...state };
  }
};

export default reducer;
