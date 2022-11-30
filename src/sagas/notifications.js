import { put, takeEvery, select } from 'redux-saga/effects';
import moment from 'moment';
import {
  GET_NOTIFICATIONS,
  GET_MORE_NOTIFICATIONS,
  SET_NOTIFICATION_AS_READ
} from '../actionTypes/notifications';
import { githubCliEnterprise } from '../api/authentication';
import {
  getNotificationsSuccess,
  getNotificationsError,
  getMoreNotificationsSuccess,
  setSince,
  setNotificationAsReadSuccess,
  setNotificationAsReadError
} from '../actions/notifications';
import { notify } from "../utils/electronNotifications";

export const getSince = (state) => state.notifications.since;

export function* getNotificationsSaga(showAllRead) {
  try {
    const since = yield select(getSince);
    const { data } = yield githubCliEnterprise.getData({path:`/notifications?since=${since}&all=${showAllRead}`});
    yield put(getNotificationsSuccess(data));
    yield put(setSince(moment().toISOString()));
  } catch (e) {
    yield put(getNotificationsError(e));
  }
}

export function* getMoreNotificationsSaga(showAllRead) {
  try {
    const since = yield select(getSince);
    const { data } = yield githubCliEnterprise.getData({path:`/notifications?since=${since}&all=${showAllRead}`});
    if (data.length) notify(data);
    yield put(getMoreNotificationsSuccess(data));
    yield put(setSince(moment().toISOString()));
  } catch (e) {
    yield put(getNotificationsError(e));
  }
}

export function* setNotificationAsReadSaga({ id }) {
  const response = yield githubCliEnterprise.patchData({path: `/notifications/threads/${id}`});
  if (response.status === 205) {
    yield put(setNotificationAsReadSuccess(id));
  } else {
    yield put(setNotificationAsReadError());
  }
}

export const fetchNotificationsSaga = takeEvery(GET_NOTIFICATIONS, getNotificationsSaga);
export const fetchMoreNotificationsSaga = takeEvery(GET_MORE_NOTIFICATIONS, getMoreNotificationsSaga);
export const updateNotificationAsReadSaga = takeEvery(SET_NOTIFICATION_AS_READ, setNotificationAsReadSaga);