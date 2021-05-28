import { combineReducers } from 'redux';
import notifications from './notifications';
import commits from './commits';
import mentions from './mentions';

export default combineReducers({
  notifications,
  commits,
  mentions
});
