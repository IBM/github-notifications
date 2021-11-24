import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  StructuredListWrapper,
  StructuredListHead,
  StructuredListBody,
  StructuredListRow,
  StructuredListCell,
  StructuredListSkeleton, Link
} from 'carbon-components-react';
import moment from "moment";
import NotificationsHeaderContainer from "../common/NotificationsHeaderContainer";
import { fetchNotifications } from "../../actions/notifications";
import { fetchAuthoredNotifications, fetchAuthoredNotificationsByDate } from "../../actions/authored";
import { defaultFetchTime } from '../common/Common';

function AuthoredNotifications() {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notifications.notifications);
  const authored = useSelector((state) => state.authored.authored);
  const areAuthoredNotificationsLoading = useSelector((state) => state.authored.areAuthoredNotificationsLoading);

  useEffect(() => {
    if (!notifications.length) {
      dispatch(fetchNotifications(defaultFetchTime));
    }
    dispatch(fetchAuthoredNotifications(notifications, 'author'));
  }, [dispatch, notifications]);

  const filterByDate  = (event, date) => {
    event.preventDefault();
    dispatch(fetchAuthoredNotificationsByDate(date, 'author'));
  }

  return (
    <div className="authored__main">
      <div className="authored__main__content">
        <div className="authored__main__list">
          {notifications.length && !areAuthoredNotificationsLoading ? (
              <StructuredListWrapper selection className="authored__main__list__wrapper">
                <StructuredListHead>
                  <StructuredListRow head>
                    <StructuredListCell head>Title</StructuredListCell>
                    <StructuredListCell head>Last updated</StructuredListCell>
                    <StructuredListCell head>Type</StructuredListCell>
                  </StructuredListRow>
                </StructuredListHead>
                <StructuredListBody>
                  { authored.length ? authored.map(author => (
                      <StructuredListRow key={author.index}>
                        <StructuredListCell>
                          <h6>{author.full_name}</h6>
                          <Link href={author.html_url} target='_blank' key={author.index}>
                            <h4>{author.title}</h4>
                          </Link>
                        </StructuredListCell>
                        <StructuredListCell>
                          <h6>{moment(author.updated_at).fromNow()}</h6>
                          ({author.updated_at})
                        </StructuredListCell>
                        <StructuredListCell>{ author.type }</StructuredListCell>
                      </StructuredListRow>
                    ))
                    : <StructuredListRow><StructuredListCell>No notifications</StructuredListCell></StructuredListRow>
                  }
                </StructuredListBody>
              </StructuredListWrapper>
            )
            : <StructuredListSkeleton />}
        </div>
      </div>
      <NotificationsHeaderContainer
        activeLink="authored"
        dateFilter={(e, date) => filterByDate(e, date)}
      />
    </div>
  );
}

export default AuthoredNotifications;
