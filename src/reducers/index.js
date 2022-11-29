import { combineReducers } from 'redux';
import notifications from './notifications';
import subscriptions from './subscriptions';

export default combineReducers({
  notifications,
  subscriptions
});
