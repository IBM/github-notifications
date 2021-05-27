import React from 'react';
import { SideNav, SideNavItems, SideNavLink } from "carbon-components-react";

const NotificationsSideNav = () => (
  <>
    <SideNav
      isFixedNav
      expanded={true}
      isChildOfHeader={false}
      aria-label="Side navigation"
      className="notifications__main__side-nav"
    >
      <SideNavItems>
        <SideNavLink isActive>All Notifications</SideNavLink>
        <SideNavLink>Mentioned</SideNavLink>
        <SideNavLink>Review Requested</SideNavLink>
        <SideNavLink>Subscribed</SideNavLink>
      </SideNavItems>
    </SideNav>
  </>
);

export default NotificationsSideNav;
