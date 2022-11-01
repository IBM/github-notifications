export const initialState = {
  isGetThreadSubscriptionLoading: false,
  getThreadSubscriptionHasError: false,
  subscriptions: [],
  erroredSubscriptions: [],
  isSettingSubscriptionLoading: false,
  hasSettingSubscriptionError: false,
  setSubscription: '',
  settingSubscriptionError: ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_THREAD_SUBSCRIPTION_IS_LOADING':
      return { ...state, isGetThreadSubscriptionLoading: action.isGetThreadSubscriptionLoading };
    case 'GET_THREAD_SUBSCRIPTION_HAS_ERROR':
      return {
        ...state,
        getThreadSubscriptionHasError: action.getThreadSubscriptionHasError,
        erroredSubscriptions: [...state.erroredSubscriptions, action.data],
        isGetThreadSubscriptionLoading: false
      };
    case 'GET_THREAD_SUBSCRIPTION_SUCCESS': {
      return {
        ...state,
        subscriptions: [...state.subscriptions, action.response],
        isGetThreadSubscriptionLoading: false
      }
    }
    case 'SET_SUBSCRIPTION_IS_LOADING':
      return { ...state, isSettingSubscriptionLoading: action.isSettingSubscriptionLoading };
    case 'SET_SUBSCRIPTION_HAS_ERROR':
      return {
        ...state,
        hasSettingSubscriptionError: action.hasSettingSubscriptionError,
        settingSubscriptionError: action.error,
        isSettingSubscriptionLoading: false
      };
    case 'SET_SUBSCRIPTION_SUCCESS':
      return {
        ...state,
        setSubscription: action.data,
        isSettingSubscriptionLoading: false
      };
    default:
      return { ...state };
  }
};

export default reducer;
