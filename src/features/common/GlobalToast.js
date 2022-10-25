import React, { useEffect, useState } from 'react';
import { ToastNotification } from "carbon-components-react";
import {useSelector} from "react-redux";

const GlobalToast = ({ selectedRows }) => {
  const [toast, setToast] = useState(null);
  const [showToast, setShowToast] = useState(false);

  const mutedNotifications = useSelector((state) => state.notifications.mutedNotifications);
  const hasMutedError = useSelector((state) => state.notifications.hasMutedError);
  const isMutedLoading = useSelector((state) => state.notifications.isMutedLoading);
  const mutedError = useSelector((state) => state.notifications.mutedError);

  const hasThreadError = useSelector((state) => state.threads.hasThreadError);
  const threadError = useSelector((state) => state.threads.error);

  useEffect(() => {
    if (
      selectedRows &&
      (!mutedError || !hasMutedError) &&
      !isMutedLoading
    ) {
      const toastData = {
        kind: 'success',
        title: 'Mute Notifications',
        subtitle: 'Success!',
        caption: `You have muted the following notifications ${mutedNotifications.toString()}.`
      }
      setToast(toastData);
    } else if (
      selectedRows &&
      (mutedError || hasMutedError) &&
      !isMutedLoading
    ) {
      const toastData = {
        kind: 'error',
        title: 'Mute Notifications',
        subtitle: 'Error',
        caption: 'You have not muted requested notifications.'
      }
      setToast(toastData);
    }
  }, [mutedNotifications, hasMutedError, isMutedLoading, mutedError]);

  useEffect(() => {
    if (hasThreadError && threadError) {
      const toastData = {
        kind: 'warning',
        title: 'Thread Selection',
        subtitle: 'Warning',
        caption: 'Some of the thread subscriptions you selected weren\'t found. ' +
          'The subscription information is not available.'
      }
      setToast(toastData);
    }
  }, [hasThreadError, threadError])

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