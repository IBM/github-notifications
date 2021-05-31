export const initialState = {
  areReviewRequestedNotificationsLoading: false,
  haveReviewRequestedNotificationsError: false,
  reviewRequested: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REVIEW_REQUESTED_NOTIFICATIONS_ARE_LOADING':
      return { ...state, areReviewRequestedNotificationsLoading: action.areReviewRequestedNotificationsLoading };
    case 'REVIEW_REQUESTED_NOTIFICATIONS_HAVE_ERROR':
      return { ...state, error: action.haveReviewRequestedNotificationsError };
    case 'REVIEW_REQUESTED_NOTIFICATIONS_FETCH_DATA_SUCCESS':
      return { ...state, reviewRequested: action.reviewRequested, areReviewRequestedNotificationsLoading: false };
    default:
      return { ...state };
  }
};

export default reducer;
