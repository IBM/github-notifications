import { put, takeEvery } from "redux-saga/effects";
import { githubCliEnterprise } from "../api/authentication";
import {
  getSubscriptionError,
  getSubscriptionSuccess,
  setSubscriptionSuccess,
  setSubscriptionError
} from "../actions/subscriptions";
import { GET_SUBSCRIPTION, SET_SUBSCRIPTION } from "../actionTypes/subscriptions";

export function* getSubscriptionSaga(subscription) {
  try {
    const { id } = subscription;
    const { data } = yield githubCliEnterprise.getData({ path:`/notifications/threads/${id}/subscription` });
    yield put(getSubscriptionSuccess(id, data));
  } catch (e) {
    yield put(getSubscriptionError(e));
  }
}

export function* setSubscriptionSaga(subscription) {
  try {
    const { subscription: { processedId, thread_id, ignored } } = subscription;
    const { data } = yield githubCliEnterprise.putData({
      path: `/notifications/threads/${processedId}/subscription`,
      data: { thread_id, ignored }
    });
    yield put(setSubscriptionSuccess({ id: processedId, ...data }));
  } catch (e) {
    yield put(setSubscriptionError(e));
  }
}

export const fetchSubscriptionSaga = takeEvery(GET_SUBSCRIPTION, getSubscriptionSaga);
export const updateSubscriptionSaga = takeEvery(SET_SUBSCRIPTION, setSubscriptionSaga);