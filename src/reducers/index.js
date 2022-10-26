import { combineReducers } from 'redux';
import notifications from './notifications';
import commits from './commits';
import since from './since';
import details from './details';
import subscriptions from './subscriptions';

export default combineReducers({
  notifications,
  commits,
  since,
  details,
  subscriptions
});
