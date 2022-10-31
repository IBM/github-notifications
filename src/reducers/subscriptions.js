export const initialState = {
  isThreadLoading: false,
  isSettingSubscriptionLoading: false,
  hasThreadError: false,
  hasSettingSubscriptionError: false,
  subscriptions: [],
  setSubscription: '',
  erroredSubscriptions: '',
  settingSubscriptionError: ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'THREAD_IS_LOADING':
      return { ...state, isThreadLoading: action.isThreadLoading };
    case 'THREAD_HAS_ERROR':
      return {
        ...state,
        hasThreadError: action.hasThreadError,
        erroredSubscriptions: [...state.erroredSubscriptions, action.data],
        isThreadLoading: false
      };
    case 'THREAD_CLEAR_ERROR':
      return {
        ...state,
        hasThreadError: action.hasThreadError,
        error: action.error
      };
    case 'THREAD_FETCH_DATA_SUCCESS': {
      return {
        ...state,
        subscriptions: [...state.subscriptions, action.response],
        isThreadLoading: false
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
