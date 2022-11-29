import { put, takeEvery, select } from 'redux-saga/effects';
import moment from 'moment';
import { GET_NOTIFICATIONS, GET_MORE_NOTIFICATIONS } from '../actionTypes/notifications';
import { githubCliEnterprise } from '../api/authentication';
import {
  getNotificationsSuccess,
  getNotificationsError,
  getMoreNotificationsSuccess,
  setSince
} from '../actions/notifications';
import { notify } from "../utils/electronNotifications";

export const getSince = (state) => state.notifications.since;

export function* getNotificationsSaga() {
  try {
    const since = yield select(getSince);
    const { data } = yield githubCliEnterprise.getData({path:`/notifications?since=${since}&all=true`});
    yield put(getNotificationsSuccess(data));
    yield put(setSince(moment().toISOString()));
  } catch (e) {
    yield put(getNotificationsError(e));
  }
}

export function* getMoreNotificationsSaga() {
  try {
    const since = yield select(getSince);
    const { data } = yield githubCliEnterprise.getData({path:`/notifications?since=${since}&all=true`});
    if (data.length) notify(data);
    yield put(getMoreNotificationsSuccess(data));
    yield put(setSince(moment().toISOString()));
  } catch (e) {
    yield put(getNotificationsError(e));
  }
}

export const fetchNotificationsSaga = takeEvery(GET_NOTIFICATIONS, getNotificationsSaga);
export const fetchMoreNotificationsSaga = takeEvery(GET_MORE_NOTIFICATIONS, getMoreNotificationsSaga);