import { combineReducers } from 'redux';
import notifications from './notifications';
import commits from './commits';
import mentions from './mentions';
import reviewRequested from './review-requested';
import newNotifications from './newNotifications';
import since from './since';

export default combineReducers({
  notifications,
  commits,
  mentions,
  reviewRequested,
  newNotifications,
  since
});
