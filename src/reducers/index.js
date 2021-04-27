import { combineReducers } from 'redux';
import notifications from './notifications';
import commits from './commits';

export default combineReducers({
  notifications,
  commits
});
