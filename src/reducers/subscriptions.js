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
  isSettingSubscriptionLoading: false,
  hasSettingSubscriptionError: false,
  settingSubscriptionError: '',
  error: ''
};

const avoidDuplications = (array, action) => {
  const { id, ignored } = action;
  let updatedArray = [];
  const findObjectToReplace = findMatchingElementById(array, id);
  if (findObjectToReplace) {
    const index = findElementIndexById(array, id);
    const newArrayWithoutOldObject = removeObjectFromArrayById(array, id);
    findObjectToReplace.ignored = ignored;
    updatedArray = insertObjectIntoArray(newArrayWithoutOldObject, findObjectToReplace, index);
  }
  return updatedArray.length ? updatedArray : [...array, action];
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_SUBSCRIPTION':
      return { ...state, isGetThreadSubscriptionLoading: true };
    case 'GET_SUBSCRIPTION_ERROR':
      return {
        ...state,
        getThreadSubscriptionHasError: true,
        isGetThreadSubscriptionLoading: false,
        error: action.error
      }
    case 'GET_SUBSCRIPTION_SUCCESS':
      return {
        ...state,
        isGetThreadSubscriptionLoading: false,
        subscriptions: [...state.subscriptions, { id: action.id, ...action.subscription}]
      }
    case 'SET_SUBSCRIPTION_IS_LOADING':
      return {
        ...state,
        isSettingSubscriptionLoading: true
      };
    case 'SET_SUBSCRIPTION_HAS_ERROR':
      return {
        ...state,
        hasSettingSubscriptionError: true,
        isSettingSubscriptionLoading: false,
        settingSubscriptionError: action.error
      };
    case 'SET_SUBSCRIPTION_SUCCESS':
      return {
        ...state,
        isSettingSubscriptionLoading: false,
        subscriptions: avoidDuplications(state.subscriptions, action.subscription)
      };
    default:
      return { ...state };
  }
};

export default reducer;
