import { combineReducers } from 'redux';
import notifications from './notifications';
import commits from './commits';
import since from './since';
import details from './details';
import threads from './threads';

export default combineReducers({
  notifications,
  commits,
  since,
  details,
  threads
});
