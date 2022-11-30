import { all } from 'redux-saga/effects';
import {
  fetchNotificationsSaga,
  fetchMoreNotificationsSaga,
  updateNotificationAsReadSaga
} from './notifications';
import { fetchSubscriptionSaga, updateSubscriptionSaga } from './subscriptions';

export default function* rootSaga() {
  yield all([
    fetchNotificationsSaga,
    fetchMoreNotificationsSaga,
    updateNotificationAsReadSaga,
    fetchSubscriptionSaga,
    updateSubscriptionSaga
  ]);
}