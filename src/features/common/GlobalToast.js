import React, { useEffect, useState } from 'react';
import { ToastNotification } from "carbon-components-react";

const GlobalToast = (
  {
    selectedRows,
    erroredSubscriptions,
    isGetThreadSubscriptionLoading,
    getThreadSubscriptionHasError,
    settingSubscriptionError,
    isSettingSubscriptionLoading,
    hasSettingSubscriptionError,
    setSubscription
  }) => {
  const [toast, setToast] = useState(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (
      selectedRows &&
      (!settingSubscriptionError || !hasSettingSubscriptionError) &&
      !isSettingSubscriptionLoading
    ) {
      const toastData = {
        kind: 'success',
        title: 'Mute Notifications',
        subtitle: 'Success!',
        caption: `You have changed subscriptions of the following notifications ${setSubscription.thread_id}.`
      }
      setToast(toastData);
    } else if (
      selectedRows &&
      (settingSubscriptionError || hasSettingSubscriptionError) &&
      !isSettingSubscriptionLoading
    ) {
      const toastData = {
        kind: 'error',
        title: 'Mute Notifications',
        subtitle: 'Error',
        caption: 'You have not changed subscriptions of the requested notifications.'
      }
      setToast(toastData);
    }
  }, [setSubscription, hasSettingSubscriptionError, isSettingSubscriptionLoading, settingSubscriptionError]);

  useEffect(() => {
    if (getThreadSubscriptionHasError && erroredSubscriptions.length && !isGetThreadSubscriptionLoading) {
      let erroredIds = [];
      erroredSubscriptions.forEach(({ id }) => {
        erroredIds.push(id);
      })
      const toastData = {
        kind: 'warning',
        title: 'Thread Selection',
        subtitle: 'Warning',
        caption: 'Some of the thread subscriptions weren\'t found. ' +
        `${erroredIds.toString()}`
      }
      setToast(toastData);
    }
  }, [getThreadSubscriptionHasError, erroredSubscriptions, isGetThreadSubscriptionLoading])

  useEffect(() => setShowToast(true), [toast]);

  return (
    showToast && toast && (
      <ToastNotification
        kind={toast.kind}
        caption={toast.caption}
        iconDescription="Close"
        subtitle={toast.subtitle}
        timeout={5000}
        title={toast.title}
        className="notifications__toast"
        onClose={() => setShowToast(false)}
      />
    )
  )
}

export default GlobalToast;