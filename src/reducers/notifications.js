export const initialState = {
  areNotificationsLoading: false,
  isMutedLoading: false,
  haveNotificationsError: false,
  hasMutedError: false,
  notifications: [],
  mutedNotifications: [],
  newNotifications: [],
  selected: {},
  error: '',
  mutedError: ''
};

const findElementIndexById = (array, id) => array.findIndex((element) => element.id === id);

const findMatchingElementById = (array, id) => array.find(element => element.id === id);

const removeObjectFromArrayById = (array, id) => array.filter((object) => object.id !== id);

function insertObjectIntoArray(array, object, index) {
  let newArray = array.slice();
  newArray.splice(index, 1, object);
  return newArray;
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NOTIFICATIONS_ARE_LOADING':
      return { ...state, areNotificationsLoading: action.areNotificationsLoading };
    case 'NOTIFICATIONS_HAVE_ERROR':
      return {
        ...state,
        haveNotificationsError: action.haveNotificationsError,
        error: action.error,
        areNotificationsLoading: false
      };
    case 'NOTIFICATIONS_FETCH_DATA_SUCCESS':
      return { ...state, notifications: action.notifications, areNotificationsLoading: false };
    case 'NOTIFICATIONS_FETCH_NEW_DATA_SUCCESS':
      return { ...state, newNotifications: action.notifications.concat(state.newNotifications), areNotificationsLoading: false };
    case 'NEW_NOTIFICATIONS_CLEAR':
      return { ...state, newNotifications: [] };
    case 'MOVE_NEW_NOTIFICATIONS': {
      let currentNotifications = state.notifications;
      for ( const newNotification of action.notifications) {
        newNotification.index = (currentNotifications.length + 1);
        newNotification.new = true;
        currentNotifications.unshift(newNotification);
      }
      return { ...state, notifications: currentNotifications }
    }
    case 'MUTED_IS_LOADING':
      return { ...state, isMutedLoading: action.isMutedLoading };
    case 'MUTED_HAS_ERROR':
      return {
        ...state,
        hasMutedError: action.hasMutedError,
        mutedError: action.error,
        isMutedLoading: false
      };
    case 'MUTED_SUCCESS': {
      const notificationIndex = findElementIndexById(state.notifications, action.id);
      const newArrayWithoutOldObject = removeObjectFromArrayById(state.notifications, action.id);
      const findObjectToReplace = findMatchingElementById(state.notifications, action.id);
      findObjectToReplace.ignored = true;
      const updatedNotifications = insertObjectIntoArray(newArrayWithoutOldObject, findObjectToReplace, notificationIndex);
      return {
        ...state,
        notifications: updatedNotifications,
        isMutedLoading: false
      };
    }
    default:
      return { ...state };
  }
};

export default reducer;
