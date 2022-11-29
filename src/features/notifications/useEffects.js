import { useEffect } from "react";
import { useSelector } from "react-redux";
import {getMoreNotifications, getNotifications} from "../../actions/notifications";
import { getSubscription } from "../../actions/subscriptions";
import { processNotifications } from "../../utils/common";

const UseEffects = (
  {
    children,
    showAllRead,
    setNotifications,
    allNotifications,
    notifications,
    allNewNotifications,
    areNotificationsLoading,
    isSettingSubscriptionLoading,
    hasSettingSubscriptionError,
    dispatch,
    subscriptions
  }) => {
  const haveNotificationsError = useSelector((state) => state.notifications.haveNotificationsError);
  const automaticFetchInterval = 60000;

  useEffect(() => {
    if (!allNotifications.length && !areNotificationsLoading) {
      dispatch(getNotifications(showAllRead));
    } else {
      const interval = setInterval(() => {
        dispatch(getMoreNotifications(showAllRead));
      }, automaticFetchInterval);
      return () => clearInterval(interval);
    }
  }, [allNotifications]);

  useEffect(() => {
    if (allNotifications.length && !areNotificationsLoading && !areNotificationsLoading && !notifications.length) {
      allNotifications.forEach(({ id }) => {
        dispatch(getSubscription(id));
      });
    }
  }, [allNotifications, areNotificationsLoading, areNotificationsLoading]);

  useEffect(() => {
    if (allNotifications.length && notifications.length) {
      const processedNotifications = processNotifications(allNotifications, subscriptions);
      setNotifications(processedNotifications);
    }
  }, [allNotifications]);

  useEffect(() => {
    if (allNewNotifications.length && !areNotificationsLoading && !haveNotificationsError && notifications.length) {
      allNewNotifications.forEach(({ id }) => {
        dispatch(getSubscription(id));
      });
    }
  }, [allNewNotifications, areNotificationsLoading, haveNotificationsError]);

  useEffect(() => {
    if (!isSettingSubscriptionLoading && !hasSettingSubscriptionError) {
      const processedNotifications = processNotifications(allNotifications, subscriptions);
      setNotifications(processedNotifications);
    }
  }, [subscriptions, isSettingSubscriptionLoading, hasSettingSubscriptionError]);

  return children;
}

export default UseEffects;