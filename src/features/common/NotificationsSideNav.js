import React from 'react';
import { SideNav, SideNavItems, SideNavLink } from "carbon-components-react";

const sideNavLinks = [
  {
    content: 'All Notifications',
    id: 'notifications',
    link: '/'
  },
  {
    content: 'Mentions',
    id: 'mentions',
    link: '/mentions'
  },
  {
    content: 'Review requested',
    id: 'review-requested',
    link: '/review-requested'
  }
];

const NotificationsSideNav = ({ activeLink }) => (
  <>
    <SideNav
      isFixedNav
      expanded={true}
      isChildOfHeader={false}
      aria-label="Side navigation"
      className="notifications__main__side-nav"
    >
      <SideNavItems>
        {sideNavLinks.map((sideNavLink) => (
          <SideNavLink
            isActive={activeLink === sideNavLink.id}
            href={sideNavLink.link}
            key={sideNavLink.id}
          >
            {sideNavLink.content}
          </SideNavLink>
        ))}
      </SideNavItems>
    </SideNav>
  </>
);

export default NotificationsSideNav;
