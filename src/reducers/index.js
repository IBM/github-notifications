import { combineReducers } from 'redux';
import notifications from './notifications';
import commits from './commits';
import mentions from './mentions';
import reviewRequested from './review-requested';

export default combineReducers({
  notifications,
  commits,
  mentions,
  reviewRequested
});
