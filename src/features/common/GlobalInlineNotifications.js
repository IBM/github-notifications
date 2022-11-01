import React from 'react';
import { InlineNotification } from "carbon-components-react";

const component = (props) => (
  <InlineNotification
    kind={props.kind}
    subtitle={props.subtitle}
    title={props.title}
    lowContrast={true}
    className="notifications__inline"
  />
);

const GlobalInlineNotifications = (
  {
    erroredSubscriptions,
    isGetThreadSubscriptionLoading,
    getThreadSubscriptionHasError,
    isSettingSubscriptionLoading,
    hasSettingSubscriptionError,
    setSubscription
  }) => {
  return (
    <>
      {getThreadSubscriptionHasError &&
        erroredSubscriptions.length &&
        !isGetThreadSubscriptionLoading &&
        component({
          kind: 'warning',
          title: 'Subscriptions',
          subtitle: 'Some of the thread subscriptions weren\'t found. ' +
            `Number of unavailable subscriptions: ${erroredSubscriptions.length}`
        })
      }
      { setSubscription &&
        !hasSettingSubscriptionError &&
        !isSettingSubscriptionLoading &&
        component({
          kind: 'success',
          title: 'Mute Notifications',
          subtitle: 'You have successfully changed subscriptions of the requested notifications.'
        })
      }
      { setSubscription &&
        hasSettingSubscriptionError &&
        !isSettingSubscriptionLoading &&
        component({
          kind: 'error',
          title: 'Mute Notifications',
          subtitle: 'Something went wrong. You have not changed subscriptions of the requested notifications.'
        })
      }
    </>
  )
}

export default GlobalInlineNotifications;