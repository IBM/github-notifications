import React, { useCallback, useState } from 'react';
import { Header, HeaderName, Button, HeaderGlobalBar, HeaderGlobalAction } from "carbon-components-react";
import { ChevronLeft32, Menu32, Renew16 } from '@carbon/icons-react';
import NotificationsSideNav from './NotificationsSideNav';

const NotificationsHeader = ({ activeLink, dateFilter, autoRefreshView, getItems, notificationItems, notificationsloading }) => {
  const [isToggled, setIsToggled] = useState(true);
  const toggle = useCallback(
    () => setIsToggled(!isToggled),
    [isToggled, setIsToggled],
  );

  return (
  <Header aria-label="Github Notifications" className="notifications__header">
    <Button
      aria-label="Open side menu"
      onClick={toggle}
      kind="tertiary"
      renderIcon={isToggled ? ChevronLeft32 : Menu32}
      iconDescription="Side menu"
      hasIconOnly
      className="notifications__header__side-menu-toggle"
    />
    <HeaderName prefix="Github">
      Notifications
    </HeaderName>
    { autoRefreshView && (
      <HeaderGlobalBar>
        <HeaderGlobalAction onClick={autoRefreshView} aria-label="REFRESH">
          <Renew16 className={notificationsloading ? 'notifications__header__refresh-icon--spin' : ''} />
        </HeaderGlobalAction>
        <HeaderGlobalAction onClick={getItems} aria-label="NEW">
          <div className="notifications__header__new-notifications-icon">{ notificationItems.length }</div>
        </HeaderGlobalAction>
      </HeaderGlobalBar>
    )}
    <NotificationsSideNav activeLink={activeLink} dateFilter={dateFilter} isSideNavExpanded={isToggled}/>
  </Header>
  )}

export default NotificationsHeader;
