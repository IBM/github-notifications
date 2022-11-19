import {useEffect} from "react";
import {useSelector} from "react-redux";
import {fetchNotifications} from "../../actions/notifications";
import {automaticFetchInterval, defaultFetchTime} from "../common/constants";
import {setSince} from "../../actions/since";
import moment from "moment";
import {getThreadSubscription} from "../../actions/subscriptions";
import {
  findElementIndexById,
  findMatchingElementById, insertObjectIntoArray,
  processNotifications,
  removeObjectFromArrayById
} from "../../utils/common";

const UseEffects = (
  {
    children,
    setNotifications,
    allNotifications,
    notifications,
    allNewNotifications,
    areNotificationsLoading,
    erroredSubscriptions,
    isSettingSubscriptionLoading,
    hasSettingSubscriptionError,
    setSubscription,
    dispatch,
    since,
    subscriptions
  }) => {
  const haveNotificationsError = useSelector((state) => state.notifications.haveNotificationsError);

  useEffect(() => {
    if (!allNotifications.length && !areNotificationsLoading) {
      dispatch(fetchNotifications(defaultFetchTime));
      dispatch(setSince(moment().toISOString()));
    } else {
      const interval = setInterval(() => {
        dispatch(fetchNotifications(since, true));
        dispatch(setSince(moment().toISOString()));
      }, automaticFetchInterval);
      return () => clearInterval(interval);
    }
  }, [allNotifications]);

  // GET Subscriptions data initially when notifications loaded for the first time
  useEffect(() => {
    if (allNotifications.length && !areNotificationsLoading && !haveNotificationsError && !notifications.length) {
      allNotifications.forEach(({ id }) => {
        dispatch(getThreadSubscription(id));
      });
    }
  }, [allNotifications]);

  // SET Notifications when allNotifications changed and NEW notifications are there (moveNotifications)
  useEffect(() => {
    if (allNotifications.length && notifications.length) {
      const processedNotifications = processNotifications(allNotifications, subscriptions);
      console.log('new! final',processedNotifications.length);
      setNotifications(processedNotifications);
    }
  }, [allNotifications]);

  // GET Subscriptions data when NEW notifications found
  useEffect(() => {
    if (allNewNotifications.length && !areNotificationsLoading && !haveNotificationsError && notifications.length) {
      allNewNotifications.forEach(({ id }) => {
        dispatch(getThreadSubscription(id));
      });
      console.log('new! allNewNotifications getThreadSubscription', allNewNotifications.length);
    }
  }, [allNewNotifications]);

  // SET Notifications when subscriptions data changed -
  useEffect(() => {
    console.log('new! subscriptions', subscriptions.length + erroredSubscriptions.length);
    const processedNotifications = processNotifications(allNotifications, subscriptions);
    console.log('new! subscriptions processedNotifications',processedNotifications.length);
    setNotifications(processedNotifications);
  }, [subscriptions, erroredSubscriptions]);

  useEffect(() => {
    if (setSubscription && !isSettingSubscriptionLoading && !hasSettingSubscriptionError) {
      const { thread_id, ignored } = setSubscription;
      const findObjectToReplace = findMatchingElementById(notifications, thread_id);
      findObjectToReplace.ignored = ignored;
      const notificationIndex = findElementIndexById(notifications, thread_id);
      const newArrayWithoutOldObject = removeObjectFromArrayById(notifications, notificationIndex);
      const updatedNotifications = insertObjectIntoArray(newArrayWithoutOldObject, findObjectToReplace, notificationIndex);
      setNotifications(updatedNotifications);
    }
  }, [setSubscription, isSettingSubscriptionLoading, hasSettingSubscriptionError]);

  return children;
}

export default UseEffects;