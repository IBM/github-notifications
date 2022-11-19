import {
  findElementIndexById,
  findMatchingElementById,
  insertObjectIntoArray,
  removeObjectFromArrayById
} from "../utils/common";

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

const avoidDuplications = (array, action) => {
  const { id } = action.data;
  let updatedArray = [];
  const findObjectToReplace = findMatchingElementById(array, id);
  if (findObjectToReplace) {
    const index = findElementIndexById(array, id);
    const newArrayWithoutOldObject = removeObjectFromArrayById(array, index);
    updatedArray = insertObjectIntoArray(newArrayWithoutOldObject, findObjectToReplace, index);
  }
  return updatedArray.length ? updatedArray : [...array, action.data];
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_THREAD_SUBSCRIPTION_IS_LOADING':
      return { ...state, isGetThreadSubscriptionLoading: action.isGetThreadSubscriptionLoading };
    case 'GET_THREAD_SUBSCRIPTION_HAS_ERROR': {
      return {
        ...state,
        getThreadSubscriptionHasError: action.getThreadSubscriptionHasError,
        erroredSubscriptions: avoidDuplications(state.erroredSubscriptions, action),
        isGetThreadSubscriptionLoading: false
      };
    }
    case 'GET_THREAD_SUBSCRIPTION_SUCCESS': {
      return {
        ...state,
        subscriptions: avoidDuplications(state.subscriptions, action),
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
