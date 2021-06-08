import React from 'react';
import { SideNav, SideNavItems, SideNavLink, SideNavMenu, SideNavMenuItem } from "carbon-components-react";
import moment from 'moment';

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

const filterByDate = [
  {
    id: 'last24hrs',
    content: 'Last 24hrs',
    date: moment()
      .subtract(1, 'days')
      .format()
  },
  {
    id: 'last48hrs',
    content: 'Last 48hrs',
    date: moment()
      .subtract(2, 'days')
      .format()
  },
  {
    id: 'thisWeek',
    content: 'This Week',
    date: moment()
      .subtract(1, 'week')
      .format()
  }
]

const NotificationsSideNav = ({ activeLink, onClick }) => (
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
        <SideNavMenu title="Filter by Date">
          {filterByDate.map((filter) => (
            <SideNavMenuItem key={filter.id} onClick={(e) => onClick(e, filter.date)}>{ filter.content }</SideNavMenuItem>
          ))}
        </SideNavMenu>
      </SideNavItems>
    </SideNav>
  </>
);

export default NotificationsSideNav;
