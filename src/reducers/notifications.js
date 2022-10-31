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

const findElementIndexById = (array, id) => array.findIndex((element) => element.thread_id === id);

const findMatchingElementById = (array, id) => array.find(element => element.thread_id === id);

const removeObjectFromArrayById = (array, id) => array.filter((object) => object.thread_id !== id);

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
      let updatedNotifications = [];
      action.data.forEach(({ thread_id, ignored }) => {
        const findObjectToReplace = findMatchingElementById(state.mutedNotifications, thread_id);
        if (findObjectToReplace) {
          findObjectToReplace.ignored = ignored;
          const notificationIndex = findElementIndexById(state.mutedNotifications, thread_id);
          const newArrayWithoutOldObject = removeObjectFromArrayById(updatedNotifications.length ? updatedNotifications : state.mutedNotifications, thread_id);
          updatedNotifications = insertObjectIntoArray(newArrayWithoutOldObject, findObjectToReplace, notificationIndex);
        }
      })

      return {
        ...state,
        mutedNotifications: updatedNotifications.length ? updatedNotifications : [...state.mutedNotifications, ...action.data],
        isMutedLoading: false
      };
    }
    default:
      return { ...state };
  }
};

export default reducer;
