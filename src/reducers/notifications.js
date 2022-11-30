import moment from "moment";
import {
  findElementIndexById,
  findMatchingElementById,
  insertObjectIntoArray,
  removeObjectFromArrayById
} from "../utils/common";

export const initialState = {
  areNotificationsLoading: false,
  haveNotificationsError: false,
  notifications: [],
  newNotifications: [],
  error: '',
  since: moment().subtract(4, 'week').toISOString()
};

const updateNotification = (array, id) => {
  const findObjectToReplace = findMatchingElementById(array, id);
  const index = findElementIndexById(array, id);
  const newArrayWithoutOldObject = removeObjectFromArrayById(array, id);
  findObjectToReplace.unread = false;
  return insertObjectIntoArray(newArrayWithoutOldObject, findObjectToReplace, index);
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_NOTIFICATIONS':
      return { ...state, areNotificationsLoading: true };
    case 'GET_NOTIFICATIONS_ERROR':
      return {
        ...state,
        haveNotificationsError: true,
        error: action.error,
        areNotificationsLoading: false
      };
    case 'GET_NOTIFICATIONS_SUCCESS':
      return { ...state, notifications: action.notifications, areNotificationsLoading: false };
    case 'GET_MORE_NOTIFICATIONS':
      return { ...state, areNotificationsLoading: true };
    case 'GET_MORE_NOTIFICATIONS_SUCCESS':
      return { ...state, newNotifications: action.notifications.concat(state.newNotifications), areNotificationsLoading: false };
    case 'MOVE_NOTIFICATIONS':
      return { ...state, notifications: state.newNotifications.concat(state.notifications), newNotifications: [] }
    case 'SET_NOTIFICATION_AS_READ_SUCCESS':
      return { ...state, notifications: updateNotification(state.notifications, action.id) }
    case 'SET_SINCE':
      return { ...state, since: action.date }
    default:
      return { ...state };
  }
};

export default reducer;
