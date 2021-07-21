import React from 'react';
import { HeaderContainer } from "carbon-components-react";
import NotificationsHeader from './NotificationsHeader';

const NotificationsHeaderContainer = ({ activeLink, dateFilter, autoRefreshView, getItems, notificationItems, notificationsloading }) => (
  <HeaderContainer render={() => (
    <NotificationsHeader
      activeLink={activeLink}
      dateFilter={dateFilter}
      autoRefreshView={autoRefreshView}
      getItems={getItems}
      notificationItems={notificationItems}
      notificationsloading={notificationsloading}
    />
  )}
  />
)

export default NotificationsHeaderContainer;
