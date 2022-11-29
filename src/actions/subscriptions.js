import * as types from "../actionTypes/subscriptions";

export const getSubscription = (id) => ({ type: types.GET_SUBSCRIPTION, id });

export const getSubscriptionSuccess = (id, subscription) => ({
  type: types.GET_SUBSCRIPTION_SUCCESS,
  subscription,
  id
});

export const getSubscriptionError = (error) => ({
  type: types.GET_SUBSCRIPTION_ERROR,
  error
});

export const setSubscription = (subscription) => ({
  type: types.SET_SUBSCRIPTION,
  subscription
});

export const setSubscriptionSuccess = (subscription) => ({
  type: types.SET_SUBSCRIPTION_SUCCESS,
  subscription
});

export const setSubscriptionError = (error) => ({
  type: types.SET_SUBSCRIPTION_ERROR,
  error
});